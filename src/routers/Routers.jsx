import { BrowserRouter, Routes, Route } from "react-router-dom";

import Auth from "../pages/Auth";
// import KakaoLogin from "../components/auth/KakaoLogin";
// import GoogleLogin from "../components/auth/GoogleLogin";
import Home from "../pages/Home";
import Statistics from "../pages/Statistics";
import Calendar from "../pages/Calendar";
import Classes from "../pages/Classes";
import Class from "../pages/Class";
import Recipe from "../pages/Recipe";
import SearchResult from "../pages/SearchResult";
import NotFound from "../pages/NotFound";

// TODO erase elements
import Elements from "../pages/Elements";

// TODO protected router 구현하기
const Routers = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />} />
        <Route path='/kakaoLogin' element={<KakaoLogin />} />
        <Route path='/googleLogin' element={<GoogleLogin />} />
        <Route path='/' element={<Home />} />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/classes' element={<Classes />} />
        <Route path='/class/:roomId' element={<Class />} />
        <Route path='/recipes' element={<Recipe />} />
        <Route path='/recipes/:keyword' element={<SearchResult />} />
        <Route path='/elements' element={<Elements />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
