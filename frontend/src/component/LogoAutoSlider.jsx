

import React, { useState } from 'react'

import { motion } from "framer-motion";
import { useEffect } from "react";
import ccc from '../assets/ccc.jpg'
import html from '../assets/html.svg'
import css from '../assets/css.svg'
import js from '../assets/js.svg'
import java from '../assets/java.svg'
import mongodb from '../assets/mongodb.svg'
import mysql from '../assets/mysql.svg'
import node from '../assets/node.svg'
import office from '../assets/office.svg'
import powerbi from '../assets/powerbi.svg'
import ppt from '../assets/ppt.png'
import premiere from '../assets/premiere.svg'
import python from '../assets/python.svg'
import react from '../assets/react.svg'
import tableau from '../assets/tableau.svg'
import tally from '../assets/tally.png'
import word from '../assets/word.png'
import indesign from '../assets/indesign.svg'
import illustrator from '../assets/Illustrator.png'
import gst from '../assets/gst.jpg'
import excel from '../assets/excel.svg'
import dsa from '../assets/dsa.jpg'
import coreldraw from '../assets/coreldraw.svg'
import cplusplus from '../assets/cplusplus.svg'
import angular from '../assets/angular.svg'
import algo from '../assets/algo.svg'
import afterEff from '../assets/after-effects.svg'
import AdobePhotoshop from '../assets/AdobePhotoshop.png'
import AdobeAnim from '../assets/AdobeAnimate.svg'


const logos = [
  { img: ccc, name: "CCC" },
  { img: office, name: "Microsoft Office" },
  { img: excel, name: "Excel" },
  { img: ppt, name: "PowerPoint" },
  { img: word, name: "Word" },
  { img: tally, name: "Tally" },
  { img: gst, name: "GST" },
  { img: cplusplus, name: "C++" },
  { img: python, name: "Python" },
  { img: tableau, name: "Tableau" },
  { img: powerbi, name: "Power BI" },
  { img: dsa, name: "DSA" },
  { img: algo, name: "Algorithms" },
  { img: java, name: "Java" },
  { img: html, name: "HTML" },
  { img: css, name: "CSS" },
  { img: js, name: "JavaScript" },
  { img: react, name: "React" },
  { img: angular, name: "Angular" },
  { img: node, name: "Node.js" },
  { img: mongodb, name: "MongoDB" },
  { img: mysql, name: "MySQL" },
  { img: premiere, name: "Premiere Pro" },
  { img: AdobePhotoshop, name: "Adobe Photoshop" },
  { img: AdobeAnim, name: "Adobe Animate" },
  { img: indesign, name: "InDesign" },
  { img: illustrator, name: "Illustrator" },
  { img: coreldraw, name: "CorelDRAW" },
  { img: afterEff, name: "After Effects" },
];

const LogoAutoSlider = () => {
  const [index, setIndex] = useState(0);

  // Duplicate logos for seamless infinite loop
  const duplicated = [...logos, ...logos];

  const logoCount = logos.length;

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % logoCount);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % logoCount);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + logoCount) % logoCount);
  };

  return (
    <div className="bg-gray-50 py-10 overflow-hidden relative">


      {/* SLIDER */}
      <motion.div
        animate={{ x: -index * 160 }}
        transition={{ duration: 0.5 }}
        className="flex gap-4 md:gap-8 w-max"
      >
        {duplicated.map((logo, i) => (
          <div
            key={i}
            className="flex flex-col items-center min-w-[120px]"
          >
            <img
              src={logo.img}
              alt={logo.name}
              className="h-12 w-auto object-contain mb-2"
            />
            <p className="text-sm font-medium text-gray-700">
              {logo.name}
            </p>
          </div>
        ))}
      </motion.div>

    </div>
  );
};

export default LogoAutoSlider;