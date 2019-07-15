import React, { useState } from "react";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

interface Props {
  pen?: boolean;
  blackout?: boolean;
  arrow?: boolean;
  selectedTool: "PEN" | "BLACKOUT" | "ARROW" | "NULL";
}

const Tools: React.FC<Props> = props => {
  const [tool, selectTool] = useState("NULL");

  function selectionTool(event:any, selectedTool:any) {
    selectTool(selectedTool);
    }

  return (
    <ToggleButtonGroup
      value={tool}
      exclusive
      onChange={selectionTool}
    >
      {props.pen && <ToggleButton value="PEN">PEN</ToggleButton>}
      {props.blackout && <ToggleButton value="BLACKOUT">BLACKOUT</ToggleButton>}
      {props.arrow && <ToggleButton value="ARROW">ARROW</ToggleButton>}
    </ToggleButtonGroup>
  );
};

export default Tools;
