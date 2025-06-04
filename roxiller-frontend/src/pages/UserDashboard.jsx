import { useEffect, useState } from "react";
import api from "../services/api";
import Layout from "../components/Layout";

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: "", address: "" });
  const [ratings, setRatings] = useState({}); // storeId => value

  useEffect(() => {
    fetchStores();
    fetchMyRatings();
  }, []);

  const fetchStores = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await api.get(`/stores/all?${query}`);
    setStores(res.data);
  };

  const fetchMyRatings = async () => {
    const res = await api.get(`/ratings/my-ratings`);
    const ratingMap = {};
    res.data.forEach((r) => (ratingMap[r.storeId] = r.value));
    setRatings(ratingMap);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => fetchStores();

  const handleRatingChange = (storeId, value) => {
    setRatings({ ...ratings, [storeId]: value });
  };

  const submitRating = async (storeId) => {
    const value = ratings[storeId];
    try {
      await api.post(`/ratings/submit`, { storeId, value });
      alert("Rating submitted!");
    } catch (err) {
      alert("Failed to submit rating");
    }
  };

  return (
    <Layout>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Browse & Rate Stores</h2>

        {/* Filters */}
        <div className="flex gap-2 mb-4">
          <input
            name="name"
            placeholder="Store Name"
            onChange={handleFilterChange}
            className="border p-2"
          />
          <input
            name="address"
            placeholder="Address"
            onChange={handleFilterChange}
            className="border p-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </div>

        {/* Store Table */}
        <table className="w-full border text-left">
          <thead>
            <tr>
              <th className="border p-2">Store Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Overall Rating</th>
              <th className="border p-2">Your Rating</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td className="border p-2">{store.name}</td>
                <td className="border p-2">{store.address}</td>
                <td className="border p-2">{store.rating ?? "N/A"}</td>
                <td className="border p-2">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={ratings[store.id] || ""}
                    onChange={(e) =>
                      handleRatingChange(store.id, Number(e.target.value))
                    }
                    className="w-16 border p-1"
                  />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => submitRating(store.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
