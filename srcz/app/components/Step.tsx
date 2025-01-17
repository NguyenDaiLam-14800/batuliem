type RowStep = {
  steps: string[];
  step: number;
};
const Step = ({ steps, step }: RowStep) => {
  const limitedStep = Math.max(0, Math.min(step, steps.length - 1));

  return (
    <>
      <div className="w-full py-6">
        <div className="flex">
          {steps?.length && steps.map((label, index) =>
            <div style={{ width: `${100 / steps.length}%` }} key={index}>
              <div className="relative mb-2">
                {index > 0 &&
                  <div className="absolute flex align-center items-center align-middle content-center w-[calc(100%-56px)] lg:w-[calc(100%-64px)] -translate-x-1/2 -translate-y-1/2 top-1/2">
                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                      <div className={`${index <= limitedStep ? "w-full" : "w-0"} bg-[var(--niad-color)] py-[1px] rounded`}></div>
                    </div>
                  </div>
                }
                <span className={(index === limitedStep ? "border-[var(--niad-color)] text-[var(--niad-color)] bg-gray-50" : index < limitedStep ? "bg-[var(--niad-color)] border-transparent text-white" : "bg-gray-50 border-2 border-gray-200") + " " + " w-14 h-14 border-2 rounded-full flex justify-center items-center mx-auto mb-3 text-xl lg:w-16 lg:h-16 shadow-lg"}>{index + 1}</span>
              </div>

              <div className="text-xs text-center md:text-xl">{label}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Step;