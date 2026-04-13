import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const StarDisplay = ({ rating }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`text-lg ${
          star <= rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

const StarInput = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        onClick={() => onChange(star)}
        className={`text-3xl cursor-pointer transition ${
          star <= value ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

const ReviewCard = ({ review, currentUserId, onEdit, onDelete }) => {
  const isOwner =
    review.patientId === currentUserId ||
    review.patientId?._id === currentUserId ||
    review.patientId?.toString() === currentUserId;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-300">
      <div className="flex gap-3 mb-3">
        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          {review.patientName?.[0]?.toUpperCase() || "P"}
        </div>

        <div>
          <div className="font-semibold text-gray-800">
            {review.patientName}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(review.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>

      <StarDisplay rating={review.rating} />

      <p className="text-sm text-gray-600 leading-6 mt-3">
        {review.comment}
      </p>

      {isOwner && (
        <div className="mt-4 flex gap-3">
          <button
            onClick={() => onEdit(review)}
            className="px-4 py-2 rounded-lg border border-blue-500 bg-blue-50 text-blue-600 text-sm font-semibold shadow-sm hover:bg-blue-100 hover:shadow transition-all duration-200"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => onDelete(review._id)}
            className="px-4 py-2 rounded-lg border border-red-500 bg-red-50 text-red-600 text-sm font-semibold shadow-sm hover:bg-red-100 hover:shadow transition-all duration-200"
          >
            🗑 Delete
          </button>
        </div>
      )}
    </div>
  );
};

const ReviewForm = ({
  doctorId,
  existingReview,
  onSuccess,
  onCancel,
}) => {
  const { backendUrl, token, userData } = useContext(AppContext);

  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(
    existingReview?.comment || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      if (existingReview) {
        res = await axios.put(
          `${backendUrl}/api/reviews/${existingReview._id}`,
          { rating, comment },
          { headers: { token } }
        );
      } else {
        res = await axios.post(
          `${backendUrl}/api/reviews/add`,
          {
            doctorId,
            rating,
            comment,
            patientName: userData?.name,
          },
          { headers: { token } }
        );
      }

      if (res.data.success) {
        toast.success(res.data.message);
        onSuccess(res.data.review);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
      <h3 className="text-lg font-semibold mb-4">
        {existingReview ? "Edit Review" : "Leave Review"}
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <StarInput value={rating} onChange={setRating} />
        </div>

        <textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your experience..."
          className="w-full border border-gray-300 rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            {existingReview ? "Update" : "Submit"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

const ReviewSection = ({ doctorId }) => {
  const { backendUrl, token, userData } = useContext(AppContext);

  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/reviews/${doctorId}`
      );

      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error(error);
    }
  }, [backendUrl, doctorId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSuccess = (saved) => {
    setReviews((prev) => {
      const index = prev.findIndex(
        (r) => r._id === saved._id
      );

      if (index >= 0) {
        const updated = [...prev];
        updated[index] = saved;
        return updated;
      }

      return [saved, ...prev];
    });

    setShowForm(false);
    setEditingReview(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review?")) return;

    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/reviews/${id}`,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Review deleted");
        setReviews((prev) =>
          prev.filter((r) => r._id !== id)
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const avg =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="mt-10">
      <div className="bg-white rounded-2xl p-7 shadow-sm mb-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Doctor Reviews
        </h2>

        {avg && (
          <div className="mt-3">
            <div className="text-4xl font-bold text-gray-900">
              {avg}
            </div>
            <StarDisplay rating={Math.round(avg)} />
          </div>
        )}

        {token && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditingReview(null);
            }}
            className="mt-4 px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Leave Review
          </button>
        )}
      </div>

      {showForm && (
        <ReviewForm
          doctorId={doctorId}
          onSuccess={handleSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {editingReview && (
        <ReviewForm
          doctorId={doctorId}
          existingReview={editingReview}
          onSuccess={handleSuccess}
          onCancel={() => setEditingReview(null)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUserId={userData?._id}
            onDelete={handleDelete}
            onEdit={(review) => {
              setEditingReview(review);
              setShowForm(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;