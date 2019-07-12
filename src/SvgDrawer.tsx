import React, { ReactNode, useState, useEffect } from "react";

interface Props {
  src: string;
}

const SvgDrawer: React.FC<Props> = ({ src }) => {
  const [XY, updateDim] = useState([0, 0]);
  const [lines, updateLine] = useState([{}]);

  useEffect(() => {
    const Img = new Image();
    Img.onload = () => {
      console.log("nn", Img.naturalWidth);
      updateDim([Img.naturalWidth, Img.naturalHeight]);
    };
    Img.src = src;
  }, [src]);

  function handleMouseDown(e:any) { //TODO something better than ANY
    const newLines = [...lines, { x: e.clientX - XY[0], y: e.clientY - XY[1] } ];
    updateLine(newLines);

  }

  function handleMouseMove(e:any) { //TODO something better than ANY

  }

  function ImageSVG(src: string): ReactNode {
    return <image x="0" y="0" xlinkHref={src} />;
  }

  return (
    <>
      <svg width={XY[0]} height={XY[1]} onMouseDown={(e) => {handleMouseDown(e)}} onMouseMove={(e) => handleMouseMove(e)}>
        {ImageSVG(src)}
        {lines.map((line: any) => (
            <path d={line} />
        ))}
      </svg>
    </>
  );
};

export default SvgDrawer;
