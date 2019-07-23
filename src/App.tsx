import * as React from "react";
import "./App.css";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import SvgDrawer from "./SvgDrawer";
import { makeStyles, createStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
      paperFullWidth: {
        width: "calc(100% - 8px)"
      }
  })
);

const App = () => {
  const classes = useStyles();

  const [dialogState, triggerDialog] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Button onClick={() => triggerDialog(true)}>Edit image</Button>
      {dialogState && (
        <Dialog
          open={dialogState}
          fullWidth
          maxWidth="xl"
          className={classes.paperFullWidth}
        >
          <SvgDrawer
            src="https://indebuurt.nl/delft/wp-content/uploads/2019/03/sebastiaansbrug-jaap-huisman-3.jpg"
            //src="https://i.imgur.com/dCTKJfO.jpg"
            pen
          />
        </Dialog>
      )}
    </React.Fragment>
  );
};

export default App;
