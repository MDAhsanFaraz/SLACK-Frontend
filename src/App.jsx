import { Button } from "@/components/ui/button";
import { Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "@/pages/Auth/Auth";
import { SignupCard } from "@/components/organisms/Auth/SignupCard";
import { SigninCard } from "@/components/organisms/Auth/SigninCard";

function App() {
  return (
    <Routes>
      <Route
        path="/auth/signup"
        element={
          <Auth>
            <SignupCard />
          </Auth>
        }
      />
      <Route
        path="/auth/signin"
        element={
          <Auth>
            <SigninCard />
          </Auth>
        }
      />
      <Route path="/" element={<Navigate to="/auth/signup" replace />} />
    </Routes>
  );
}

export default App;
