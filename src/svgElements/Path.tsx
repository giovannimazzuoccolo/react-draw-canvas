import * as React from "react";

interface Props {
  line: { x: number; y: number }[];
  id?: string;
  setSelection?: Function,
  selected? : boolean
}

const Path: React.SFC<Props> = props => {
  const pathData =
    "M " +
    props.line
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");
  return (
    <path
      className="path"
      stroke={props.selected ? 'darkorange' : 'orange'}
      strokeWidth="6"
      fill="none"
      d={pathData}
      data-id={props.id}
      onClick={() => props.setSelection && props.setSelection(props.id)}
      
    />
  );
};

export default Path;
