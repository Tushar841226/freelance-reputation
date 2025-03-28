import React, { useState } from "react";
import { useFreelancers } from "../hooks/useFreelancers";
import FreelancerCard from "../components/FreelancerCard";

const Home = () => {
  const { freelancers, loading, error, addReview } = useFreelancers();
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const handleSubmitReview = () => {
    if (selectedFreelancer && reviewText) {
      addReview(selectedFreelancer, rating, reviewText);
      setReviewText("");
      setSelectedFreelancer(null);
    }
  };

  if (loading) return <p>Loading freelancers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1 className="my-4">Freelancer Reputation System</h1>
      {freelancers.map((freelancer, index) => (
        <FreelancerCard
          key={index}
          freelancer={freelancer}
          onReview={(name) => setSelectedFreelancer(name)}
        />
      ))}
      {selectedFreelancer && (
        <div className="mt-4">
          <h3>Leave a Review for {selectedFreelancer}</h3>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="form-control my-2"
          />
          <textarea
            className="form-control my-2"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
