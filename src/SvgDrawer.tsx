import React, { ReactNode, useState, useEffect, useRef } from "react";
import Path from "./svgElements/Path";
import Rect from "./svgElements/Rect";
import Arrow from "./svgElements/Arrow";
import Tools from "./Tools";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles } from "@material-ui/styles";

interface Props {
  src: string;
  pen?: boolean;
  blackout?: boolean;
  arrow?: boolean;
}

interface Line {
  x: number;
  y: number;
}

type toolList = "PEN" | "BLACKOUT" | "ARROW" | "NULL";

const useStyles = makeStyles(() =>
  createStyles({
    root: { display: "flex", flexDirection: "column" }
  })
);

const SvgDrawer: React.FC<Props> = ({ src }) => {
  const [XY, updateDim] = useState([0, 0]);
  const [isDrawing, startDraw] = useState(false);

  const [lines, updateLine] = useState<Array<Line>>([]);
  const [rects, updateRects] = useState();
  const [arrows, updateArrows] = useState<Line>();

  const [selectedTool, changeTool] = useState<toolList>("NULL");

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const Img = new Image();
    Img.onload = () => {
      updateDim([Img.naturalWidth, Img.naturalHeight]);
    };
    Img.src = src;
  }, [src]);

  function handleMouseDown(e: any) {
    let left = 0;
    let top = 0;

    if (svgRef.current !== null) {
      left = svgRef.current.getBoundingClientRect().left;
      top = svgRef.current.getBoundingClientRect().top;
    }

    //TODO something better than ANY
    if (!isDrawing && selectedTool !== "NULL") {
      startDraw(true);
      if (selectedTool === "BLACKOUT" && !rects) {
        const updates = {
          startPos: { x: e.clientX - left, y: e.clientY - top },
          endPos: { w: 0, h: e.clientY - top }
        };
        updateRects(updates);
      }
    }
  }

  function handleMouseUp(e: any) {
    if (isDrawing) {
      startDraw(false);
    }
  }

  function handleMouseMove(e: any) {
    let left = 0;
    let top = 0;

    if (svgRef.current !== null) {
      left = svgRef.current.getBoundingClientRect().left;
      top = svgRef.current.getBoundingClientRect().top;
    }

    if (isDrawing && selectedTool === "PEN") {
      updateLine([...lines, { x: e.clientX - left, y: e.clientY - top }]);
    }

    if (isDrawing && selectedTool === "BLACKOUT") {
      const updates = {
        startPos: { x: rects.startPos.x, y: rects.startPos.y },
        endPos: {
          w: e.clientX - left - rects.startPos.x,
          h: e.clientY - top - rects.startPos.y
        }
      };
      updateRects(updates);
    }

    if (isDrawing && selectedTool === 'ARROW') {
      updateArrows({ x: e.clientX - left, y: e.clientY - top });
    }
    //TODO something better than ANY
  }

  function ImageSVG(src: string): ReactNode {
    return <image x="0" y="0" xlinkHref={src} />;
  }

  function changeToolFunc(tool: toolList) {
    changeTool(tool);
  }

  function restoreImage() {
    updateLine([]);
    updateRects({});
    changeTool("NULL");
  }

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <svg
        width={XY[0]}
        height={XY[1]}
        onMouseDown={e => {
          handleMouseDown(e);
        }}
        onMouseMove={e => handleMouseMove(e)}
        onMouseUp={e => handleMouseUp(e)}
        ref={svgRef}
      >
        {ImageSVG(src)}
        {arrows && <Arrow line={arrows} />}
        {rects && <Rect startPos={rects.startPos} endPos={rects.endPos} />}
        {lines && lines.length > 1 && <Path line={lines} />}
      </svg>
      <Tools
        pen
        blackout
        arrow
        selectedTool={selectedTool}
        changeTool={changeToolFunc}
        restoreImage={restoreImage}
      />
    </Paper>
  );
};

export default SvgDrawer;
