import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import LandingPage from "./pages/user/LandingPage";
import PrivateRoute from "./pages/PrivateRoute";
import AuthForm from "./components/auth/AuthForm";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Toaster position="bottom-right" />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route element={<PrivateRoute />}>
            <Route path="/landing-page" element={<LandingPage />} />
          </Route>
          <Route path={"*"} element={<Navigate to={"/"} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
