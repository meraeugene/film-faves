import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Loader from "./components/Loader";

const LazyHome = React.lazy(() => import("./pages/Home"));
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
          <Route
            path="/"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyHome />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/films"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyFilms />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/films/:id"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyFilmDetails />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/recommend"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazyRecommend />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/auth/signup"
            element={
              <React.Suspense fallback={<Loader />}>
                <LazySignup />
              </React.Suspense>
            }
          ></Route>
          <Route
            path="/auth/login"
            element={
              <React.Suspense fallback={<Loader />}>
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
