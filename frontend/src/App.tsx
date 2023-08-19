import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Recommend from "./pages/Recommend";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { SkeletonTheme } from "react-loading-skeleton";
import FilmDetails from "./pages/FilmDetails";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/films" element={<Films />}></Route>
          <Route path="/films/:id" element={<FilmDetails />}></Route>
          <Route path="/recommend" element={<Recommend />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
