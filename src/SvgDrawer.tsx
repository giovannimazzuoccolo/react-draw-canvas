import React, { ReactNode, useState, useEffect } from "react";
import Path from "./Path";

interface Props {
  src: string;
}

interface Line {
  x: number;
  y: number;
}

interface Lines extends Array<Line> {}

const SvgDrawer: React.FC<Props> = ({ src }) => {
  const [XY, updateDim] = useState([0, 0]);
  const [isDrawing, startDraw] = useState(false);
  const [lines, updateLine] = useState<Array<Line>>([]);

  useEffect(() => {
    const Img = new Image();
    Img.onload = () => {
      updateDim([Img.naturalWidth, Img.naturalHeight]);
    };
    Img.src = src;
  }, [src]);

  function handleMouseDown(e: any) {
    //TODO something better than ANY
    if (!isDrawing) {
      startDraw(true);
    }
  }

  function handleMouseUp(e: any) {
    if (isDrawing) {
      startDraw(false);
    }
  }

  function handleMouseMove(e: any) {
    if (isDrawing) {
      updateLine([...lines, { x: e.clientX, y: e.clientY }]);

      console.log("ll", lines);
    }
    //TODO something better than ANY
  }

  function ImageSVG(src: string): ReactNode {
    return <image x="0" y="0" xlinkHref={src} />;
  }

  return (
    <>
      <svg
        width={XY[0]}
        height={XY[1]}
        onMouseDown={e => {
          handleMouseDown(e);
        }}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={e => handleMouseUp(e)}
      >
        {ImageSVG(src)}
        {lines && lines.length > 1 && <Path line={lines} />}
      </svg>
    </>
  );
};

export default SvgDrawer;
