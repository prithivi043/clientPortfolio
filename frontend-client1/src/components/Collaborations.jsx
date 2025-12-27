import BrandCard from "./BrandCard";
import { brands } from "../data/brands";

const Collaborations = () => {
  return (
    <section
      id="Collaborations"
      className="relative w-full py-24 px-6 bg-gradient-to-br from-[#050b2c] via-[#020617] to-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center mb-24">
        <p className="text-gray-400 text-sm tracking-wide mb-3">
          collaborated with
        </p>

        <h2 className="relative inline-block text-4xl sm:text-5xl lg:text-6xl leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-indigo-600">
            Top Brands
          </span>
          <span className="text-white"> & Creators</span>

          {/* subtle underline accent */}
          <span className="absolute left-1/2 -bottom-4 h-[2px] w-24 -translate-x-1/2 rounded-full bg-indigo-500/60" />
        </h2>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      {/* Carousel */}
      <div className="relative overflow-hidden pt-4">
        <div className="flex w-max gap-x-16 logo-marquee">
          {[...brands, ...brands].map((brand, index) => (
            <div
              key={index}
              className="
          group
          transition-all
          duration-300
          opacity-70
          hover:opacity-100
        "
            >
              <BrandCard {...brand} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collaborations;
