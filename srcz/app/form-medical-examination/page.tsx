"use client";

import { usePatientContext } from "@/app/PatientProvider";
import ButtonFooter from "@/app/lib/ButtonFooter";
import { useRouter } from "next/navigation";

function FormMedicalExamination() {
  const router = useRouter();

  const { setPatientInfo } = usePatientContext();

  const setInsurance = (isInsurance: boolean) => {
    setPatientInfo((prev) => ({
      ...prev,
      consultationSession: {
        medicalRecordNumber: null,
        service: null,
        clinic: null,
        total: null,
        target: null,
        isInsurance: isInsurance,
      },
    }));

    router.push("/patient-identification");
  };

  return (
    <div className='p-[3%] h-full'>
      <div className='h-full flex flex-col'>
        <h2 className='text-center font-bold text-3xl tall:text-4xl py-5'>
          Lựa chọn hình thức khám
        </h2>
        <div className='flex flex-col justify-start flex-grow gap-8 py-8'>
          <div
            className='shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
            onClick={() => setInsurance(true)}
          >
            Bảo hiểm y tế
          </div>
          <div
            className='shadow-xl flex-grow flex px-2 md:px-8 items-center justify-center tall:text-4xl bg-[#f4f4f4] rounded-2xl gap-3 font-bold text-[#006b66] active:bg-white'
            onClick={() => setInsurance(false)}
          >
            Dịch vụ
          </div>
        </div>
        <ButtonFooter prev={"/"} />
      </div>
    </div>
  );
}

export default FormMedicalExamination;
