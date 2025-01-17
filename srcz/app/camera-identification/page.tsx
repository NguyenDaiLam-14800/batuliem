"use client";
import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { usePatientContext } from "../PatientProvider";
import ButtonFooter from "../lib/ButtonFooter";
import Step from "../components/Step";
import { insuranceSteps, steps } from "../constants";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CameraComponent = () => {
  const router = useRouter();
  const { patientInfo } = usePatientContext();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFaceInCircle, setIsFaceInCircle] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const [isUnRecognized, setIsUnRecognized] = useState<boolean>(false);
  const [isReRecognize, setIsReRecognize] = useState<boolean>(false);

  const detectFacesIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const HOST_URL = "ws://localhost:8000";
    const socket = new WebSocket(HOST_URL);
    socketRef.current = socket;
    socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    socket.onmessage = (event) => {
      try {
        if (Number(event.data) >= 80) {
          router.push("/camera-identification-success");
        } else {
          if (detectFacesIntervalRef.current) {
            setIsUnRecognized(true);
            detectFaces();
          }
        }
      } catch (err) {
        console.log("Error parsing WebSocket message:", err);
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    socket.onerror = (event) => {
      console.log("WebSocket error:", event);
    };
    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const targetLabel = "罗技高清网络摄像机 C930c (046d:0891)";

    const getCameraIdByLabel = async (label: string) => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoInput = devices.find(
        (device) => device.kind === "videoinput" && device.label === label
      );
      return videoInput?.deviceId || null;
    };

    const initializeCamera = async () => {
      try {
        const cameraId = await getCameraIdByLabel(targetLabel);
        const constraints = cameraId
          ? { video: { deviceId: { exact: cameraId } } }
          : { video: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Tải model nhận diện khuôn mặt
          await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
          await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
          detectFaces();
        }
      } catch (err) {
        console.error("Lỗi khởi tạo camera:", err);
      }
    };

    initializeCamera();

    // Dọn dẹp khi component bị unmount
    return () => {
      if (detectFacesIntervalRef.current) {
        clearInterval(detectFacesIntervalRef.current);
      }
    };
  }, []);

  const detectFaces = async () => {
    try {
      setIsReRecognize(false);
      if (videoRef.current) {
        const video = videoRef.current;

        if (video.readyState >= 2) {
          await handleCanvasAndDetection(video);
        } else {
          video.addEventListener("loadeddata", async () => {
            await handleCanvasAndDetection(video);
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCanvasAndDetection = async (video: HTMLVideoElement) => {
    if (canvasRef.current) {
      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = displaySize.width;
      canvas.height = displaySize.height;

      let isSendImage = false;
      let timeoutHandle: NodeJS.Timeout | null = null;

      const detectFacesInterval = setInterval(async () => {
        if (!ctx) return;

        const circleCenter = {
          x: canvas.width / 2,
          y: canvas.height / 2 + 32, // 32 = 50 x 0.64
        };
        const circleRadius = 160; // 160 = 500 / 2 x 0.64

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(
          circleCenter.x,
          circleCenter.y,
          circleRadius,
          0,
          Math.PI * 2,
          false
        );
        ctx.clip();
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const detection = await faceapi.detectSingleFace(
          canvas,
          new faceapi.TinyFaceDetectorOptions()
        );

        if (detection) {
          const { box } = detection;

          const corners = [
            { x: box.x, y: box.y },
            { x: box.x + box.width, y: box.y },
            { x: box.x, y: box.y + box.height },
            { x: box.x + box.width, y: box.y + box.height },
          ];

          const isInCircle = corners.every((corner) => {
            const distance = Math.sqrt(
              Math.pow(corner.x - circleCenter.x, 2) +
                Math.pow(corner.y - circleCenter.y, 2)
            );
            return distance <= circleRadius;
          });

          setIsFaceInCircle(isInCircle);

          if (isInCircle && !isSendImage) {
            isSendImage = true;
            clearInterval(detectFacesInterval);
            if (timeoutHandle) {
              clearTimeout(timeoutHandle);
              timeoutHandle = null;
            }
            setTimeout(() => {
              captureImage();
            }, 500);
          }
        } else {
          setIsFaceInCircle(false);
        }
      }, 100);
      if (!timeoutHandle) {
        timeoutHandle = setTimeout(() => {
          setIsReRecognize(true);
          setIsUnRecognized(false);
          clearInterval(detectFacesInterval);
          console.log(
            "No face detected in circle within 10 seconds. Stopping detection."
          );
        }, 10000);
      }

      detectFacesIntervalRef.current = detectFacesInterval;
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        const data = JSON.stringify({
          faceLive: imageData,
          faceCore: patientInfo.faceImage?.data.img_data,
        });

        if (socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(data);
          console.log("Image sent to WebSocket");
        } else {
          console.log("WebSocket is not open. Cannot send data.");
        }
      }
    }
  };

  return (
    <div className='w-full h-full p-[3%] flex flex-col'>
      <h1 className='text-center text-3xl font-[600]'>Định danh bệnh nhân</h1>
      <Step
        step={0}
        steps={
          patientInfo.consultationSession?.isInsurance ? insuranceSteps : steps
        }
      />
      <div className='mt-12 mb-6 text-red-600 text-2xl text-center'>
        <b>Nhìn thẳng vào camera</b> và điều chỉnh khuôn mặt trong khung nhận
        diện, cởi kính, mũ, khẩu trang, <b>để lộ rõ đường chân mày</b> và{" "}
        <b> khuôn mặt</b>.
      </div>
      <div className='flex-grow'>
        <div className='relative w-full overflow-hidden flex justify-center items-center'>
          <video
            ref={videoRef}
            autoPlay
            muted
            className='w-[1000px] h-auto -scale-x-[1]'
          />
          <canvas ref={canvasRef} className='hidden' />
          <div
            className={`absolute border-[6px] border-dashed ${
              isFaceInCircle ? "border-[var(--niad-color)]" : "border-red-500"
            } rounded-full`}
            style={{
              width: "500px",
              height: "500px",
              top: "calc(50% + 50px)",
              left: "50%",
              transform: "translate(-50%, -50%)",
              boxShadow: "rgba(255,255,255,0.5) 100px 0 0 1000px",
            }}
          />
        </div>
        <div className='mt-12 mb-6 text-2xl text-center'>
          Khi khung nhận diện hợp lệ (khung nhận diện chuyển từ màu{" "}
          <b className='text-red-600'>đỏ</b> sang màu{" "}
          <b className='text-[var(--niad-color)]'>xanh</b>) sẽ bắt đầu xác thực.{" "}
        </div>
        <Image
          width={400}
          height={250}
          alt=''
          src='/image/face-id.png'
          className='mx-auto mt-12'
        />
        {isUnRecognized && !isReRecognize && (
          <div className='text-[var(--niad-color)] text-center mt-12 mb-6'>
            <div
              role='status'
              aria-label='loading'
              className='flex justify-center'
            >
              Đang xác thực lại
              <svg
                className='w-6 h-6 stroke-[var(--niad-color)] animate-spin ml-1'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clipPath='url(#clip0_9023_61563)'>
                  <path
                    d='M14.6437 2.05426C11.9803 1.2966 9.01686 1.64245 6.50315 3.25548C1.85499 6.23817 0.504864 12.4242 3.48756 17.0724C6.47025 21.7205 12.6563 23.0706 17.3044 20.088C20.4971 18.0393 22.1338 14.4793 21.8792 10.9444'
                    stroke='stroke-current'
                    strokeWidth='1.4'
                    strokeLinecap='round'
                    className='my-path'
                  ></path>
                </g>
                <defs>
                  <clipPath id='clip0_9023_61563'>
                    <rect width='24' height='24' fill='white'></rect>
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p>Nếu không xác thực được vui lòng liên hệ nhân viên.</p>
          </div>
        )}
        {isReRecognize && !isUnRecognized && (
          <div className='flex justify-center'>
            <button
              className='bg-[#16817b] font-bold text-white px-2 py-4 rounded-lg'
              onClick={detectFaces}
            >
              Xác thực lại
            </button>
          </div>
        )}
      </div>
      <ButtonFooter isNextLoading={true} prev={"/patient-identification"} />
    </div>
  );
};

export default CameraComponent;
