"use client";
import React, { useState, useEffect } from "react";
import { createCanvas, loadImage } from "canvas";

const GRID_SIZE = 32;
const PIXEL_SIZE = 10;
const WIDTH = GRID_SIZE * PIXEL_SIZE;
const HEIGHT = GRID_SIZE * PIXEL_SIZE;

// const BASE_URL = "http://localhost:3000";
const BASE_URL = "";

const headPatterns = [
  `${BASE_URL}/head/head-beluga.png`,
  `${BASE_URL}/head/head-abstract.png`,
  `${BASE_URL}/head/head-ape.png`,
  `${BASE_URL}/head/head-beluga.png`,
  `${BASE_URL}/head/head-bagpipe.png`,
  `${BASE_URL}/head/head-banana.png`,
  `${BASE_URL}/head/head-bank.png`,
  `${BASE_URL}/head/head-baseball-gameball.png`,
  `${BASE_URL}/head/head-basketball.png`,
  `${BASE_URL}/head/head-bat.png`,
  `${BASE_URL}/head/head-bear.png`,
  `${BASE_URL}/head/head-bell.png`,
  `${BASE_URL}/head/head-bigfloot-yeti.png`,
  `${BASE_URL}/head/head-bigfoot.png`,
  `${BASE_URL}/head/head-blackhole.png`,
  `${BASE_URL}/head/head-blueberry.png`,
  `${BASE_URL}/head/head-bomb.png`,
  `${BASE_URL}/head/head-bonsai.png`,
  `${BASE_URL}/head/head-boombox.png`,
  `${BASE_URL}/head/head-boot.png`,
  `${BASE_URL}/head/head-box.png`,
  `${BASE_URL}/head/head-boxingglove.png`,
  `${BASE_URL}/head/head-brain.png`,
  `${BASE_URL}/head/head-bubble-speech.png`,
  `${BASE_URL}/head/head-bubblegum.png`,
  `${BASE_URL}/head/head-burger-dollarmenu.png`,
  `${BASE_URL}/head/head-cake.png`,
  `${BASE_URL}/head/head-calculator.png`,
  `${BASE_URL}/head/head-calendar.png`,
  `${BASE_URL}/head/head-cannedham.png`,
  `${BASE_URL}/head/head-car.png`,
  `${BASE_URL}/head/head-cash-register.png`,
  `${BASE_URL}/head/head-cassettetape.png`,
  `${BASE_URL}/head/head-cat.png`,
  `${BASE_URL}/head/head-cd.png`,
  `${BASE_URL}/head/head-chain.png`,
];
const bodyPatterns = [
  `${BASE_URL}/body/body-bege-bsod.png`,
  `${BASE_URL}/body/body-bege-crt.png`,
  `${BASE_URL}/body/body-blue-sky.png`,
  `${BASE_URL}/body/body-cold.png`,
];
const accessoriesPatterns = [
  `${BASE_URL}/accessories/accessory-1n.png`,
  `${BASE_URL}/accessories/accessory-aardvark.png`,
  `${BASE_URL}/accessories/accessory-axe.png`,
  `${BASE_URL}/accessories/accessory-belly-chameleon.png`,
  `${BASE_URL}/accessories/accessory-bird-flying.png`,
  `${BASE_URL}/accessories/accessory-bird-side.png`,
];
const glassesPatterns = [
    `${BASE_URL}/glasses/glasses-hip-rose.png`,
    `${BASE_URL}/glasses/glasses-square-black-eyes-red.png`,
    `${BASE_URL}/glasses/glasses-square-black-rgb.png`,
    `${BASE_URL}/glasses/glasses-square-black.png`,
    `${BASE_URL}/glasses/glasses-square-blue-med-saturated.png`,
    `${BASE_URL}/glasses/glasses-square-blue.png`,
    `${BASE_URL}/glasses/glasses-square-frog-green.png`,
    `${BASE_URL}/glasses/glasses-square-fullblack.png`,
    `${BASE_URL}/glasses/glasses-square-green-blue-multi.png`,
  ];
  
export const loadColorMap = async (url: string): Promise<string[][]> => {
  const image = await loadImage(url);
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(image, 0, 0);

  const { width, height } = image;
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const colorMap: string[][] = [];
  for (let y = 0; y < height; y++) {
    const row: string[] = [];
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      row.push(a === 0 ? "transparent" : `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`);
    }
    colorMap.push(row);
  }

  return colorMap;
};

const generateLayerFromPattern = (pattern: string[][]): string => {
  return pattern
    .map((row, y) =>
      row
        .map((cell, x) =>
          cell !== "transparent"
            ? `<rect x='${x * PIXEL_SIZE}' y='${
                y * PIXEL_SIZE
              }' width='${PIXEL_SIZE}' height='${PIXEL_SIZE}' fill='${cell}' />`
            : ""
        )
        .join("")
    )
    .join("");
};

const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

const PixelArt = () => {
  const [svg, setSvg] = useState<string | null>(null);

  const generatePixelArtSVG = async () => {
    const randomHeadPattern = headPatterns[getRandomIndex(headPatterns.length)];
    const randomBodyPattern = bodyPatterns[getRandomIndex(bodyPatterns.length)];
    const randomAccessoryPattern = accessoriesPatterns[getRandomIndex(accessoriesPatterns.length)];
    const randomGrallesPattern = glassesPatterns[getRandomIndex(glassesPatterns.length)];

    const head = await loadColorMap(randomHeadPattern);
    const body = await loadColorMap(randomBodyPattern);
    const glasses = await loadColorMap(randomGrallesPattern);
    const accessory = await loadColorMap(randomAccessoryPattern);

    const svgString = `
    <svg width='${WIDTH}' height='${HEIGHT}' viewBox='0 0 ${WIDTH} ${HEIGHT}' xmlns='http://www.w3.org/2000/svg'>
      <style>
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .blink {
          /* 各 rect 要素の中心を基準に縮小する */
          transform-origin: center;
          animation: blink 3s infinite;
        }
      </style>
      ${generateLayerFromPattern(body)}
      ${generateLayerFromPattern(head)}
      <!-- ここでは目（またはグラス）部分を <g> で囲んでアニメーションを適用 -->
      <g class="blink">
        ${generateLayerFromPattern(glasses)}
      </g>
      ${generateLayerFromPattern(accessory)}
    </svg>
  `;
  
    setSvg(svgString);
  };

  useEffect(() => {
    generatePixelArtSVG();
  }, []);

  return (
    <div>
      {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <p>Loading...</p>}
      <button
        onClick={() => generatePixelArtSVG() }
        style={{ marginTop: "10px", padding: "5px 10px" }}
      >
        Regenerate
      </button>
    </div>
  );
};

export default PixelArt;
