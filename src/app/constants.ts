export const steps: string[] = [
  "Định danh",
  "Đăng ký khám viện phí",
  "Thanh toán",
  "In phiếu",
];

export const insuranceSteps: string[] = [
  "Định danh",
  "Đăng ký khám BHYT",
  "In phiếu",
];

export interface Service {
  id: string,
  name: string,
  clinics: IClinic[]
}

export interface IClinic {
  id: string,
  name: string
}

export interface ITarget {
  id: number,
  name: string
}

export const clinic: IClinic[] = [
  { name: "Phòng KDV1 - Phòng Khám Online", id: "05e4694e-a59e-4352-99fc-351750874f11" },
  { name: "Phòng KKBCBG - Phòng Khám Bệnh", id: "44324d8b-608e-4046-bf75-fa8a850af1ed" },
  { name: "Phòng PCCTT - Phòng Khám Cấp Cứu TT & CSKS Bưu Điện", id: "b71ca97d-4c97-41be-9e4a-a1c8ca716ff0" },
  { name: "Phòng PTMH1 - Phòng Khám Tai Mũi Họng (ĐC)", id: "84c56a33-67b5-413c-973e-23d195478deb" },
  { name: "Phòng PKTM1_PHÒNG KHÁM TIM MẠCH (ĐC)", id: "a72456cd-ac9b-4621-abcf-912faa829840" },
  { name: "Phòng PKYC_PHÒNG KHÁM YÊU CẦU (ĐC)", id: "4616df4f-b627-459f-8b3c-9cbfdbfd48ab" },
  { name: "PHÒNG PSAN1_PHÒNG KHÁM SẢN(ĐC)", id: "1e136db0-0761-4830-8ed7-6df6b67dc1ea" },
  { name: "PHÒNG PSAN2_PHÒNG KHÁM SẢN 2(ĐC)", id: "8a033e67-3967-4a6d-93f0-428524eaa3ca" },
  { name: "Phòng KCB Nội", id: "7fa5d4c8-60f6-488e-9d56-2f4c5785e310" },
  { name: "Phòng KCB Ngoại", id: "ea5c47f9-6a23-4f8c-9b5d-7d3107a3c8e9" },
  { name: "Phòng Khám Sức Khỏe Định Kỳ", id: "6e37b8c4-5d8f-4f9e-a5c9-7b5e03a7d6f9" },
  { name: "Phòng Tư Vấn Dinh Dưỡng", id: "a5d9f7b6-0f3e-48a9-9e1c-6b72a3e05f7c" },
  { name: "Phòng Khám Chuyên Khoa", id: "b8c9f6a3-5e7d-45a8-92b1-4f6d03a7e5f9" },
  { name: "Phòng Xét Nghiệm", id: "f7a9b6c5-2f4e-4a7d-9b3c-7e5d10c4f8a9" },
  { name: "Phòng Siêu Âm", id: "d8f9b3a5-6e1c-48a7-95b4-7a3e2f5d8c10" },
  { name: "Phòng Chụp X-Quang", id: "c5a7b9f6-4e2f-45d9-8b3a-9e5d7f0a3c10" },
  { name: "Phòng Khám Đa Khoa", id: "e7f5a9c3-2b4d-48a6-9c1b-7d5a3e6f9b10" }
];

export const services: Service[] = [
  {
    name: "Khám Nội",
    id: "3f8f4b1d-1f0c-4a9a-a4a6-4a3bdf7f6470",
    clinics: [
      clinic[0], clinic[1], clinic[2], clinic[3], clinic[4], clinic[5], clinic[6], clinic[7]
    ]
  },
  {
    name: "Khám Phụ sản",
    id: "1a5b3a6e-2f34-47bc-aadb-9d8e7f0b2c19",
    clinics: [
      clinic[2], clinic[3], clinic[4], clinic[5], clinic[6], clinic[7], clinic[8], clinic[9]
    ]
  },
  {
    name: "Khám Tai Mũi Họng",
    id: "af6d67c9-2f24-4ef7-bf6e-0a1c5a9d8e4f",
    clinics: [
      clinic[0], clinic[1], clinic[8], clinic[9], clinic[10], clinic[11], clinic[12], clinic[13]
    ]
  },
  {
    name: "Khám Sức Khỏe(1G)",
    id: "c5b7347f-b6df-4a98-96e3-8a29b047c2ab",
    clinics: [
      clinic[0], clinic[1], clinic[2], clinic[3], clinic[4], clinic[5], clinic[10], clinic[11]
    ]
  },
  {
    name: "Khám sức khỏe nước ngoài(M1)",
    id: "6f12b7e4-b3df-47d6-92a1-efb4f87c6b12",
    clinics: [
      clinic[3], clinic[4], clinic[5], clinic[6], clinic[7], clinic[10], clinic[11], clinic[12]
    ]
  },
  {
    name: "Mua Dịch cụ",
    id: "4b9f3c1a-3b9e-489f-a5b7-d29f47b1e6f7",
    clinics: [
      clinic[1], clinic[2], clinic[4], clinic[6], clinic[8], clinic[10], clinic[12], clinic[14]
    ]
  },
  {
    name: "Dịch vụ khám bệnh số 1",
    id: "6f7d10c5-bf4e-49c6-8a3b-d1e8c59b7a10",
    clinics: [
      clinic[2], clinic[3], clinic[5], clinic[7], clinic[9], clinic[11], clinic[13], clinic[15]
    ]
  },
  {
    name: "Tiêm chủng",
    id: "7f9d1c3b-2f47-4a6e-b1f0-d3e4a8c5f7b2",
    clinics: [
      clinic[0], clinic[2], clinic[4], clinic[6], clinic[8], clinic[10], clinic[12], clinic[14]
    ]
  },
  {
    name: "Khám da liễu",
    id: "5f1a3b9c-2e4b-4f6a-8d10-f7b1e4c5d39f",
    clinics: [
      clinic[1], clinic[3], clinic[5], clinic[7], clinic[9], clinic[11], clinic[13], clinic[15]
    ]
  },
  {
    name: "Khám sức khỏe cơ bản cho Nữ",
    id: "3f2b7a9c-6e1f-49d0-9a5b-2f3b4e7a6c5f",
    clinics: [
      clinic[0], clinic[2], clinic[4], clinic[6], clinic[8], clinic[10], clinic[12], clinic[14]
    ]
  }
];


export const TARGET: ITarget[] = [
  { id: 0, name: "BHYT" },
  { id: 1, name: "Viện phíphí" }
]
export interface PersonalInfo {
  id: "2",
  data: {
    idCode: string;
    personName: string;
    dateOfBirth: string;
    gender: string;
    nationality: string;
    race: string;
    religion: string;
    originPlace: string;
    residencePlace: string;
    personalIdentification: string;
    issueDate: string;
    expiryDate: string;
    fatherName: string;
    motherName: string;
    wifeName: string | null,
    oldIdCode: string;
  }
}

export interface ImageInfo {
  id: "4",
  data: {
    img_data: string,
    dg2: string | null,
    dg13: string | null,
    dg14: string | null,
    dg15: string | null,
    sod: string | null,
    cert: string | null,
  }
}