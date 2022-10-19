import { BrowserRouter, Routes, Route } from "react-router-dom";

// auth
import Auth from "../pages/Auth";
import KakaoOAuth from "../pages/KakaoOAuth";
import GoogleOAuth from "../pages/GoogleOAuth";
// main
import Home from "../pages/Home";
// statistics
import Statistics from "../pages/Statistics";
// calendar
import Calendar from "../pages/Calendar";
// cookingClass
import Classes from "../pages/Classes";
import Class from "../pages/Class";
// recipes
import Recipes from "../pages/Recipes";
import SearchResult from "../pages/SearchResult";
// my
import BookMarkRecipe from "../pages/BookMarkRecipe";
// others
import NotFound from "../pages/NotFound";

// TODO protected router 구현하기
const Routers = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* auth */}
        <Route path='/auth' element={<Auth />} />
        <Route path='/kakaoLogin' element={<KakaoOAuth />} />
        <Route path='/googleLogin' element={<GoogleOAuth />} />
        {/* main */}
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        {/* my */}
        <Route path='/bookmark' element={<BookMarkRecipe />} />
        {/* statistics */}
        <Route path='/statistics' element={<Statistics />} />
        {/* calendar */}
        <Route path='/calendar' element={<Calendar />} />
        {/* cookingClass */}
        <Route path='/classes' element={<Classes />} />
        <Route
          path='/class/:class_id/:redis_class_id/:role'
          element={<Class />}
        />
        {/* recipes */}
        <Route path='/recipes' element={<Recipes />} />
        <Route path='/recipes/:keyword' element={<SearchResult />} />
        {/* others */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
