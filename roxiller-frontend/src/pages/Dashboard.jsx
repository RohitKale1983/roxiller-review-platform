import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return navigate("/");

    switch (user.role) {
      case "admin":
        navigate("/dashboard/admin");
        break;
      case "user":
        navigate("/dashboard/user");
        break;
      case "store_owner":
        navigate("/dashboard/store-owner");
        break;
      default:
        navigate("/");
    }
  }, [navigate]);

  return null; // This component only redirects
}
