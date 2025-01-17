"use client";
import Image from "next/image";
import Step from "../components/Step";
import { insuranceSteps, steps } from "../constants";
import ButtonFooter from "../lib/ButtonFooter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePatientContext } from "../PatientProvider";

const CameraIdentificationSuccess = () => {
  const { patientInfo } = usePatientContext();

  return (
    <div className='w-full h-full p-[3%] flex flex-col'>
      <h1 className='text-center text-3xl font-[600]'>Định danh bệnh nhân</h1>
      <Step
        step={0}
        steps={
          patientInfo.consultationSession?.isInsurance ? insuranceSteps : steps
        }
      />
      <div className='mt-12 mb-6 text-3xl text-center font-bold'>
        Xác thực khuôn mặt
      </div>
      <div className='flex-grow'>
        <Image
          width={500}
          height={750}
          alt=''
          src={patientInfo.faceImage?.data.img_data || "/image/anh_cccd.jpg"}
          className='mx-auto'
        />
        <p className='mt-12 mb-6 text-2xl text-center'>
          <CheckCircleIcon className='text-6xl text-[var(--green)] mr-2' /> Định
          danh thành công.
        </p>
      </div>
      <ButtonFooter
        prev={"/patient-identification"}
        next={"/medicalregistration"}
      />
    </div>
  );
};

export default CameraIdentificationSuccess;
