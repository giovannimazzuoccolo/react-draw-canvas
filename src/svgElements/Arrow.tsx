import * as React from "react";

interface Props {
  line: { x: number; y: number };
}

const Arrow: React.SFC<Props> = props => {
  const pathData =
   `M ${props.line.x} 0 l${props.line.y} 0 l `;
  return (
    <>
      <g transform="rotate(30)">
        <path d={`${pathData}-2 0 l-15 -5 m15 5 l-15 5`} />
      </g>
    </>
  );
};

export default Arrow;

//M15 0 l70 0 l
