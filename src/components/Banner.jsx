import '@styles/components/banner.css';

import { markdownify } from "@utils/textConverter";
import { useEffect, useRef, useState } from "react";

const Banner = ({ banner }) => {
  const { first_name, last_name, sliding_text, description, image } = banner;

  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const textEl = useRef();
  useEffect(() => {
    const handleBannerScroll = () => {
      if (textEl.current !== null) {
        const scrollValue = window.scrollY;
        textEl.current.style.opacity = ((1000 - scrollValue) / 1000);
        textEl.current.style.transform = `translateX(-${scrollValue}px)`;
      }
    }
    window.addEventListener("scroll", handleBannerScroll);
  }, [textEl]);

  return (
    <section className={`banner pt-20 sm:pt-24 lg:pt-36 pb-0 lg:pb-12 relative`}>
      <div className="fixed top-[-5%] left-[-5%] pointer-events-none -z-[99999] text-[115vh] leading-none whitespace-nowrap font-secondary" ref={textEl}>
        {sliding_text !== "" && (
          <div data-aos="fade-in"><span className="opacity-[0.04]">{sliding_text}</span></div>
        )}
      </div>
      <div className="container h-full">
        <div className="row h-full items-center">
          <div className={`col-12 text-center`}>
            <div className="relative mb-6 mx-auto inline-block md:hidden">
              <span className="inline-block mx-2 md:mx-0">
                {first_name} {last_name}
              </span>
            </div>
            <h1
              className={`text-[clamp(3.5em,_8vw,_6.5em)] leading-tight font-semibold md:flex items-center flex-wrap justify-center font-secondary`}
              data-aos="fade-up-sm"
            >
              <span className="inline-block mx-2 md:mx-0">
                {first_name}
              </span>
              <span className="inline-block mx-2 md:mx-0">
                {last_name}
              </span>
            </h1>
            <div
              className="mt-5 md:mt-8 md:text-xl font-light md:max-w-xl mx-auto"
              data-aos="fade-up-sm"
              data-aos-delay="100"
              dangerouslySetInnerHTML={{ __html: markdownify(description) }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
