'use client'
import { ReactNode, useContext, useState } from "react";
import { LoadingContext } from "./LoadingContext";
import Loading from "./ui/Loading";

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }
    }>
      {children}
      {isLoading &&
        <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-20 z-50 flex items-center justify-center">
          <Loading />
        </div>
      }
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading phải được sử dụng bên trong LoadingProvider");
  }
  return context;
};