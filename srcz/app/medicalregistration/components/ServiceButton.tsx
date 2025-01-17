"use client"
import { Service } from "@/app/constants";
import CheckIcon from '@mui/icons-material/Check';

const ServiceButton = (props: { service: Service, checked: boolean, span: number, handleCheck: (data: Service) => void }) => {
    const { service, checked, span, handleCheck } = props;
    return (
        <div className={`relative rounded col-span-${span} `} onClick={() => handleCheck(service)}>
            <div className={`h-full flex items-center justify-center shadow-lg bg-[#f4f4f4] text-[var(--niad-color)] rounded text-center hover:text-white hover:bg-[var(--niad-color)] text-xs sm:text-sm ${checked ? 'bg-[var(--niad-color)] text-white' : ''}`}>
                {service.name}
            </div>
            {checked && <div className={`absolute -top-4 -right-4 w-8 h-8 rounded-full flex justify-center items-center bg-white p-1 border`}><CheckIcon className="text-[var(--niad-color)] text-lg" /></div>}
        </div>
    );
}

export default ServiceButton;