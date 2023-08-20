import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LazyFilms = React.lazy(() => import("./pages/Films"));
const LazyRecommend = React.lazy(() => import("./pages/Recommend"));
const LazySignup = React.lazy(() => import("./pages/Signup"));
const LazyLogin = React.lazy(() => import("./pages/Login"));
const LazyFilmDetails = React.lazy(() => import("./pages/FilmDetails"));

function App() {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/films"
            element={
              <React.Suspense>
                <LazyFilms />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/films/:id"
            element={
              <React.Suspense>
                <LazyFilmDetails />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/recommend"
            element={
              <React.Suspense>
                <LazyRecommend />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/auth/signup"
            element={
              <React.Suspense>
                <LazySignup />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/auth/login"
            element={
              <React.Suspense>
                <LazyLogin />
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </SkeletonTheme>
  );
}

export default App;
