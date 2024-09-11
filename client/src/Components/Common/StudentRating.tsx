import React from 'react';
import { Rating, Box, Typography } from '@mui/material';

interface StudentRatingProps {
  averageRating?: number; // Marking it as optional
}

const StudentRating: React.FC<StudentRatingProps> = ({ averageRating = 0 }) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography component="legend">Student Rating:</Typography>
      <Rating
        name="student-rating"
        value={averageRating}
        precision={0.5} // allows half-star ratings
        readOnly // makes the rating component read-only, so it can't be changed
      />
      <Typography component="span" sx={{ ml: 2 }}>
        {averageRating.toFixed(1)} / 5
      </Typography>
    </Box>
  );
};

export default StudentRating;
