import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import LoaderComponent from "./components/Loader";
import HomePage from "./pages/HomePage";
import KidsPage from "./pages/KidsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ParentsPage from "./pages/ParentsPage";
import RegisterPage from "./pages/AuthPages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/AuthPages/LoginPage/LoginPage";

function App() {
  return (
    <>
      <Suspense fallback={<LoaderComponent />}>
        <Routes>
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/parents" element={<ParentsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
