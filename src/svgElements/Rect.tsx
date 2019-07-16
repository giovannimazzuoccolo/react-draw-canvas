import * as React from "react";

interface Props {
  startPos: { x: number; y: number };
  endPos: { w: number; h: number };
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
        fill="black"
      />
    );
  } else {
    return null;
  }
};

export default Rect;
