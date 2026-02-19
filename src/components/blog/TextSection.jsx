import DOMPurify from "dompurify";

export const TextSection = ({ html }) => {
  return (
    <section
      className=" w-full px-4 py-8 max-w-[790px] mx-auto"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    ></section>
  );
};