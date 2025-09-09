import { useRouter } from "next/router";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import DashboardPage from "@/Comp/Views/DashboardPage";

type JWTPayload = {
  exp: number;
  iat: number;
  id: string;
  username: string;
};

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    try {
      const decoded = jwtDecode<JWTPayload>(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      }
    } catch (err) {
      console.error("Token tidak valid:", err);
      localStorage.removeItem("token");
      router.push("/auth/login");
    }
  }, [router]);

  return (
    <div className={``}>
      <DashboardPage />
    </div>
  );
};

export default Dashboard;
