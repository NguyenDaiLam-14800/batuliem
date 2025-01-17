"use client";
import { ReactNode, useContext, useState } from "react";
import { INITIAL_PATIENT, PatientContext } from "./PatientContext";

export default function PatientProvider({ children }: { children: ReactNode }) {
  const [patientInfo, setPatientInfo] = useState(INITIAL_PATIENT);

  return (
    <PatientContext.Provider value={{ patientInfo, setPatientInfo }}>
      {children}
    </PatientContext.Provider>
  );
}

export const usePatientContext = () => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient phải được sử dụng bên trong PatientProvider");
  }
  return context;
};
