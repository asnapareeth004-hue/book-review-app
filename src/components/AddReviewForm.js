import React, { useState } from 'react';

function AddReviewForm() {
  const [formData, setFormData] = useState({
    bookName: '',
    userName: '',
    rating: '',
    comment: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5067/api/Review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Review added successfully!');
        setFormData({ bookName: '', userName: '', rating: '', comment: '' });
      } else {
        alert('Failed to add review.');
      }
    } catch (error) {
      console.error('Error connecting to the API:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '10px', margin: '20px', fontFamily: 'Arial' }}>
      <h3>Add a Review</h3>
      <input type="text" name="bookName" placeholder="Book Name" value={formData.bookName} onChange={handleChange} required />
      <input type="text" name="userName" placeholder="Your Name" value={formData.userName} onChange={handleChange} required />
      <input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" value={formData.rating} onChange={handleChange} required />
      <textarea name="comment" placeholder="Write your comment..." value={formData.comment} onChange={handleChange} required />
      <button type="submit" style={{ padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>Submit Review</button>
    </form>
  );
}

export default AddReviewForm;