"use client"
import React, { useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ButtonFooter from "@/app/lib/ButtonFooter";
interface Service {
  id: number;
  name: string;
  price: number;
  children?: Service[];
}

const services: Service[] = [
  {
    id: 1,
    name: "Khám tổng quát",
    price: 500000,
    children: [
      { id: 11, name: "Xét nghiệm máu", price: 200000 },
      { id: 12, name: "Siêu âm bụng", price: 300000 },
    ],
  },
  {
    id: 2,
    name: "Khám thận chuyên sâu",
    price: 1000000,
    children: [
      { id: 21, name: "Đo chức năng thận", price: 400000 },
      { id: 22, name: "Siêu âm Doppler thận", price: 600000 },
    ],
  },
];

const ServiceCollapse: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  const toggleService = (service: Service, isParent: boolean = false) => {
    let updatedServices: Service[];
    if (selectedServices.some((s) => s.id === service.id)) {
      updatedServices = selectedServices.filter((s) => s.id !== service.id);

      if (isParent) {
        updatedServices = updatedServices.filter(
          (s) => !service.children?.some((child) => child.id === s.id)
        );
      }
    } else {
      updatedServices = [...selectedServices, service];

      if (isParent && service.children) {
        updatedServices = [
          ...updatedServices,
          ...service.children.filter(
            (child) => !selectedServices.some((s) => s.id === child.id)
          ),
        ];
      }
    }

    setSelectedServices(updatedServices);
  };

  const calculateTotal = (): number => {
    return selectedServices.reduce((sum, service) => sum + service.price, 0);
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <h1 className="text-2xl text-center font-bold mb-6">Mời bạn chọn dịch vụ muốn thanh toán</h1>
      <ServiceList
        services={services}
        selectedServices={selectedServices}
        toggleService={toggleService}
      />
      <Summary total={calculateTotal()} />
      <ButtonFooter prev={"/payment"}
        next={!selectedServices.length ? "" : `/payment/qr?amount=${calculateTotal()}&prev=/payment/service`}
      />
    </div>
  );
};

interface ServiceListProps {
  services: Service[];
  selectedServices: Service[];
  toggleService: (service: Service, isParent?: boolean) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  selectedServices,
  toggleService,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow flex-grow overflow-y-auto">
      {services.map((service) => (
        <ParentService
          key={service.id}
          service={service}
          selectedServices={selectedServices}
          toggleService={toggleService}
        />
      ))}
    </div>
  );
};

interface ParentServiceProps {
  service: Service;
  selectedServices: Service[];
  toggleService: (service: Service, isParent?: boolean) => void;
}

const ParentService: React.FC<ParentServiceProps> = ({
  service,
  selectedServices,
  toggleService,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isChecked = selectedServices.some((s) => s.id === service.id);

  return (
    <div className="border-b border-gray-200 py-2">
      <div className="flex items-center justify-between">
        <div className="flex">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 text-left text-gray-800 font-bold"
          >
            {isOpen
              ? <KeyboardArrowUpIcon />
              : <KeyboardArrowDownIcon />
            }
            {service.name} - {service.price.toLocaleString()}đ
          </button>
        </div>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => toggleService(service, true)}
          className="mr-3"
        />
      </div>
      {isOpen && service.children && (
        <div className="ml-6 mt-2">
          {service.children.map((child) => (
            <ChildService
              key={child.id}
              service={child}
              selectedServices={selectedServices}
              toggleService={toggleService}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ChildServiceProps {
  service: Service;
  selectedServices: Service[];
  toggleService: (service: Service) => void;
}

const ChildService: React.FC<ChildServiceProps> = ({
  service,
  selectedServices,
  toggleService,
}) => {
  const isChecked = selectedServices.some((s) => s.id === service.id);

  return (
    <div className="flex items-center justify-between py-1">
      <span>
        {service.name} - {service.price.toLocaleString()}đ
      </span>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => toggleService(service)}
        className="mr-3"
      />
    </div>
  );
};

interface SummaryProps {
  total: number;
}

const Summary: React.FC<SummaryProps> = ({ total }) => {
  return (
    <div className="mt-6 bg-white p-4 rounded flex justify-end">
      <div>
        <h2 className="text-lg font-bold">Tổng tiền</h2>
        <p className="text-xl">{total.toLocaleString()}đ</p>
      </div>
    </div>
  );
};

export default ServiceCollapse;
