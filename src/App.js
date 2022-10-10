import { BrowserRouter, Route, Routes } from "react-router-dom";
import CountryList from "./components/country/CountryList";
import CountryNew from "./components/country/CountryNew";
import GalleryDetail from "./components/gallery/GalleryDetail";
import GameList from "./components/game/GameList";
import GameNew from "./components/game/GameNew";
import GameUpdate from "./components/game/GameUpdate";
import GameGroupList from "./components/gamegroup/GameGroupList";
import GameGroupNew from "./components/gamegroup/GameGroupNew";
import GameGroupUpdate from "./components/gamegroup/GameGroupUpdate";
import MatchList from "./components/matches/MatchList";
import MatchNew from "./components/matches/MatchNew";
import MatchUpdate from "./components/matches/MatchUpdate";
import NewsAdd from "./components/news/NewsAdd";
import NewsList from "./components/news/NewsList";
import NewsUpdate from "./components/news/NewsUpdate";
import Playerlist from "./components/player/Playerlist";
import PlayerNew from "./components/player/PlayerNew";
import ResultDetails from "./components/result/ResultDetails";
import ResultList from "./components/result/ResultList";
import Teamlist from "./components/team/TeamList";
import TeamNew from "./components/team/TeamNew";
import UserDetail from "./components/user/UserDetail";
import UserList from "./components/user/UserList";
import AdminLogin from "./pages/admin/AdminLogin";
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
import FunOlympic from "./pages/public/FunOlympic";
import PublicGallery from "./pages/public/gallery/PublicGallery";
import GameSchedule from "./pages/public/gameschedule/GameSchedule";
import LiveGames from "./pages/public/livegame/LiveGames";
import Login from "./pages/public/login/Login";
import NewsDetail from "./pages/public/news/NewsDetail";
import PublicNews from "./pages/public/news/PublicNews";
import PublicResults from "./pages/public/results/PublicResults";
import WatchGame from "./pages/public/watchgame/WatchGame";
import { AuthProvider } from "./service/Auth";
import { RequireAdminAuth } from "./service/RequireAdminAuth";
import { RequireAuth } from "./service/RequireAuth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route element={<RequireAdminAuth />}>
            <Route path="/user" element={<User />}>
              <Route index element={<UserList />} />
              <Route path="/user/:userId" element={<UserDetail />} />
            </Route>
            <Route path="/gamegroup" element={<GameGroup />}>
              <Route index element={<GameGroupList />} />
              <Route path="new" element={<GameGroupNew />} />
              <Route path="/gamegroup/:groupId" element={<GameGroupUpdate />} />
            </Route>
            <Route path="/game" element={<Game />}>
              <Route index element={<GameList />} />
              <Route path="new" element={<GameNew />} />
              <Route path=":gameId" element={<GameUpdate />} />
            </Route>
            <Route path="/matches" element={<Matches />}>
              <Route index element={<MatchList />} />
              <Route path="new" element={<MatchNew />} />
              <Route path="/matches/:matchId" element={<MatchUpdate />} />
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

            <Route path="/news" element={<News />}>
              <Route index element={<NewsList />} />
              <Route path="new" element={<NewsAdd />} />
              <Route path="/news/:newsId" element={<NewsUpdate />} />
            </Route>
          </Route>
          <Route path="/" element={<FunOlympic />} />
          <Route path="/funolympic" element={<FunOlympic />}>
            <Route index path="livegames" element={<LiveGames />} />
            <Route path="watchgame">
              <Route path=":matchId" element={<WatchGame />} />
            </Route>
            <Route
              path="gameschedule"
              element={
                <RequireAuth>
                  <GameSchedule />
                </RequireAuth>
              }
            />
            <Route
              path="publicgallery"
              element={
                <RequireAuth>
                  <PublicGallery />
                </RequireAuth>
              }
            />
            <Route
              path="news"
              element={
                <RequireAuth>
                  <PublicNews />
                </RequireAuth>
              }
            ></Route>
            <Route
              path="news/:newsId"
              element={
                <RequireAuth>
                  <NewsDetail />
                </RequireAuth>
              }
            />

            <Route path="results" element={<PublicResults />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
