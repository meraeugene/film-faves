import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Films from "./pages/Films";
import Recommend from "./pages/Recommend";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/films" element={<FilmsPage />}></Route>
          <Route path="/recommend" element={<Recommend />}></Route>
          <Route path="/auth/signup" element={<Signup />}></Route>
          <Route path="/auth/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

const FilmsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNumber = searchParams.get("page") || "1"; // Default to page 1

  return <Films pageNumber={parseInt(pageNumber)} />;
};

export default App;
