import { StarIcon } from "lucide-react";
import React from "react";


interface StarRatingProps {
    rating: number;
    onRatingChange: (rating: number) => void;
  }

  const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          onClick={() => onRatingChange(star)}
        />
      ))}
    </div>
  );

  export default StarRating;