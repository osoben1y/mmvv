import { memo, type FC } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  error?: Error | null;
  resetErrorBoundary?: () => void;
  message?: string;
}

const ErrorFallback: FC<Props> = ({
  error,
  resetErrorBoundary,
  message = "Что-то пошло не так",
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-8 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">{message}</h2>
      {error && (
        <p className="text-gray-400 mb-4 max-w-md">
          {error.message || "Произошла ошибка при загрузке данных"}
        </p>
      )}
      {resetErrorBoundary && (
        <button
          onClick={resetErrorBoundary}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Попробовать снова
        </button>
      )}
    </div>
  );
};

export default memo(ErrorFallback);