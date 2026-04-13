import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

// ─────────────────────────────────────────────────────────────────────────────
// Starability CSS (same as reference project — inlined so no extra file needed)
// ─────────────────────────────────────────────────────────────────────────────
const STAR_CSS = `
.starability-result{position:relative;width:150px;height:30px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");font-size:0.1em;color:transparent}
.starability-result:after{content:' ';position:absolute;left:0;height:30px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");background-position:0 -30px}
.starability-result[data-rating="5"]::after{width:150px}
.starability-result[data-rating="4"]::after{width:120px}
.starability-result[data-rating="3"]::after{width:90px}
.starability-result[data-rating="2"]::after{width:60px}
.starability-result[data-rating="1"]::after{width:30px}
.starability-slot{display:block;position:relative;width:150px;min-height:60px;padding:0;border:none}
.starability-slot>input{position:absolute;margin-right:-100%;opacity:0}
.starability-slot>input:checked~label,.starability-slot>input:focus~label{background-position:0 0}
.starability-slot>input:checked+label,.starability-slot>input:focus+label{background-position:0 -30px}
.starability-slot>input:not([disabled]):hover~label{background-position:0 0}
.starability-slot>input:not([disabled]):hover+label{background-position:0 -30px}
.starability-slot>input:not([disabled]):hover+label::before{opacity:1}
.starability-slot>label{position:relative;display:inline-block;float:left;width:30px;height:30px;font-size:0.1em;color:transparent;cursor:pointer;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");background-repeat:no-repeat;background-position:0 -30px}
.starability-slot>label::before{content:'';position:absolute;display:block;height:30px;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAA8CAMAAABGivqtAAAAxlBMVEUAAACZmZn2viTHuJ72viOampqampr1viSampr3vySampqdnZ34wiX1vSSampr1vSOZmZmampr1viT2vSOampr2viT2viSampr2viSampr2vyX4vyWbm5v3vSSdnZ32wSadnZ36wCWcnJyZmZn/wSr/2ySampr2vSP2viSZmZn2vSSZmZn2vST2viSampr2viSbm5ubm5uZmZn1vSSampqbm5v2vSWampqampr3vSf5wiT5vyagoKD/xCmkpKT/yCSZmZn1vSO4V2dEAAAAQHRSTlMA+vsG9fO6uqdgRSIi7+3q39XVqZWVgnJyX09HPDw1NTAwKRkYB+jh3L6+srKijY2Ef2lpYllZUU5CKigWFQ4Oneh1twAAAZlJREFUOMuV0mdzAiEQBmDgWq4YTWIvKRqT2Htv8P//VJCTGfYQZnw/3fJ4tyO76KE0m1b2fZu+U/pu4QGlA7N+Up5PIz9d+cmkbSrSNr9seT3GKeNYIyeO5j16S28exY5suK0U/QKmmeCCX6xs22hJLVkitMImxCvEs8EG3SCRCN/ViFPqnq5epIzZ07QJJvkM9Tkz1xnkmXbfSvR7f4H8AtXBkLGj74mMvjM1+VHZpAZ4LM4K/LBWEI9jwP71v1ZEQ6dyvQMf8A/1pmdZnKce/VH1iIsdte4U8VEtY23xOujxtFpWDgKbfjD2YeEhY0OzfjGeLyO/XfnNpAcmcjDwKOXRfU1IyiTRyEkaiz67pb9oJHJb9vVqKfgjLBPyF5Sq9T0KmSUhQmtiQrJGPHVi0DoSabj31G2gW3buHd0pY85lNdcCk8xlNDPXMuSyNiwl+theIb9C7RLIpKvviYy+M6H8qGwSAp6Is19+GP6KxwnggJ/kq6Jht5rnRQA4z9zyRRaXssvyqp5I6Vutv0vkpJaJtnjpz/8B19ytIayazLoAAAAASUVORK5CYII=");background-position:0 30px;pointer-events:none;opacity:0}
.starability-slot>label:nth-of-type(5)::before{width:120px;left:-120px}
.starability-slot>label:nth-of-type(4)::before{width:90px;left:-90px}
.starability-slot>label:nth-of-type(3)::before{width:60px;left:-60px}
.starability-slot>label:nth-of-type(2)::before{width:30px;left:-30px}
.starability-slot>label:nth-of-type(1)::before{width:0;left:0}
.starability-slot>input:checked~label,.starability-slot>input:hover~label,.starability-slot>input:focus~label{transition:background-position .7s}
`;

// ─── Unique ID helper for starability fieldset (avoids conflicts) ─────────────
let _uid = 0;
const uid = () => ++_uid;

// ─── Star Rating Input (matches reference project's starability-slot style) ──
const StarInput = ({ value, onChange }) => {
  const [id] = useState(() => uid());
  return (
    <fieldset className="starability-slot" style={{ marginBottom: 8 }}>
      <input type="radio" id={`no-rate-${id}`} className="input-no-rate"
        name={`rating-${id}`} value="1" defaultChecked aria-label="No rating." />
      {[1,2,3,4,5].map((star, i) => {
        const labels = ["Terrible","Not good","Average","Very good","Amazing"];
        return (
          <React.Fragment key={star}>
            <input
              type="radio"
              id={`rate${star}-${id}`}
              name={`rating-${id}`}
              value={String(star)}
              checked={value === star}
              onChange={() => onChange(star)}
            />
            <label htmlFor={`rate${star}-${id}`} title={labels[i]}>
              {star} star{star > 1 ? "s" : ""}
            </label>
          </React.Fragment>
        );
      })}
    </fieldset>
  );
};

// ─── Star Display (read-only, matches reference project's starability-result) ─
const StarDisplay = ({ rating }) => (
  <p
    className="starability-result"
    data-rating={String(rating)}
    style={{ marginBottom: 8 }}
  />
);

// ─── Average rating bar ───────────────────────────────────────────────────────
const AverageRating = ({ reviews }) => {
  if (!reviews.length) return null;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
      <span style={{ fontSize:36, fontWeight:700, color:"#333" }}>{avg}</span>
      <div>
        <StarDisplay rating={Math.round(Number(avg))} />
        <span style={{ fontSize:13, color:"#888" }}>
          Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

// ─── Single Review Card (matches reference project's card layout) ─────────────
const ReviewCard = ({ review, currentUserId, onEdit, onDelete }) => {
  const isOwner = review.patientId === currentUserId ||
                  review.patientId?._id === currentUserId ||
                  review.patientId?.toString() === currentUserId;

  const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
    day:"numeric", month:"short", year:"numeric",
  });

  return (
    <div style={{
      background:"#fff",
      border:"1px solid #e0e0e0",
      borderRadius:12,
      padding:"20px 24px",
      boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
      marginBottom:16,
    }}>
      {/* Avatar + name row */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
        <div style={{
          width:40, height:40, borderRadius:"50%",
          background:"#4b5563", color:"#fff",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontWeight:700, fontSize:16, flexShrink:0,
        }}>
          {review.patientName?.[0]?.toUpperCase() || "P"}
        </div>
        <div>
          <div style={{ fontWeight:600, fontSize:15 }}>@{review.patientName}</div>
          <div style={{ fontSize:12, color:"#999" }}>{date}</div>
        </div>
      </div>

      {/* Star rating */}
      <StarDisplay rating={review.rating} />

      {/* Comment */}
      <p style={{ fontSize:14, color:"#555", lineHeight:1.65, marginBottom:12 }}>
        {review.comment}
      </p>

      {/* Edit / Delete — only if owner */}
      {isOwner && (
        <div style={{ display:"flex", gap:8 }}>
          <button
            onClick={() => onEdit(review)}
            style={{
              padding:"5px 14px", fontSize:13, cursor:"pointer",
              border:"1px solid #6366f1", borderRadius:6,
              background:"#fff", color:"#6366f1",
            }}
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(review._id)}
            style={{
              padding:"5px 14px", fontSize:13, cursor:"pointer",
              border:"1px solid #ef4444", borderRadius:6,
              background:"#fff", color:"#ef4444",
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Review Form (add + edit — matches reference project's form style) ─────────
const ReviewForm = ({ doctorId, existingReview, onSuccess, onCancel }) => {
  const { backendUrl, token, userData } = useContext(AppContext);
  const [rating,  setRating]  = useState(existingReview?.rating  || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [saving,  setSaving]  = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating)         return toast.error("Please select a star rating");
    if (!comment.trim()) return toast.error("Please write a comment");

    setSaving(true);
    try {
      let res;
      if (existingReview) {
        // PUT /api/reviews/:id
        res = await axios.put(
          `${backendUrl}/api/reviews/${existingReview._id}`,
          { rating, comment },
          { headers: { token } }
        );
      } else {
        // POST /api/reviews/add
        res = await axios.post(
          `${backendUrl}/api/reviews/add`,
          {
            doctorId,
            rating,
            comment,
            patientName:  userData?.name  || "Patient",
            patientImage: userData?.image || "",
          },
          { headers: { token } }
        );
      }

      if (res.data.success) {
        toast.success(res.data.message);
        onSuccess(res.data.review);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setSaving(false);
  };

  return (
    <div style={{
      background:"#fff",
      border:"1px solid #e0e0e0",
      borderRadius:12,
      padding:"24px",
      boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
      marginBottom:20,
    }}>
      <h4 style={{ fontWeight:700, marginBottom:16, fontSize:17 }}>
        ⭐ {existingReview ? "Edit Your Review" : "Leave a Review"}
      </h4>

      <form onSubmit={handleSubmit} noValidate>
        {/* Rating */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontWeight:600, display:"block", marginBottom:6, fontSize:14 }}>
            Rating
          </label>
          <StarInput value={rating} onChange={setRating} />
        </div>

        {/* Comment */}
        <div style={{ marginBottom:16 }}>
          <label style={{ fontWeight:600, display:"block", marginBottom:6, fontSize:14 }}>
            Comment
          </label>
          <textarea
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={4}
            maxLength={1000}
            placeholder="Share your experience with this doctor..."
            required
            style={{
              width:"100%", padding:"10px 14px",
              border:"1px solid #d1d5db", borderRadius:8,
              fontSize:14, resize:"vertical",
              fontFamily:"inherit", outline:"none",
              boxSizing:"border-box",
            }}
          />
          <div style={{ textAlign:"right", fontSize:12, color:"#aaa", marginTop:2 }}>
            {comment.length}/1000
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display:"flex", gap:10 }}>
          <button
            type="submit"
            disabled={saving}
            style={{
              padding:"9px 22px", borderRadius:8, border:"none",
              background:"#1a1a1a", color:"#fff",
              fontSize:14, fontWeight:600, cursor:"pointer",
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? "Saving..." : existingReview ? "Update Review" : "Submit Review"}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding:"9px 22px", borderRadius:8,
                border:"1px solid #d1d5db", background:"#fff",
                fontSize:14, color:"#555", cursor:"pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

// ─── Main ReviewSection ────────────────────────────────────────────────────────
const ReviewSection = ({ doctorId }) => {
  const { backendUrl, token, userData } = useContext(AppContext);

  const [reviews,       setReviews]       = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [showForm,      setShowForm]      = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  // Fetch reviews for this doctor
  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/reviews/${doctorId}`);
      if (data.success) setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }, [backendUrl, doctorId]);

  useEffect(() => { fetchReviews(); }, [fetchReviews]);

  // Check if current user already has a review
  const myReview = userData
    ? reviews.find(
        r => r.patientId === userData._id ||
             r.patientId?.toString() === userData._id
      )
    : null;

  // After submit / edit — update list without page reload
  const handleSuccess = (saved) => {
    setReviews(prev => {
      const idx = prev.findIndex(r => r._id === saved._id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = saved;
        return copy;
      }
      return [saved, ...prev];
    });
    setShowForm(false);
    setEditingReview(null);
  };

  // Delete
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/reviews/${reviewId}`,
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Review deleted");
        setReviews(prev => prev.filter(r => r._id !== reviewId));
        setEditingReview(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* Inject starability CSS once */}
      <style>{STAR_CSS}</style>

      <div style={{ marginTop: 48, paddingBottom: 40 }}>
        <hr style={{ marginBottom: 32, borderColor: "#e5e7eb" }} />

        {/* Section header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12, marginBottom:24 }}>
          <h3 style={{ fontWeight:700, fontSize:22, margin:0 }}>
            💬 All Reviews
          </h3>

          {/* Show "Leave a Review" only if logged in and hasn't reviewed yet */}
          {token && !myReview && !showForm && !editingReview && (
            <button
              onClick={() => setShowForm(true)}
              style={{
                padding:"9px 20px", borderRadius:8, border:"none",
                background:"#1a1a1a", color:"#fff",
                fontSize:14, fontWeight:600, cursor:"pointer",
              }}
            >
              ⭐ Leave a Review
            </button>
          )}
        </div>

        {/* Average rating summary */}
        <AverageRating reviews={reviews} />

        {/* New review form */}
        {showForm && !myReview && (
          <ReviewForm
            doctorId={doctorId}
            onSuccess={handleSuccess}
            onCancel={() => setShowForm(false)}
          />
        )}

        {/* Edit form */}
        {editingReview && (
          <ReviewForm
            doctorId={doctorId}
            existingReview={editingReview}
            onSuccess={handleSuccess}
            onCancel={() => setEditingReview(null)}
          />
        )}

        {/* Reviews list */}
        {loading ? (
          <div style={{ padding:"40px 0", textAlign:"center", color:"#999" }}>
            Loading reviews…
          </div>
        ) : reviews.length === 0 ? (
          <div style={{
            padding:"48px 0", textAlign:"center", color:"#9ca3af",
            background:"#f9fafb", borderRadius:12, border:"1px solid #f0f0f0",
          }}>
            <div style={{ fontSize:32, marginBottom:8 }}>⭐</div>
            <p style={{ margin:0, fontWeight:500 }}>No reviews yet</p>
            <p style={{ margin:"4px 0 0", fontSize:13 }}>
              {token ? "Be the first to review this doctor!" : "Reviews will appear here after consultations."}
            </p>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:16 }}>
            {reviews.map(review => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUserId={userData?._id}
                onEdit={r => { setEditingReview(r); setShowForm(false); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewSection;