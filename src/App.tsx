import * as React from "react";
import "./App.css";
import SvgDrawer from "./SvgDrawer";

const App = () => {

  const [ url, changeUrl ] = React.useState("https://indebuurt.nl/delft/wp-content/uploads/2019/03/sebastiaansbrug-jaap-huisman-3.jpg");
  
  return (
    <React.Fragment>
      <SvgDrawer src={url} />
      <button onClick={() => {changeUrl('https://www.amsterdam.nl/publish/pages/883461/construction.jpg') }}>Change Image</button>
    </React.Fragment>
  );
};

export default App;
