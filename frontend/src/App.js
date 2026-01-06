import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import HomePage from "./pages/HomePage";
import ContactsPage from "./pages/ContactsPage";
import AllClubsPage from "./pages/AllClubsPage";
import EachClubPage from "./pages/ClubPage";
import EachEventPage from "./pages/EventPage";
import SWB from "./pages/SWB";
import Counsellors from "./pages/Counsellors";
import FoodCourt from "./pages/FoodCourt";
import Layout from "./components/Layout";
const BASEURL = process.env.REACT_APP_BASEURL||"/welfare-board";

const Wrapper = ({children}) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}

function App() {
  return (
    <BrowserRouter basename={`${BASEURL}`} >
      <Wrapper>
        <Routes>
          <Route element={<Layout />}> 
            <Route index element={<HomePage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="clubs" element={<AllClubsPage />} />
            <Route path="club/:name" element={<EachClubPage />} />
            <Route path="events" element={<EachEventPage />} />
            <Route path="event/:id" element={<EachEventPage />} />
            <Route path="resources" element={<SWB/>}/>
            <Route path="counsellors" element={<Counsellors/>}/>
            <Route path="foodcourt" element={<FoodCourt/>}/>
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;