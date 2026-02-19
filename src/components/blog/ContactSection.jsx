export const ContactSection = ({ imgUrl, name, desc }) => {
  return (
    <section className=" py-20 ">
      <div className="max-w-237.5 mx-auto text-center px-6">
        {/* Divider with avatar */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>

          <img
            src={imgUrl} // replace with your image path
            alt="Danny Amacher"
            className="w-18 h-18 rounded-full object-cover mx-6"
          />

          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Name */}
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{name}</h2>

        {/* Subtitle */}
        <p className="text-base text-gray-600 mb-4 tracking-tight">{desc}</p>

        {/* Button */}
        <button className=" text-white px-6 py-2 rounded-full text-base font-medium hover:opacity-90 bg-[#0B0D2E] transition-colors duration-200 tracking-tight">
          Get in touch
        </button>
      </div>
    </section>
  );
};