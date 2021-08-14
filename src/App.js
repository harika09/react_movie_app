import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

/* TV */
import PopularShows from "./Components/TV/Popular/PopularShows";

/* People */
import People from "./Components/People/Popular People/People";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/popular-tv-show" component={PopularShows} />
          <Route path="/people" component={People} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
