import React, { useEffect, useRef, useState } from "react";

const stats = [
  { count: 5000, label: "Certified Students", suffix: "+" },
  { count: 1000, label: "Hiring Companies", suffix: "+" },
  { count: 100, label: "Placement Assurance", suffix: "%" },
  { count: 200, label: "Technologies", suffix: "+" },
];

export default function CompanyStats() {

  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();

  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-blue-950 py-12 md:py-16"
    >

      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">

          {stats.map((item, index) => (
            <CounterItem
              key={index}
              target={item.count}
              label={item.label}
              suffix={item.suffix}
              start={startCount}
            />
          ))}

        </div>

      </div>

    </section>
  );
}

function CounterItem({ target, label, suffix, start }) {

  const [count, setCount] = useState(0);

  useEffect(() => {

    if (!start) return;

    let startValue = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {

      startValue += increment;

      if (startValue >= target) {
        setCount(target);
        clearInterval(counter);
      } else {
        setCount(Math.floor(startValue));
      }

    }, 16);

    return () => clearInterval(counter);

  }, [start, target]);

  return (

    <div className="flex flex-col items-center justify-center text-center">

      <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2">
        {count.toLocaleString()}{suffix}
      </h3>

      <p className="text-[#ffaaaa] text-sm md:text-base font-medium tracking-wide">
        {label}
      </p>

    </div>

  );
}