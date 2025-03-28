import React from "react";

const FreelancerCard = ({ freelancer, onReview }) => {
  const { name, skills, reviews } = freelancer;

  return (
    <div className="card my-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p><strong>Skills:</strong> {skills.join(", ")}</p>
        <h6>Reviews:</h6>
        <ul>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <li key={index}>
                ⭐ {review.rating}/5 - {review.reviewText}
              </li>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </ul>
        <button
          className="btn btn-primary"
          onClick={() => onReview(name)}
        >
          Add Review
        </button>
      </div>
    </div>
  );
};

export default FreelancerCard;
