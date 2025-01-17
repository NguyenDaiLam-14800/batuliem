"use client"
import { Service, services } from "@/app/constants";
import ServiceButton from "./ServiceButton";
import { useState } from "react";
import { usePatientContext } from "@/app/PatientProvider";
export default function RowServices(props: { handleOpen: () => void }) {
  const { patientInfo: { consultationSession }, setPatientInfo } = usePatientContext();

  const handleCheck = (data: Service) => {
    setPatientInfo((prev) => {
      const session = prev.consultationSession || {
        isInsurance: false,
        medicalRecordNumber: null,
        service: null,
        clinic: null,
        total: null,
        target: null,
      };
      return {
        ...prev,
        consultationSession: {
          ...session,
          service: data,
          clinic: null
        }
      }
    });
    props.handleOpen();
  }

  return (
    <div className="h-full py-8 grid grid-cols-2 gap-8 items-stretch">
      {services.map((service, index) => (
        <ServiceButton
          key={service.id}
          checked={consultationSession?.service?.id === service.id}
          span={index === services.length - 1 && services.length % 2 === 1 ? 2 : 1}
          service={service}
          handleCheck={handleCheck}
        />
      ))}
    </div>
  );
}
