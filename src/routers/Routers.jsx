import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
import Home from "../pages/Home";
import Recipe from "../pages/Recipe";
import SearchResult from "../pages/SearchResult";
import Statistics from "../pages/Statistics";
import Calendar from "../pages/Calendar";
import Class from "../pages/Class";
import My from "../pages/My";
import KakaoLogin from "../pages/My";
import NotFound from "../components/auth/KakaoLogin";


// TODO erase elements
import Elements from "../pages/Elements";

// TODO protected router for login
// TODO class search
const Routers = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/recipes' element={<Recipe />} />
        <Route path='/recipes/:keyword' element={<SearchResult />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/class' element={<Class />} />
        <Route path='/my' element={<My />} />
        <Route path='/elements' element={<Elements />} />
        <Route path='/user/kakao/callback' element={<KakaoLogin />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
