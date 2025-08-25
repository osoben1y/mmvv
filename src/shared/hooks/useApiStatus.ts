import { useState, useCallback } from "react";

type Status = "idle" | "loading" | "success" | "error";

export const useApiStatus = (initialStatus: Status = "idle") => {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [errorState, setErrorState] = useState<Error | null>(null);

  const setIdle = useCallback(() => {
    setStatus("idle");
    setErrorState(null);
  }, []);

  const setLoading = useCallback(() => {
    setStatus("loading");
    setErrorState(null);
  }, []);

  const setSuccess = useCallback(() => {
    setStatus("success");
    setErrorState(null);
  }, []);

  const setError = useCallback((error: Error) => {
    setStatus("error");
    setErrorState(error);
  }, []);

  return {
    status,
    error: errorState,
    isIdle: status === "idle",
    isLoading: status === "loading",
    isSuccess: status === "success",
    isError: status === "error",
    setIdle,
    setLoading,
    setSuccess,
    setError,
  };
};