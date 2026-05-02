import axios from "axios";

const BASE_URL = "https://book-review-app-1-pbw6.onrender.com";

/* =========================
   GET all reviews
========================= */
export const getReviews = () => {
  return axios.get(`${BASE_URL}/api/Review`);
};

/* =========================
   POST add review
========================= */
export const addReview = (data) => {
  return axios.post(`${BASE_URL}/api/Review`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};

/* =========================
   (Optional) DELETE review
========================= */
export const deleteReview = (id) => {
  return axios.delete(`${BASE_URL}/Review/${id}`);
};

/* =========================
   (Optional) UPDATE review
========================= */
export const updateReview = (id, data) => {
  return axios.put(`${BASE_URL}/Review/${id}`, data, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};