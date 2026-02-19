import { Bookmark, Heart } from "lucide-react";

export const MoreBlogCard = ({ Imgurl, title, desc }) => {
  return (
    <div className="flex col-span-1 items-center justify-center">
      <div className="group  z-0 relative rounded-md w-full h-[350px] overflow-hidden cursor-pointer">
        {/* Background Image */}
        <div
          className="absolute z-0 w-full h-full bg-red-800 bg-cover bg-center transition-transform duration-500 "
          style={{
            backgroundImage: `url('${Imgurl}')`,
          }}
        />

        {/* Bottom Hover Content */}
        <div className="absolute bottom-0 left-0 w-full  min-h-1/ pt-8 px-4 pb-5 group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out bg-linear-to-t from-black/60 to-transparent  flex justify-between items-center">
          <h2 className="text-base font-semibold text-white ">{title}</h2>
          <div className=" flex items-center justify-center gap-3">
            <button className="w-10 h-10 flex cursor-pointer items-center justify-center rounded-full border-2  border-gray-100 bg-white transition">
              <Bookmark size={17} className="text-gray-700 hover:text-gray-500 transition" />
            </button>
            <button className="w-10 h-10 flex cursor-pointer items-center justify-center rounded-full border-2 border-gray-100 bg-white transition">
              <Heart size={17} className="text-gray-700 hover:text-gray-500 transition" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};