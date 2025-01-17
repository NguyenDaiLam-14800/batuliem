"use client";
import { useState } from "react";
import Step from "../components/Step";
import ButtonFooter from "../lib/ButtonFooter";
import { usePatientContext } from "../PatientProvider";
import RowClinics from "./components/rowclinic";
import RowServices from "./components/rowservices";
import { insuranceSteps, steps } from "@/app/constants";

export default function Registration() {
  const {
    patientInfo: { consultationSession },
  } = usePatientContext();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpenModal(true);
  };
  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div className='h-full p-[3%]'>
      <div className='h-full max-w-full flex flex-col'>
        <h2 className='text-center font-bold text-3xl tall:text-4xl py-5'>
          Đăng ký khám bệnh
        </h2>
        <Step step={1} steps={consultationSession?.isInsurance ? insuranceSteps : steps} />
        <div className='text-base sm:text-lg font-semibold mb-4 text-center'>
          Bệnh nhân: TRẦN VĂN QUANG - NAM
        </div>
        {!consultationSession?.service ? (
          <div className='border-b-2 text-center text-red-600 col-span-2 h-6'>
            {" "}
            Vui lòng chọn dịch vụ
          </div>
        ) : (
          <div className='border-b-2 text-center col-span-2 h-6'>
            <b>Dịch vụ đã chọn:</b> {consultationSession?.service?.name} |{" "}
            <b
              className={`${!consultationSession?.clinic ? "text-red-500" : ""
                }`}
            >
              Phòng khám:
            </b>{" "}
            {consultationSession?.clinic?.name || ""}
          </div>
        )}
        <div className='flex-grow'>
          <RowServices handleOpen={handleOpen} />
          {isOpenModal && consultationSession?.service?.clinics && (
            <RowClinics handleClose={handleClose} />
          )}
        </div>
        <ButtonFooter
          isNextLoading={
            !(consultationSession?.service || consultationSession?.clinic)
          }
          prev={"/patient-identification"}
          next={
            consultationSession?.isInsurance
              ? "/print-patient-check-up"
              : "/check-up"
          }
        />
      </div>
    </div>
  );
}
