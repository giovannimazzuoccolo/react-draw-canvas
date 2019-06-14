import React, { useRef, useEffect, useState, useReducer } from "react";
import "./App.css";
//import drawPen from "./primitives/pen";

const App = () => {
  let canvasRef = useRef();
  let imageRef = useRef();

  const [tool, dispatch] = useReducer(selectTool, { tool: null });

  function selectTool(state, action) {
    switch(action.type) {
      case 'pen'  : return { tool: 'pen'};
      case 'arrow': return { tool: 'arrow'};
      default: return { tool: null }
    }
  }

  const [startPos, setPos] = useState({ x: 0, y: 0 });
  const [isDrawing, startDraw] = useState(false);

  const changeStartDraw = (e, value) => {
    console.log('tool', tool);
    if (tool.tool) {
      const x = e.pageX - canvasRef.current.offsetLeft;
      const y = e.pageY - canvasRef.current.offsetTop;

      setPos({ x, y });
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

    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#FF5600";
    ctx.moveTo(startPos.x, startPos.y);
    setPos({ x, y });
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.stroke();
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
          <button onClick={() => dispatch({ type: 'pen' })}>{ tool === 'pen' && "End "} Pen</button>
        </li>
        <li>
          <button onClick={() => dispatch({ type : 'arrow' })}>{ tool === 'arrow' && "End "} Arrow</button>
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
