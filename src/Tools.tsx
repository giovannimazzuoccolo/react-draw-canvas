import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPen,
  faSquare,
  faLongArrowAltUp,
  faUndo,
  faSave
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';

import { makeStyles, createStyles } from '@material-ui/styles';


library.add(faPen, faSquare, faLongArrowAltUp, faUndo, faSave);


const useStyles = makeStyles(() => createStyles({
  root:{ display: "inline-flex", justifyContent: "space-between" },
  buttons: {
    height: '48px',
    lineHeight: '38px',
    color: '#666',
    borderRadius: 0,
    borderBottom: 'none'
  },
  buttonColor: {
    color: '#666'
  }
}));

interface Props {
  pen?: boolean;
  blackout?: boolean;
  arrow?: boolean;
  selectedTool: string;
  changeTool: Function;
  restoreImage: Function
}

const Tools: React.FC<Props> = props => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ToggleButtonGroup value={props.selectedTool} exclusive onChange={(e, tool) => props.changeTool(tool)}>
        {props.pen && (
          <ToggleButton value="PEN" className={classes.buttonColor}>
            <FontAwesomeIcon icon={faPen} /> &nbsp; Pen
          </ToggleButton>
        )}
        {props.blackout && (
          <ToggleButton value="BLACKOUT" className={classes.buttonColor}>
            <FontAwesomeIcon icon={faSquare} /> &nbsp; Blackout
          </ToggleButton>
        )}
        {props.arrow && (
          <ToggleButton value="ARROW" className={classes.buttonColor}>
            <FontAwesomeIcon icon={faLongArrowAltUp} /> &nbsp; Arrow
          </ToggleButton>
        )}
      </ToggleButtonGroup>
      <ButtonGroup>
        <Button className={classes.buttons} onClick={() => props.restoreImage()}>
          <FontAwesomeIcon icon={faUndo} /> &nbsp; Restore image
        </Button>
        <Button className={classes.buttons}>
          <FontAwesomeIcon icon={faSave} /> &nbsp; Save
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Tools;
