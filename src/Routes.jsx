import { Auth } from "@/pages/Auth/Auth";
import { SigninContainer } from "@/components/organisms/Auth/SigninContainer";
import { Notfound } from "@/pages/Notfound/Notfound";
import { Route, Routes } from "react-router-dom";
import { SignupContainer } from "./components/organisms/Auth/SignupContainer";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupContainer />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninContainer />
          </Auth>
        }
      />
      <Route
        path="/home"
        element={
          <Auth>
            <h1>Home</h1>
          </Auth>
        }
      />
      <Route path="/*" element={<Notfound />} />
    </Routes>
  );
};
