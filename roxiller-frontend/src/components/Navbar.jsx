import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-900 text-white flex items-center justify-between p-4">
      <div>
        <span className="font-bold text-xl">Roxiller App</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm">
          Welcome, <strong>{user.name}</strong> ({user.role})
        </span>
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
