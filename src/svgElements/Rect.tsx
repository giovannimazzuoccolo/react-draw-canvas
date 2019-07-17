import * as React from "react";

interface Props {
  startPos: { x: number; y: number };
  endPos: { w: number; h: number };
  isDragging: false
}

const Rect: React.SFC<Props> = props => { 

  console.log(props);

  if (props.endPos) {
    return (
      <rect
        className="path"
        width={props.endPos.w}
        height={props.endPos.h}
        x={props.startPos.x}
        y={props.startPos.y}
        stroke="black"
        fill={props.isDragging ? "rgba(11,11,11,0.7)" : "black"}
        style={{ 'cursor' : 'pointer' }}
      />
    );
  } else {
    return null;
  }
};

export default Rect;
