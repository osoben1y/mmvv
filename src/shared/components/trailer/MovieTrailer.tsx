import { memo, type FC } from "react";
import { X } from "lucide-react";

interface Props {
  videoKey: string;
  isOpen: boolean;
  onClose: () => void;
}

const MovieTrailer: FC<Props> = ({ videoKey, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-4xl p-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-xl">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieTrailer);