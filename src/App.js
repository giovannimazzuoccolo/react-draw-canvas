import React, { useRef, useEffect, useState, useReducer } from "react";
import "./App.css";
import drawPen from "./primitives/pen";
import drawBlackout from "./primitives/blackout";
import drawCircle from "./primitives/circle";
import drawEraser from "./primitives/eraser";

const App = () => {
  let canvasRef = useRef();
  let imageRef = useRef();

  const [tool, dispatch] = useReducer(selectTool, { tool: null });

  function selectTool(state, action) {
    switch (action.type) {
      case "pen":
        return { tool: "pen" };
      case "blackout":
        return { tool: "blackout" };
      case "circle":
        return { tool: "circle" };
      case "eraser":
        return { tool: "eraser" };
      default:
        return { tool: null };
    }
  }

  const [startPos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, startDraw] = useState(false);

  const changeStartDraw = (e, value) => {
    if (tool.tool) {
      const x = e.pageX - canvasRef.current.offsetLeft;
      const y = e.pageY - canvasRef.current.offsetTop;

      setPos({ x, y });

      if(!value){
        const ctx = canvasRef.current.getContext("2d");
        ctx.restore();
      } else {
        console.log('start');
        const ctx = canvasRef.current.getContext("2d");
        ctx.save();
      }
      startDraw(value);
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

    if (tool.tool === "pen") {
      setPos({ x, y });
      drawPen(ctx, startPos.x, startPos.y, x, y, "#FF5600");
    }

    if (tool.tool === "blackout") {
      ctx.moveTo(startPos.x, startPos.y);
      const width = x - startPos.x;
      const height = y - startPos.y;
      drawBlackout(ctx, startPos.x, startPos.y, width, height);
    }

    if (tool.tool === "circle") {
      //ctx.getContext('2d')
      ctx.restore();
      ctx.moveTo(startPos.x, startPos.y);
      const width = x - startPos.x;
      const height = y - startPos.y;
      drawCircle(ctx, startPos.x, startPos.y, width, height);
    }

    if (tool.tool === "eraser") {
      ctx.moveTo(startPos.x, startPos.y);
      const width = x - startPos.x;
      const height = y - startPos.y;
      drawEraser(ctx, startPos.x, startPos.y, width, height);
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
        onTouchMove={handleDrawing}
        onTouchStart={e => changeStartDraw(e, true)}
        onTouchEnd={e => changeStartDraw(e, false)}
      />
      <img
        src="https://indebuurt.nl/delft/wp-content/uploads/2019/03/sebastiaansbrug-jaap-huisman-3.jpg"
        alt="Delft bridge"
        ref={imageRef}
        className="hidden"
      />
      <ul className="funcList">
        <li>
          <button onClick={() => dispatch({ type: "pen" })} data-testid="pen">
            {tool.tool === "pen" && "End "} Pen
          </button>
        </li>
        <li>
          <button onClick={() => dispatch({ type: "blackout" })} data-testid="blackout">
            {tool.tool === "blackout" && "End "} Blackout
          </button>
        </li>
        <li>
          <button onClick={() => dispatch({ type: "circle" })}>
            {tool.tool === "circle" && "End "} Circle
          </button>
        </li>
        .
        <li>
          <button onClick={() => dispatch({ type: "eraser" })}>
            {tool.tool === "eraser" && "End "} Eraser
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
