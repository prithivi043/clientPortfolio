import { useEffect } from "react";

const VideoModal = ({ src, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl"
      >
        ×
      </button>

      <video
        src={src}
        controls
        autoPlay
        className="max-w-[90vw] max-h-[90vh] rounded-2xl"
      />
    </div>
  );
};

export default VideoModal;
