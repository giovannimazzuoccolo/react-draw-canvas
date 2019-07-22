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
        stroke={props.selected ? 'orange' : 'black'}
        fill={props.isDragging ? "rgba(11,11,11,0.4)" : "black"}
        style={{ 'cursor' : 'pointer' }}
        data-id={props.id}
        onClick={() => props.setSelection && props.setSelection(props.id)}
      />
    );
  } else {
    return null;
  }
};

export default Rect;
