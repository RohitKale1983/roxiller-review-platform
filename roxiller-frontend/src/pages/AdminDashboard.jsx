import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import api from "../services/api";

// ---------------- Users Table ----------------
function UsersTable() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: "", role: "" });

  const fetchUsers = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/users/admin/users?${params}`);
    setUsers(res.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleSearch = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => fetchUsers();

  return (
    <div>
      <h3 className="text-lg font-semibold mt-6 mb-2">All Users</h3>
      <div className="flex gap-2 mb-2">
        <input name="name" onChange={handleSearch} placeholder="Name" className="border p-1" />
        <select name="role" onChange={handleSearch} className="border p-1">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="store_owner">Store Owner</option>
        </select>
        <button onClick={handleFilter} className="bg-blue-500 text-white px-3 py-1 rounded">
          Apply
        </button>
      </div>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-1">Name</th>
            <th className="border p-1">Email</th>
            <th className="border p-1">Role</th>
            <th className="border p-1">Address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-1">{u.name}</td>
              <td className="border p-1">{u.email}</td>
              <td className="border p-1">{u.role}</td>
              <td className="border p-1">{u.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------- Stores Table ----------------
function StoresTable() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });

  const fetchStores = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/stores/all?${params}`);
    setStores(res.data);
  };

  useEffect(() => { fetchStores(); }, []);

  const handleSearch = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilter = () => fetchStores();

  return (
    <div>
      <h3 className="text-lg font-semibold mt-6 mb-2">All Stores</h3>
      <div className="flex gap-2 mb-2">
        <input name="name" onChange={handleSearch} placeholder="Store Name" className="border p-1" />
        <input name="address" onChange={handleSearch} placeholder="Address" className="border p-1" />
        <button onClick={handleFilter} className="bg-blue-500 text-white px-3 py-1 rounded">
          Apply
        </button>
      </div>
      <table className="w-full text-left border">
        <thead>
          <tr>
            <th className="border p-1">Name</th>
            <th className="border p-1">Email</th>
            <th className="border p-1">Address</th>
            <th className="border p-1">Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td className="border p-1">{s.name}</td>
              <td className="border p-1">{s.email}</td>
              <td className="border p-1">{s.address}</td>
              <td className="border p-1">{s.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------- Add Store Form ----------------
function AddStoreForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/stores/create", form);
      setMessage("Store added successfully.");
      setForm({ name: "", email: "", address: "", ownerId: "" });
    } catch (err) {
      setMessage("Failed to add store.");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Add Store</h3>
      <form onSubmit={handleSubmit} className="space-y-2">
        {["name", "email", "address", "ownerId"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2"
            required
          />
        ))}
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create Store
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

// ---------------- AdminDashboard Main ----------------
export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/users/admin/dashboard");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats");
      }
    };
    fetchStats();
  }, []);

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="space-y-2 mb-6">
        <p><strong>Total Users:</strong> {stats.totalUsers}</p>
        <p><strong>Total Stores:</strong> {stats.totalStores}</p>
        <p><strong>Total Ratings:</strong> {stats.totalRatings}</p>
      </div>

      <hr className="mb-6" />
      <UsersTable />
      <StoresTable />
      <AddStoreForm />
    </Layout>
  );
}
