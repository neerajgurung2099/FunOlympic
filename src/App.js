import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameList from "./components/game/GameList";
import GameNew from "./components/game/GameNew";
import GameGroupList from "./components/gamegroup/GameGroupList";
import GameGroupNew from "./components/gamegroup/GameGroupNew";
import MatchList from "./components/matches/MatchList";
import MatchNew from "./components/matches/MatchNew";
import Gallery from "./pages/Gallery";
import Game from "./pages/Game";
import GameGroup from "./pages/GameGroup";

import Home from "./pages/Home";
import Matches from "./pages/Matches";
import News from "./pages/News";
import Results from "./pages/Results";
import User from "./pages/User";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/gamegroup" element={<GameGroup />}>
          <Route index element={<GameGroupList />} />
          <Route path="new" element={<GameGroupNew />} />
        </Route>
        <Route path="/game" element={<Game />}>
          <Route index element={<GameList />} />
          <Route path="new" element={<GameNew />} />
        </Route>
        <Route path="/matches" element={<Matches />}>
          <Route index element={<MatchList />} />
          <Route path="new" element={<MatchNew />} />
        </Route>
        <Route path="/results" element={<Results />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
