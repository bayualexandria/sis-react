import { Route, Routes, Navigate } from "react-router-dom";

import {
  Home,
  Login,
  Sekolah,
  Kelas,
  ChangePassword,
  ForgetPassword,
  Mapel,
  UpdateDataGuru,
  GetById,
  Siswa,
  Guru,
  Profile,
  Register,
  KelasById,
} from "./pages/Index";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  return (
    <Routes>
      {/* Start UnAuthorization */}
      {/* Login */}
      <Route
        path="/login"
        element={
          <UnAthenticated>
            <Login />
          </UnAthenticated>
        }
      />
      {/* Register */}
      <Route
        path="/register"
        element={
          <UnAthenticated>
            <Register />
          </UnAthenticated>
        }
      />
      {/* Forget password */}
      <Route
        path="/forget-password"
        element={
          <UnAthenticated>
            <ForgetPassword />
          </UnAthenticated>
        }
      />

      {/* End UnAuthorization */}

      {/* Start Authorization */}
      {/* Main root */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      {/* Profile */}
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      {/* Change password */}
      <Route
        path="/change-password"
        element={
          <PrivateRoute>
            <ChangePassword />
          </PrivateRoute>
        }
      />
      {/* Guru */}
      <Route
        path="/guru"
        element={
          <PrivateRoute>
            <Guru />
          </PrivateRoute>
        }
      />
      {/* Update guru by id */}
      <Route
        path="/guru/:nip"
        element={
          <PrivateRoute>
            <UpdateDataGuru />
          </PrivateRoute>
        }
      />
      {/* Siswa */}
      <Route
        path="/siswa"
        element={
          <PrivateRoute>
            <Siswa />
          </PrivateRoute>
        }
      />
      {/* Update data siswa */}
      <Route
        path="/siswa/:nis"
        element={
          <PrivateRoute>
            <GetById />
          </PrivateRoute>
        }
      />
      {/* Mapel */}
      <Route
        path="/mapel"
        element={
          <PrivateRoute>
            <Mapel />
          </PrivateRoute>
        }
      />
      {/* Kelas */}
      <Route
        path="/kelas"
        element={
          <PrivateRoute>
            <Kelas />
          </PrivateRoute>
        }
      />

      {/* Kelas by id */}
      <Route
        path="/kelas/:nip/:id"
        element={
          <PrivateRoute>
            <KelasById />
          </PrivateRoute>
        }
      />

      {/* Profile Sekolah */}
      <Route
        path="/profile-sekolah"
        element={
          <PrivateRoute>
            <Sekolah />
          </PrivateRoute>
        }
      />
      {/* End Authorization */}
  
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function PrivateRoute({ children }) {
  // "is_logged_in" adalah cookie biasa yang diizinkan dibaca JS
  const isLoggedIn = localStorage.getItem("is_logged_in") === "true";

  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

function UnAthenticated({ children }) {
  const isLoggedIn = localStorage.getItem("is_logged_in");

  if (isLoggedIn !== "true") {
    return children;
  }
  return <Navigate to="/" replace={true} />;
}
export default App;
