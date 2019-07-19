import * as React from "react";

import { TypedRect } from '../types';

const Rect: React.SFC<TypedRect> = props => { 

  if (props.endPos) {
    return (
      <rect
        className="path"
        width={props.endPos.w}
        height={props.endPos.h}
        x={props.startPos.x}
        y={props.startPos.y}
        stroke="black"
        fill={props.isDragging ? "rgba(11,11,11,0.4)" : "black"}
        style={{ 'cursor' : 'pointer' }}
      />
    );
  } else {
    return null;
  }
};

export default Rect;
