import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import canvasArrow from "./primitives/arrows";
import drawPen from "./primitives/pen";

const App = () => {
  let canvasRef = useRef();
  let imageRef = useRef();

  const [arrow, drawArrowStart] = useState(false);
  const [pen, drawPenStart] = useState(false);
  const [startPos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, startDraw] = useState(false);
  const [storedDrawings, storeDraw] = useState([]);

  const drawArrowSelected = value => {
    drawArrowStart(value);
  };

  const drawPenHook = value => {
    drawPenStart(value);
  };

  const changeStartDraw = (e, value) => {
    startDraw(value);

    if (value && arrow) {
      setPos({
        x: e.pageX - canvasRef.current.offsetLeft,
        y: e.pageY - canvasRef.current.offsetTop
      });
    }

    if (!value) {
      if (arrow.x > 0) {
        drawArrowStart(true);
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
      console.log("arrow is starting");
      const endPos = { x, y };
      //canvasArrow(ctx, startPos, endPos, 3);

      ctx.beginPath();
      ctx.moveTo(startPos.x, startPos.y);
      ctx.lineTo(endPos.x, endPos.y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 10;
      ctx.lineJoin = ctx.lineCap = 'round';
      ctx.stroke();
      ctx.closePath();
    }
  };

  const clearImage = () => {
    const ctx = canvasRef.current.getContext("2d");
    const img = imageRef.current;
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    ctx.drawImage(img, 0, 0);
  };

  //instructions: http://jsfiddle.net/m1erickson/H7vRw/

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
          <button onClick={() => drawPenHook(!pen)}>{pen && "End "} Pen</button>
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
