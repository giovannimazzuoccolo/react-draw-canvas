import React, { ReactNode, useState, useEffect, useRef } from "react";
import Path from "./svgElements/Path";
import Rect from "./svgElements/Rect";
import Arrow from "./svgElements/Arrow";
import Tools from "./Tools";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles } from "@material-ui/styles";
import { ToolList, Coord, TypedRect, TypedArrow } from "./types";

interface Props {
  src: string;
  pen?: boolean;
  blackout?: boolean;
  arrow?: boolean;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: { display: "flex", flexDirection: "column" }
  })
);

const SvgDrawer: React.FC<Props> = ({ src }) => {
  const [XY, updateDim] = useState([0, 0]);
  const [isDrawing, startDraw] = useState(false);

  const [paths, updatePaths] = useState<Array<Coord>>([]);
  const [savedPaths, storePaths] = useState<Array<Array<Coord>>>([]);

  const [rect, updateRect] = useState<TypedRect>();
  const [savedRects, storeRects] = useState<Array<TypedRect>>([]);

  const [arrow, updateArrow] = useState<TypedArrow>();
  const [savedArrows, storeArrows] = useState<Array<TypedArrow>>([]);

  const [selectedTool, changeTool] = useState<ToolList>("NULL");

  const [SVGselection, updateSVGselection] = useState();

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
      if (selectedTool === "BLACKOUT" && !rect) {
        const updates = {
          startPos: { x: e.clientX - left, y: e.clientY - top },
          endPos: { w: 0, h: e.clientY - top },
          isDragging: true
        };
        updateRect(updates);
      }
      if (selectedTool === "ARROW" && !arrow) {
        const updates = {
          startPos: { x: e.clientX - left, y: e.clientY - top },
          endPos: { w: e.clientX - left, h: e.clientY - top },
          isDragging: true,
        };
        updateArrow(updates);
      }
    }
  }

  function handleMouseUp(e: any) {
    if (isDrawing) {
      startDraw(false);
      if (selectedTool === "BLACKOUT") {
        if (rect) {
          const lastRect = rect;
          updateRect(undefined);
          const oldRects = savedRects;
          oldRects.push(lastRect);
          storeRects(oldRects);
        }
      }
      if (selectedTool === "PEN") {
        const finalizedPath = paths;
        const oldPaths = savedPaths;
        oldPaths.push(finalizedPath);
        storePaths(oldPaths);
        updatePaths([]);
      }

      if (selectedTool === "ARROW") {
        if (arrow) {
          const getArrow = arrow;
          updateArrow(undefined);
          const oldArrows = savedArrows;
          oldArrows.push(getArrow);
          storeArrows(oldArrows);
        }
      }
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
      updatePaths([...paths, { x: e.clientX - left, y: e.clientY - top }]);
    }

    if (isDrawing && selectedTool === "BLACKOUT") {
      if (rect) {
        const updates = {
          startPos: { x: rect.startPos.x, y: rect.startPos.y },
          endPos: {
            w: e.clientX - left - rect.startPos.x,
            h: e.clientY - top - rect.startPos.y
          },
          isDragging: true
        };
        updateRect(updates);
      }
    }

    if (isDrawing && selectedTool === "ARROW") {
      if (arrow) {
        const updates = {
          startPos: { x: arrow.startPos.x, y: arrow.startPos.y },
          endPos: {
            w: e.clientX - left,
            h: e.clientY - top
          },
          isDragging: true,
        };
        updateArrow(updates);
      }
    }
  }

  function ImageSVG(src: string): ReactNode {
    return <image x="0" y="0" xlinkHref={src} />;
  }

  function changeToolFunc(tool: ToolList) {
    changeTool(tool);
  }

  function restoreImage() {
    updatePaths([]);
    updateRect(undefined);
    updateArrow(undefined);
    storeRects([]);
    storePaths([]);
    storeArrows([]);
    changeTool("NULL");
  }

  function SVGdelete() {
    const idToDelete = SVGselection.substr(5);
    const drawType = SVGselection.substring(0, 4);
    //TODO: export in one function
    switch (drawType) {
      case "arro": {
        const newArrows = savedArrows;
        delete newArrows[idToDelete];
        updateSVGselection(null);
        changeTool("NULL");
        return storeArrows(newArrows);
      }
      case "rect": {
        const newRect = savedRects;
        delete newRect[idToDelete];
        updateSVGselection(null);
        changeTool("NULL");
        return storeArrows(newRect);
      }
      case "path": {
        const newPaths = savedPaths;
        delete newPaths[idToDelete];
        updateSVGselection(null);
        changeTool("NULL");
        return storePaths(newPaths);
      }
    }
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
        {rect && (
          <Rect
            startPos={rect.startPos}
            endPos={rect.endPos}
            isDragging={rect.isDragging}
          />
        )}
        {savedRects &&
          savedRects.length > 0 &&
          savedRects.map((area: TypedRect, index: number) => (
            <Rect
              startPos={area.startPos}
              endPos={area.endPos}
              isDragging={false}
              key={index}
              id={`rect_${index}`}
              setSelection={(id: string) => {
                changeTool('NULL');
                updateSVGselection(id);
              }}
              selected={SVGselection === `rect_${index}`}
            />
          ))}
        {paths && paths.length > 0 && <Path line={paths} />}
        {savedPaths &&
          savedPaths.map((lines: Coord[], index: number) => (
            <Path
              line={lines}
              key={index}
              id={`path_${index}`}
              setSelection={(id: string) => {
                changeTool('NULL');
                updateSVGselection(id);
              }}
              selected={SVGselection === `path_${index}`}
            />
          ))}
        {/*FIXME: why arrows everywhere? */}  
        {arrow && (
          <Arrow
            startPos={arrow.startPos}
            endPos={arrow.endPos}
            isDragging={arrow.isDragging}
          />
        )}
        {savedArrows &&
          savedArrows.length > 0 &&
          savedArrows.map((coord: TypedArrow, index: number) => (
            <Arrow
              startPos={coord.startPos}
              endPos={coord.endPos}
              isDragging={false}
              key={index}
              id={`arro_${index}`}
              setSelection={(id: string) => {
                changeTool('NULL');
                updateSVGselection(id);
              }}
              selected={SVGselection === `arro_${index}`}
            />
          ))}
      </svg>
      <Tools
        pen
        blackout
        arrow
        deleteSVG={SVGselection}
        confirmationDelete={SVGdelete}
        selectedTool={selectedTool}
        changeTool={changeToolFunc}
        restoreImage={restoreImage}
      />
    </Paper>
  );
};

export default SvgDrawer;
