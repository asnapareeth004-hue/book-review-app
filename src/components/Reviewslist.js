import React, { useState, useEffect } from 'react';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5067/api/Review')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial' }}>
      <h2>Book Reviews</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {reviews.map((review) => (
          <li key={review.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', borderRadius: '5px' }}>
            <strong>{review.bookName}</strong> by {review.userName} <br />
            Rating: {review.rating}/5 <br />
            <em>{review.comment}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewsList;