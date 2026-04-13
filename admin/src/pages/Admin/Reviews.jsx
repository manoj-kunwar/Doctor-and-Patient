import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import { FaStar, FaRegStar, FaEye, FaEyeSlash, FaTrash, FaSearch } from "react-icons/fa";

const StarDisplay = ({ value }) => (
  <span className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) =>
      s <= value
        ? <FaStar key={s} className="text-amber-400 text-xs" />
        : <FaRegStar key={s} className="text-gray-300 text-xs" />
    )}
  </span>
);

const Reviews = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState("all"); // all | visible | hidden

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/review/admin/all`, {
        headers: { atoken: aToken },
      });
      if (data.success) setReviews(data.reviews);
      else toast.error(data.message);
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => { if (aToken) fetchReviews(); }, [aToken]);

  const toggleReview = async (reviewId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/review/admin/toggle`,
        { reviewId },
        { headers: { atoken: aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setReviews((prev) =>
          prev.map((r) => (r._id === reviewId ? { ...r, isVisible: data.review.isVisible } : r))
        );
      } else toast.error(data.message);
    } catch (err) { toast.error(err.message); }
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Permanently delete this review? This cannot be undone.")) return;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/review/admin/delete`,
        { reviewId },
        { headers: { atoken: aToken } }
      );
      if (data.success) {
        toast.success("Review deleted");
        setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      } else toast.error(data.message);
    } catch (err) { toast.error(err.message); }
  };

  const filtered = reviews.filter((r) => {
    const matchSearch =
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.comment.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "all" ||
      (filter === "visible" && r.isVisible) ||
      (filter === "hidden" && !r.isVisible);
    return matchSearch && matchFilter;
  });

  const stats = {
    total:   reviews.length,
    visible: reviews.filter((r) => r.isVisible).length,
    hidden:  reviews.filter((r) => !r.isVisible).length,
    avgRating: reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "—",
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">Review Management</h1>
      <p className="text-gray-500 text-sm mb-6">Monitor and moderate patient reviews</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Reviews",   value: stats.total,       color: "bg-blue-50 text-blue-600" },
          { label: "Visible",         value: stats.visible,     color: "bg-green-50 text-green-600" },
          { label: "Hidden",          value: stats.hidden,      color: "bg-red-50 text-red-500" },
          { label: "Avg Rating",      value: stats.avgRating,   color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <div key={s.label} className={`rounded-2xl p-4 ${s.color}`}>
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs font-medium mt-0.5 opacity-70">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by patient name or comment…"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary bg-white"
          />
        </div>
        <div className="flex gap-2">
          {["all", "visible", "hidden"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                filter === f
                  ? "bg-primary text-white shadow-sm"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-400">No reviews found</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Patient</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Rating</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Comment</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Date</th>
                <th className="text-left px-5 py-3 text-xs text-gray-500 font-semibold">Status</th>
                <th className="text-right px-5 py-3 text-xs text-gray-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((review) => (
                <tr key={review._id} className={`hover:bg-gray-50 transition-colors ${!review.isVisible ? "opacity-50" : ""}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                        {review.patientName?.[0]?.toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-700 whitespace-nowrap">{review.patientName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StarDisplay value={review.rating} />
                  </td>
                  <td className="px-5 py-4 max-w-xs">
                    <p className="text-gray-600 truncate">{review.comment}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-400 whitespace-nowrap text-xs">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${
                      review.isVisible
                        ? "bg-green-50 text-green-600 border border-green-100"
                        : "bg-red-50 text-red-500 border border-red-100"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${review.isVisible ? "bg-green-500" : "bg-red-400"}`} />
                      {review.isVisible ? "Visible" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleReview(review._id)}
                        title={review.isVisible ? "Hide review" : "Show review"}
                        className={`p-2 rounded-lg transition-colors ${
                          review.isVisible
                            ? "hover:bg-amber-50 text-amber-500"
                            : "hover:bg-green-50 text-green-600"
                        }`}
                      >
                        {review.isVisible ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                      </button>
                      <button
                        onClick={() => deleteReview(review._id)}
                        title="Delete permanently"
                        className="p-2 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reviews;