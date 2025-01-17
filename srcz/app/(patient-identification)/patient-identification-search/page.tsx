'use client';

import { useLoading } from "@/app/LoadingProvider";
import { usePatientContext } from "@/app/PatientProvider";
import { ImageInfo, PersonalInfo } from "@/app/constants";
import ButtonFooter from "@/app/lib/ButtonFooter";
import { isValidJSON } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";

function PatientIdentificationSearch() {
  const { patientInfo, setPatientInfo } = usePatientContext();
  const { setIsLoading } = useLoading();

  const dataInfo = patientInfo.personalInfo?.data;

  useEffect(() => {
    const HOST_URL = "ws://localhost:8000";
    const socket = new WebSocket(HOST_URL);

    socket.onopen = () => {
      console.log("WebSocket connected!");
    };

    socket.onmessage = (event) => {
      try {
        if (!isValidJSON(event.data)) return;
        const receivedData = JSON.parse(event.data);

        if (receivedData.id === "2") {
          setIsLoading(true);
          setPatientInfo((prev) => {
            console.log({
              ...prev,
              personalInfo: receivedData as PersonalInfo,
            });
            return {
              ...prev,
              personalInfo: receivedData as PersonalInfo,
            };
          });
        } else if ("DSCert" in receivedData) {
          setPatientInfo((prev) => {
            return {
              ...prev,
              dsCert: receivedData.DSCert,
            };
          });
        } else if ("ChipAuthen" in receivedData) {
          setPatientInfo((prev) => {
            return {
              ...prev,
              chipAuthen: receivedData.ChipAuthen,
            };
          });
        } else if ("VerifySOD" in receivedData) {
          setPatientInfo((prev) => {
            return {
              ...prev,
              verifySOD: receivedData.VerifySOD,
            };
          });
        } else if (receivedData.id === "4") {
          setPatientInfo((prev) => {
            return {
              ...prev,
              faceImage: receivedData as ImageInfo,
            };
          });
        }
      } catch (err) {
        console.log("Error parsing WebSocket message:", err);
      } finally {
        setIsLoading(false);
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
      console.log("WebSocket disconnected");
    };
  }, []);

  return (
    <div className='p-[3%] h-full'>
      <div className='w-full min-h-full flex flex-col items-center'>
        {patientInfo.personalInfo ? (
          <div className='bg-white flex flex-col flex-grow justify-around gap-1 text-base shadow-xl p-2 md:p-6 tall:text-3xl w-full'>
            {patientInfo.faceImage && (
              <Image
                width={400}
                height={400}
                src={patientInfo.faceImage.data.img_data}
                alt=''
                className='self-center'
              />
            )}
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Số căn cước:</span>
              <span>{dataInfo?.idCode}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Họ và tên:</span>
              <span>{dataInfo?.personName || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Ngày sinh:</span>
              <span>{dataInfo?.dateOfBirth || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Giới tính:</span>
              <span>{dataInfo?.gender || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Quốc tịch:</span>
              <span>{dataInfo?.nationality || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Nguyên quán:</span>
              <span>{dataInfo?.originPlace || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Ngày cấp:</span>
              <span>{dataInfo?.issueDate || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Ngày hết hạn:</span>
              <span>{dataInfo?.expiryDate || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Dân tộc:</span>
              <span>{dataInfo?.race || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Tôn giáo:</span>
              <span>{dataInfo?.religion || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Nhận dạng cá nhân:</span>
              <span>{dataInfo?.personalIdentification || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Thường trú:</span>
              <span>{dataInfo?.residencePlace || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Họ tên cha, mẹ:</span>
              <span>
                {dataInfo?.fatherName || "N/A"}, {dataInfo?.motherName || "N/A"}
              </span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Họ tên vợ, chồng:</span>
              <span>{dataInfo?.wifeName || "N/A"}</span>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <span>Số CCCD cũ:</span>
              <span>{dataInfo?.oldIdCode || "N/A"}</span>
            </div>
          </div>
        ) : (
          <div className='flex-grow flex flex-col justify-center'>
            <h1 className='text-3xl font-[600] text-center'>
              Quét Căn cước công dân
            </h1>
            <Image
              src={"/image/guide.png"}
              alt=''
              width={600}
              height={300}
              className='mx-auto mt-24'
            />
            <div className=' text-red-600 text-xl text-center'>
              Vui lòng cắm CCCD vào đầu đọc thẻ đúng chiều, khi đầu đọc thẻ kêu
              thông tin sẽ bắt đầu được đọc, vui lòng không rút CCCD ra khỏi đầu
              đọc trước khi quá trình hoàn tất
            </div>
          </div>
        )}
        <div className='w-full pb-4'>
          <ButtonFooter
            next={patientInfo.personalInfo ? "/search/pay" : ""}
            isNextLoading={!patientInfo.personalInfo}
            prev={"/search"}
          />
        </div>
      </div>
    </div>
  );
}

export default PatientIdentificationSearch;
