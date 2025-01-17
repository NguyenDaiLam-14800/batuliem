import { createContext } from "react";
import {
  IClinic,
  ImageInfo,
  ITarget,
  PersonalInfo,
  Service,
} from "./constants";

export interface IDInfo {
  personalInfo: PersonalInfo | null;
  dsCert: string;
  chipAuthen: number;
  verifySOD: number;
  faceImage: ImageInfo | null;
  consultationSession: {
    medicalRecordNumber: string | null;
    service: Service | null;
    clinic: IClinic | null;
    total: number | null;
    target: ITarget | null;
    isInsurance: boolean | null;
  } | null;
}

export const INITIAL_PATIENT: IDInfo = {
  chipAuthen: 0,
  dsCert: "",
  faceImage: null,
  verifySOD: 0,
  personalInfo: null,
  consultationSession: {
    isInsurance: false,
    medicalRecordNumber: null,
    service: null,
    clinic: null,
    total: null,
    target: null,
  },
};

interface PatientContextType {
  patientInfo: IDInfo;
  setPatientInfo: React.Dispatch<React.SetStateAction<IDInfo>>;
}

export const PatientContext = createContext<PatientContextType | null>(null);
