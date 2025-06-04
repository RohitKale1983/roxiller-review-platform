import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function StoreOwnerDashboard() {
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await api.get("/stores/my-store");
        setStore(res.data);
      } catch (err) {
        console.error("Failed to load store.");
      }
    };

    fetchStore();
  }, []);

  if (!store) {
    return (
      <Layout>
        <div className="p-4">Loading store...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Store Owner Dashboard</h2>

        {/* Store Info */}
        <div className="mb-6">
          <p><strong>Store Name:</strong> {store.name}</p>
          <p><strong>Address:</strong> {store.address}</p>
          <p><strong>Average Rating:</strong> {store.rating || "N/A"}</p>
        </div>

        {/* Ratings Table */}
        <h3 className="text-lg font-semibold mb-2">Ratings by Users</h3>
        {store.Ratings?.length > 0 ? (
          <table className="w-full border text-left">
            <thead>
              <tr>
                <th className="border p-2">User Name</th>
                <th className="border p-2">User Email</th>
                <th className="border p-2">Rating</th>
              </tr>
            </thead>
            <tbody>
              {store.Ratings.map((r) => (
                <tr key={r.id}>
                  <td className="border p-2">{r.User.name}</td>
                  <td className="border p-2">{r.User.email}</td>
                  <td className="border p-2">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No ratings submitted yet.</p>
        )}
      </div>
    </Layout>
  );
}
