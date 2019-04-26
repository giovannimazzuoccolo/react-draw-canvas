import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const DrawCanvas = ({ image, arrow, pen, clear }) => {
  //refs
  let rCanvasRef = useRef();
  let rImageRef = useRef();

  //states
  const [storedDrawings, storeDraw] = useState([]);
  const [isDrawing, toggleDrawing] = useState(false);

  //functions
  function fActionMove(e) {
    e.preventDefault();
    e.stopPropagation();

    //exit if I am drawing
    if(!isDrawing) {
        return;
    }

    restoreDrawings();
  }

  

  function restoreDrawings() {    
    const ctx = rCanvasRef.current.getContext("2d");
    ctx.clearRect( 0, 0, ctx.width, ctx.height);

    if(!storedDrawings.length) {
       return;
    } 

    storedDrawings.map(draw => {
        ctx.beginPath();
        ctx.moveTo(draw.x1, draw.y1);
        ctx.lineTo(draw.x2, draw.y2);
        return ctx.stroke();
    });

  }

  function fClearImage() {
    const ctx = rCanvasRef.current.getContext("2d");
    const img = rImageRef.current;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.drawImage(img, 0, 0);
  };

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
      <canvas
        width="960" //TODO: useRef and get the image width
        height="720" //TODO: useRef and get the image height
        ref={rCanvasRef}
        onMouseMove={fActionMove}
        onMouseUp={fActionUp}
        onMouseDown={fActionDown}
      />
      <img src={image} alt="draw on it" ref={rImageRef} className={"hidden"} />
    </>
  );
};

export default DrawCanvas;

DrawCanvas.propTypes = {
  image: PropTypes.string.isRequired
};
