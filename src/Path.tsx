import * as React from "react";

interface Props {
  line: { x: number; y: number }[];
}

const Path: React.SFC<Props> = props => {

  const pathData = 
    "M " +
    props.line
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");
  return <path className="path" stroke="orange" stroke-width="6" fill="none" d={pathData}/>;
};

export default Path;
