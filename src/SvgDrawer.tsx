import React, { ReactNode, useState, useEffect } from "react";
import Path from "./Path";
import Tool from './Tools';


interface Props {
  src: string;
  pen? : boolean;
  blackout?: boolean;
  arrow?: boolean
}

interface Line {
  x: number;
  y: number;
}

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

    }
    //TODO something better than ANY
  }

  function ImageSVG(src: string): ReactNode {
    return <image x="0" y="0" xlinkHref={src} />;
  }

  const tool = 'NULL';

  return (
    <div style={{ display: 'flex', flexDirection: "column" }}>
     
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
      <Tool pen blackout arrow selectedTool={tool} />
    </div>
  );
};

export default SvgDrawer;
