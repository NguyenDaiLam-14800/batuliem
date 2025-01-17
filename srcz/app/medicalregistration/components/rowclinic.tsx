"use client";

import { IClinic } from "@/app/constants";
import { usePatientContext } from "@/app/PatientProvider";
import CheckIcon from "@mui/icons-material/Check";

export default function RowClinics(props: { handleClose: () => void }) {
  const {
    patientInfo: { consultationSession },
    setPatientInfo,
  } = usePatientContext();
  const data = consultationSession?.service?.clinics;

  const handleCheck = (value: IClinic) => {
    setPatientInfo((prev) => {
      const session = prev.consultationSession || {
        medicalRecordNumber: null,
        service: null,
        clinic: null,
        total: null,
        target: null,
        isInsurance: null,
      };
      return {
        ...prev,
        consultationSession: {
          ...session,
          clinic: value,
        },
      };
    });
  };

  return (
    <>
      <div
        className='relative z-10'
        aria-labelledby='modal-title'
        role='dialog'
        aria-modal='true'
      >
        <div
          className='fixed inset-0 bg-gray-500/75 transition-opacity'
          aria-hidden='true'
        ></div>
        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-3'>
            <div className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full'>
              <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                  <h3
                    className='text-2xl text-center font-semibold text-gray-900 border-b-2'
                    id='modal-title'
                  >
                    Chọn phòng khám
                  </h3>
                  <div className='mt-2'>
                    <div className='w-full py-8 grid grid-cols-2 gap-8 items-stretch'>
                      {data?.map((room: IClinic, index) => (
                        <div
                          key={index}
                          className={`relative rounded col-span-${
                            index === data.length - 1 && data.length % 2 === 1
                              ? 2
                              : 1
                          } `}
                          onClick={() => handleCheck(room)}
                        >
                          <div
                            className={`h-[150px] flex items-center justify-center shadow-lg bg-[#f4f4f4] text-[var(--niad-color)] rounded text-center hover:text-white hover:bg-[var(--niad-color)] text-xs sm:text-sm ${
                              consultationSession?.clinic?.id === room.id
                                ? "bg-[var(--niad-color)] text-white"
                                : ""
                            }`}
                          >
                            {room.name}
                          </div>
                          {consultationSession?.clinic?.id === room.id && (
                            <div
                              className={`absolute -top-4 -right-4 w-8 h-8 rounded-full flex justify-center items-center bg-white p-1 border`}
                            >
                              <CheckIcon className='text-[var(--niad-color)] text-lg' />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:flex justify-center sm:px-6'>
                <button
                  type='button'
                  className='inline-flex w-full justify-center rounded-md bg-[var(--niad-color)] text-sm font-semibold text-white shadow-sm hover:bg-[var(--niad-color)] sm:ml-3 px-12 py-4 sm:w-auto'
                  onClick={props.handleClose}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
