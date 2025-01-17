type RowStep = {
  steps: string[];
  step: number;
};

export default function StepIndicator({ steps, step }: RowStep) {
  const limitedStep = Math.max(0, Math.min(step, steps.length - 1));

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center mx-auto space-y-2 sm:space-y-0 mb-4 border border-gray-400 rounded-lg md:rounded-full max-w-full sm:max-w-2xl p-4">
      {steps.map((label, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className={`text-xs font-semibold w-6 h-6 flex items-center justify-center border border-gray-400 rounded-full ${
              index === limitedStep ? "bg-blue-400 text-white" : ""
            }`}
          >
            {index < limitedStep ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a 1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <div>{label}</div>

          {index < steps.length - 1 && (
            <div
              className={`w-5 h-0.5 ${
                index < limitedStep ? "bg-gray-400" : "bg-white"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
