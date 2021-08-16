import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

/* Movie */
import NowPlaying from "./Components/Movie/NowPlaying/NowPlaying";
import TopRated from "./Components/Movie/TopRated/TopRated";
import Upcoming from "./Components/Movie/Upcoming/Upcoming";

/* TV */
import PopularShows from "./Components/TV/Popular/PopularShows";
import AiringToday from "./Components/TV/AiringToday/AiringToday";
import OnTv from "./Components/TV/OnTv/OnTv";
import TopRatedTv from "./Components/TV/TopRated/TopRatedTv";

/* People */
import People from "./Components/People/Popular People/People";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/now-playing" component={NowPlaying} />
          <Route path="/top-rated" component={TopRated} />
          <Route path="/upcoming" component={Upcoming} />
          <Route path="/popular-tv-show" component={PopularShows} />
          <Route path="/Airing-tv-show" component={AiringToday} />
          <Route path="/on-tv-show" component={OnTv} />
          <Route path="/top-tv-show" component={TopRatedTv} />
          <Route path="/people" component={People} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
