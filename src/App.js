import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Home />
      </Switch>
    </Router>
  );
}

export default App;
