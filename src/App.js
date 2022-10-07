import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryList from "./components/country/CountryList";
import CountryNew from "./components/country/CountryNew";
import GalleryDetail from "./components/gallery/GalleryDetail";
import GameList from "./components/game/GameList";
import GameNew from "./components/game/GameNew";
import GameGroupList from "./components/gamegroup/GameGroupList";
import GameGroupNew from "./components/gamegroup/GameGroupNew";
import MatchList from "./components/matches/MatchList";
import MatchNew from "./components/matches/MatchNew";
import Playerlist from "./components/player/Playerlist";
import PlayerNew from "./components/player/PlayerNew";
import ResultDetails from "./components/result/ResultDetails";
import ResultList from "./components/result/ResultList";
import Teamlist from "./components/team/TeamList";
import TeamNew from "./components/team/TeamNew";
import Country from "./pages/admin/Country";
import Gallery from "./pages/admin/Gallery";
import Game from "./pages/admin/Game";
import GameGroup from "./pages/admin/GameGroup";

import Home from "./pages/admin/Home";
import Matches from "./pages/admin/Matches";
import News from "./pages/admin/News";
import Player from "./pages/admin/Player";
import Results from "./pages/admin/Results";
import Team from "./pages/admin/Team";
import User from "./pages/admin/User";

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

        <Route path="/players" element={<Player />}>
          <Route index element={<Playerlist />} />
          <Route path="new" element={<PlayerNew />} />
        </Route>

        <Route path="/teams" element={<Team />}>
          <Route index element={<Teamlist />} />
          <Route path="new" element={<TeamNew />} />
        </Route>
        <Route path="/country" element={<Country />}>
          <Route index element={<CountryList />} />
          <Route path="new" element={<CountryNew />} />
        </Route>
        <Route path="/results" element={<Results />}>
          <Route index element={<ResultList />} />
          <Route path=":matchId" element={<ResultDetails />} />
        </Route>

        <Route path="/gallery" element={<Gallery />}>
          <Route index element={<GalleryDetail />} />
        </Route>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
