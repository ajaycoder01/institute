import { useRef, useState, useEffect } from "react";
import bnrCardsData from "../data/bnrCardsData";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";
import coursesData from "../data/coursesData"



export default function BannerCarousel({ openCoursePage }) {
  const [current, setCurrent] = useState(0);
  const startX = useRef(0);
  const intervalRef = useRef(null);



  const prev = () => {
    setCurrent((prev) =>
      prev === 0 ? bnrCardsData.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrent((prev) =>
      prev === bnrCardsData.length - 1 ? 0 : prev + 1
    );
  };

  const startAuto = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      next();
    }, 4000);
  };

  const stopAuto = () => {
    clearInterval(intervalRef.current);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handlePointerDown = (e) => {
    startX.current = e.clientX;
    stopAuto();
  };

  const handlePointerUp = (e) => {
    const diff = e.clientX - startX.current;

    if (diff > 70) prev();
    else if (diff < -70) next();

    startAuto();
  };

  const getStyle = (index) => {
    const total = bnrCardsData.length;

    const isPrev = index === (current - 1 + total) % total;
    const isNext = index === (current + 1) % total;
    const isActive = index === current;

    if (isActive)
      return "-translate-x-1/2 scale-100 z-30 opacity-100";

    if (isNext)
      return "translate-x-[120px] sm:translate-x-[150px] md:translate-x-[180px] lg:translate-x-[220px] scale-90 z-20 opacity-70 blur-[2px]";

    if (isPrev)
      return "-translate-x-[360px] sm:-translate-x-[420px] md:-translate-x-[500px] lg:-translate-x-[580px] scale-90 z-20 opacity-70 blur-[2px]";

    return "opacity-0 scale-75 pointer-events-none";
  };

  const currentCourseTitle = bnrCardsData[current].title;

  // Find the matching course in coursesData
  const currentCourseInData = coursesData
    .flatMap(course => course.sub)
    .find(sub => sub.bnrTitle === currentCourseTitle);



  return (
    <div className="flex justify-center py-15 md:py-14 px-4 overflow-hidden bg-gray-50"
      style={{
        backgroundColor: "transparent"
      }}
    >

      {/* Container ki height thodi badhayi taaki content cut na ho */}
      <div
        className="relative w-[300px] sm:w-[340px] md:w-[360px] h-[400px] cursor-pointer"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        {bnrCardsData.map((card, i) => (
          <div
            key={card.id}
            onMouseEnter={i === current ? stopAuto : undefined}
            onMouseLeave={i === current ? startAuto : undefined}
            className={`absolute left-1/2 w-[260px] sm:w-[300px] md:w-[320px] lg:w-[360px] 
bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden 
transition-all duration-500 ${getStyle(i)}`}
          >

            {/* Image Header */}
            <div className="relative h-[190px] sm:h-[210px] md:h-[230px] overflow-hidden rounded-xl">

              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 text-white">

                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold leading-tight tracking-wide pb-4">
                  {/* {card.title} */}
                  {card.title.split(" ").map((word, index) => (
                    <span key={index} className="block">
                      {word}
                    </span>
                  ))}
                </h2>

                <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] opacity-90 mt-1">
                  Beginner to Advanced
                </p>

              </div>

            </div>


            {/* Content */}
            <div className="p-5">

              {/* Level + Duration */}
              <div className="flex justify-between items-center text-sm text-gray-500">

                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md font-medium">
                  {card.level}
                </span>

                <span className="flex items-center gap-1">
                  ⏱ {card.duration}
                </span>

              </div>


              {/* Course Title */}
              <h3 className="mt-3 text-sm font-semibold text-gray-800 tracking-wide">
                {card.description}
              </h3>


              {/* Rating */}
              {/* Rating / Know More */}
              <div className="flex items-center mt-1 gap-2">
                {currentCourseInData ? (
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openCoursePage(currentCourseInData);
                    }}
                    className="group inline-flex items-center gap-2
                      text-red-700 font-semibold text-sm
                      transition-all duration-300
                      hover:text-blue-700"
                  >
                    Know More

                    <span
                      className="transform transition-all duration-300
                          group-hover:translate-x-2"
                    >
                      →
                    </span>

                    <span
                      className="absolute h-[2px] w-0 bg-blue-600 bottom-0 left-0
                        transition-all duration-300 group-hover:w-full"
                    ></span>
                  </a>
                ) : null}
              </div>
            </div>

          </div>
        ))}

        {/* Buttons */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-40">
          <button
            onClick={prev}
            className="bg-white/90 backdrop-blur-md hover:bg-blue-950 hover:text-white text-black rounded-full p-3 shadow-lg transition-all"
          >
            <HiArrowSmLeft size={24} />
          </button>

          <button
            onClick={next}
            className="bg-white/90 backdrop-blur-md hover:bg-blue-950 hover:text-white text-black rounded-full p-3 shadow-lg transition-all"
          >
            <HiArrowSmRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}