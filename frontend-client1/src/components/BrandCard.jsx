const BrandCard = ({ logo, name, description }) => {
  return (
    <div className="flex flex-col items-center text-center w-[240px] shrink-0 group">
      <div
        className="
          w-36 h-36 rounded-full bg-white mb-5
          flex items-center justify-center
          shadow-lg
          transition-all duration-300 ease-out
          group-hover:-translate-y-[2px]
          group-hover:shadow-[0_0_20px_rgba(99,102,241,0.45)]
        "
      >
        <img
          src={logo}
          alt={name}
          className="w-[82%] h-[82%] object-contain rounded-full"
        />
      </div>

      <p className="text-white text-[18px] font-semibold mb-2">{name}</p>

      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default BrandCard;
