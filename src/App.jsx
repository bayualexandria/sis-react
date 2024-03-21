import Cookies from "js-cookie";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Mapel from "./pages/mapel/Mapel";
import Profile from "./pages/profile/Profile";
import LaporanMapel from "./pages/doc/LaporanMapel";
import Laporan from "./pages/laporan/Laporan";
import Ujian from "./pages/ujian/Ujian";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <UnAthenticated>
              <Login />
            </UnAthenticated>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/mapel"
          element={
            <PrivateRoute>
              <Mapel />
            </PrivateRoute>
          }
        />
        <Route
          path="/jadwal-mapel"
          element={
            <PrivateRoute>
              <LaporanMapel />
            </PrivateRoute>
          }
        />
        <Route
          path="/laporan"
          element={
            <PrivateRoute>
              <Laporan />
            </PrivateRoute>
          }
        />

        <Route
          path="/jadwal-ujian"
          element={
            <PrivateRoute>
              <Ujian />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function PrivateRoute(children) {
  const isAuthenticated = Cookies.get("authentication");
  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/login" replace={true} />;
}

function UnAthenticated(children) {
  const isAuthenticated = Cookies.get("authentication");
  if (!isAuthenticated) {
    return children;
  }
  return <Navigate to="/" replace={true} />;
}
