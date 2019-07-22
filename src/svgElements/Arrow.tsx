import * as React from "react";
import { TypedArrow } from "../types";

function calculateSlope(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const at: number = (Math.atan2(y1 - y2, x1 - x2) * 180) / Math.PI;

  return at + 180;
}

const Arrow: React.SFC<TypedArrow> = props => {
  return (
    <g
      data-id={props.id}
      onClick={() => props.setSelection && props.setSelection(props.id)}
    >
      <path
        fill="green"
        stroke="none"
        d="M0,-15L0,15L39,0"
        transform={`translate(${props.endPos.w}, ${
          props.endPos.h
        }) rotate(${calculateSlope(
          props.startPos.x,
          props.startPos.y,
          props.endPos.w,
          props.endPos.h
        ).toFixed(2)})`}
      />
      <line
        x1={props.startPos.x}
        y1={props.startPos.y}
        x2={props.endPos.w}
        y2={props.endPos.h}
        strokeWidth="8"
        stroke={props.selected ? 'darkgreen' : 'green'}
      />
    </g>
  );
};

export default Arrow;
