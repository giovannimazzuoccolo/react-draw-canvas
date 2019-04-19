import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import canvasArrow from "./primitives/arrows";
import drawPen from "./primitives/pen";

const App = () => {
  let canvasRef = useRef();
  let imageRef = useRef();

  const [arrow, drawArrowStart] = useState(false);
  const [pen, drawPenStart] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0, endX: 0, endY: 0 });
  const [isDrawing, startDraw] = useState(false);

  const drawArrowSelected = value => {
    drawArrowStart(value);
  };

  const drawPenHook = () => {
    drawPenStart(true);
  };

  const changeStartDraw = (e, value) => {
    startDraw(value);

    if (value && arrow) {
      setStartPos({
        x: e.pageX - canvasRef.current.offsetLeft,
        y: e.pageY - canvasRef.current.offsetTop,
      });
    }


    if (!value) {
      drawPenStart(false);
      if(arrow.x) {
        
      }
      drawArrowStart(false);
    }
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");
    const img = imageRef.current;
    ctx.drawImage(img, 0, 0);
  }, []);



  /**
   * This is the drawing
   * @param {event} e 
   */
  const handleDrawing = e => {
    if (!isDrawing) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    const x = e.pageX - canvasRef.current.offsetLeft;
    const y = e.pageY - canvasRef.current.offsetTop;

    if (pen) {
      drawPen(ctx, "#FF5600", x, y);
    }

    if (arrow) {
      setStartPos({ endX: x, endY: y});
      canvasArrow(ctx, "#FF5600", startPos.x, startPos.y, x, y);
    }
  };

  const clearImage = () => {
    const ctx = canvasRef.current.getContext("2d");
    const img = imageRef.current;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.drawImage(img, 0, 0);
  };

  return (
    <React.Fragment>
      <canvas
        width="960"
        height="720"
        ref={canvasRef}
        onMouseMove={handleDrawing}
        onMouseDown={e => changeStartDraw(e, true)}
        onMouseUp={e => changeStartDraw(e, false)}
      />
      <img
        src="https://indebuurt.nl/delft/wp-content/uploads/2019/03/sebastiaansbrug-jaap-huisman-3.jpg"
        alt="Delft bridge"
        ref={imageRef}
        className="hidden"
      />
      <ul className="funcList">
        <li>
          <button onClick={drawArrowSelected} disabled={arrow}>
            Arrow
          </button>
        </li>
        <li>
          <button onClick={() => drawPenHook(true)} disabled={pen}>
            Pen
          </button>
        </li>
        <li>
          <button onClick={() => clearImage()}>Clear</button>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default App;

/*ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.rect(200, 300, 20, 10);
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.beginPath();
    canvasArrow(ctx, 200, 100, 50, 60, 6);
    ctx.stroke();*/
