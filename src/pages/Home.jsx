import {
  footerCarousel,
  moreBlog,
  textHtml1,
  textHtml2,
  textHtml3,
  textHtml4,
  textHtml5,
  textHtml6,
  textHtml7,
  title,
  user,
} from "../data";
import { Link } from "react-router-dom";
import { Header } from "../components/blog/Header";
import { ContactSection } from "../components/blog/ContactSection";
import { MoreBlogCard } from "../components/blog/MoreBlogCard";
import { TextSection } from "../components/blog/TextSection";
import { ShowImage } from "../components/blog/ShowImage";
import { StackedCard } from "../components/ui/StackedCard";
import { InfiniteStackedCarousel } from "../components/InfiniteStackedCarousel";
import { IconStack } from "../components/IconStack";

export const Home = () => {
  return (
    <>
    <IconStack className={" fixed z-50 top-1/2 right-0 -translate-x-1/2 sm:block hidden"}/>
      <Header title={title} user={user} />
      <section id="content" className=" pb-8 mb-3">
        <TextSection html={textHtml1} />
        <ShowImage url={"./media1.gif"} />
        <br />
        <br />
        <br />
        <ShowImage url={"./media2.webp"} />
        <br />
        <TextSection html={textHtml2} />
        {/* <br /> */}
        <ShowImage url={"./media3.webp"} />
        <br />
        <br />
        <br />
        <ShowImage url={"./media4.webp"} />
        <br />
        <TextSection html={textHtml3} />
        <br />
        <ShowImage url={"./media5.webp"} />
        <br />
        <br />
        <TextSection html={textHtml4} />
        <br />
        <br />
        <ShowImage url={"./media6.gif"} />
        <br />
        <TextSection html={textHtml5} />
        <br />
        <ShowImage url={"./media7.webp"} />
        <br />
        <br />
        <ShowImage url={"./media8.webp"} w={64} />
        <br />
        <TextSection html={textHtml6} />
        <br />
        <ShowImage url={"./media9.gif"} />
        <br />
        <br />
        <br />
        <ShowImage url={"./media10.gif"} />
        <br />
        <TextSection html={textHtml7} />
      </section>
      <ContactSection imgUrl={user.imgUrl} name={user.name} desc={user.desc} />
      <MoreBlog name={user.name} data={moreBlog} />

      <InfiniteStackedCarousel items={footerCarousel} />
    </>
  );
};

const MoreBlog = ({ name, data }) => {
  return (
    <div className="max-w-237.5 mx-auto px-4">
      <div className=" flex justify-between items-center">
        <h3 className="font-semibold text-base mb-4">More by {name}</h3>
        <Link className="font-normal text-base text-gray-950 hover:text-gray-700 transition">
          View profile
        </Link>
      </div>

      <div className=" grid md:grid-cols-2 grid-cols-1 gap-10">
        {data &&
          data.map((el, ind) => {
            return (
              <MoreBlogCard
                key={ind}
                Imgurl={el.imgUrl}
                title={el.title}
                desc={el.desc}
              />
            );
          })}
      </div>
    </div>
  );
};
