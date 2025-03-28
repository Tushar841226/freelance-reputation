import { useState, useEffect } from "react";
import { freelance_reputation_backend } from "../../declarations/freelance-reputation-backend"; // ✅ Fixed import

export const useFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFreelancers = async () => {
    setLoading(true);
    try {
      const fetchedFreelancers = await freelance_reputation_backend.getAllFreelancers(); // ✅ Fixed
      setFreelancers(fetchedFreelancers);
    } catch (err) {
      setError("Failed to fetch freelancers.");
      console.error("Error fetching freelancers:", err);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (id, rating, reviewText) => {
    setLoading(true);
    try {
      const success = await freelance_reputation_backend.addReview(id, rating, reviewText); // ✅ Fixed
      if (success) fetchFreelancers();
    } catch (err) {
      setError("Failed to add review.");
      console.error("Error adding review:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  return { freelancers, loading, error, fetchFreelancers, addReview };
};
