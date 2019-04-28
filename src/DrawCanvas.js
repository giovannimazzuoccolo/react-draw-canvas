import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

//Second guide
// https://stackoverflow.com/questions/49885020/drawing-a-straight-line-using-mouse-events-on-canvas-in-javascript

const DrawCanvas = ({ image, arrow, pen, clear }) => {
  //refs
  let rCanvasRef = useRef();
  let rImageRef = useRef();

  //states
  const [storedDrawings, storeDraw] = useState([]);
  const [isDrawing, toggleDrawing] = useState(false);
  const [startingPoint, setStartingPoint] = useState({ startX: 0, startY: 0 });

  //functions

  function fActionDown(e) {
    console.log('Down')
    e.preventDefault();
    e.stopPropagation();

    const startX = parseInt(e.clientX - rCanvasRef.current.offsetLeft);
    const startY = parseInt(e.clientY - rCanvasRef.current.offsetTop);

    toggleDrawing(true);
    setStartingPoint({ startX, startY });
  }

  function fActionMove(e) {
    console.log('moving Call');
    e.preventDefault();
    e.stopPropagation();

    //exit if I am drawing
    if (!isDrawing) {
      return;
    }
    restoreDrawings();
    
    const mouseX = parseInt(e.clientX - rCanvasRef.current.offsetLeft);
    const mouseY = parseInt(e.clientY - rCanvasRef.current.offsetTop);
    
    const ctx = rCanvasRef.current.getContext("2d");

    // draw the current line
    ctx.beginPath();
    ctx.moveTo(startingPoint.startX, startingPoint.startY);
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }

  function fActionUp(e) {
    console.log('up Call');
    e.preventDefault();
    e.stopPropagation();

    toggleDrawing(false);

    const mouseX = parseInt(e.clientX - rCanvasRef.current.offsetLeft);
    const mouseY = parseInt(e.clientY - rCanvasRef.current.offsetTop);

    storeDraw([
      ...storedDrawings,
      {
        x1: startingPoint.startX,
        y1: startingPoint.startY,
        x2: mouseX,
        y2: mouseY
      }
    ]);

    restoreDrawings();
  }

  function fActionOut(e) {
    console.log('out Call');
    e.preventDefault();   
    e.stopPropagation();
    
    if(!isDrawing){return;}
    
    toggleDrawing(false);
    
    var mouseX = parseInt(e.clientX - rCanvasRef.current.offsetLeft);
    var mouseY = parseInt(e.clientY - rCanvasRef.current.offsetTop);
    
    storeDraw([
      ...storedDrawings,
      {
        x1: startingPoint.startX,
        y1: startingPoint.startY,
        x2: mouseX,
        y2: mouseY
      }
    ]);
    
    restoreDrawings();
  }

  function restoreDrawings() {
    console.log('rest', storedDrawings.length);
    const ctx = rCanvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.width, ctx.height);

    if (!storedDrawings.length) {
      return;
    }

    storedDrawings.map(draw => {
      ctx.beginPath();
      ctx.moveTo(draw.x1, draw.y1);
      ctx.lineWidth = 3;
      ctx.lineTo(draw.x2, draw.y2);
      return ctx.stroke();
    });
    
  }

  function fClearImage() {
    const ctx = rCanvasRef.current.getContext("2d");
    const img = rImageRef.current;
    storeDraw([]);
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.drawImage(img, 0, 0);
  }

  //lifecycle
  useEffect(() => {
    const ctx = rCanvasRef.current.getContext("2d");
    const img = rImageRef.current;

    // drawing the image inside the canvas
    ctx.drawImage(img, 0, 0);
  }, []);

  //TODO add buttons
  return (
    <>
      <div>{clear && <button onClick={fClearImage}>Clear</button>}</div>
      <canvas
        width="960" //TODO: useRef and get the image width
        height="720" //TODO: useRef and get the image height
        ref={rCanvasRef}
        onMouseMove={fActionMove}
        onMouseUp={fActionUp}
        onMouseDown={fActionDown}
        onMouseOut={fActionOut}
      />
      <img
        src={image}
        alt="draw on it"
        ref={rImageRef}
        className={"hidden"}
        style={{ display: "none" }}
      />
    </>
  );
};

export default DrawCanvas;

DrawCanvas.propTypes = {
  image: PropTypes.string.isRequired
};
