// components/MetricsSection.tsx
import React from "react";

interface MetricsProps {
  totalOffers: number;
  totalRatings: number;
  totalComments: number;
  totalVideos: number;
}

const MetricsSection: React.FC<MetricsProps> = ({
  totalOffers,
  totalRatings,
  totalComments,
  totalVideos,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-primary text-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Offers</h3>
        <p className="text-xl">{totalOffers}</p>
      </div>
      <div className="bg-primary text-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Ratings</h3>
        <p className="text-xl">{totalRatings}</p>
      </div>
      <div className="bg-primary text-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Comments</h3>
        <p className="text-xl">{totalComments}</p>
      </div>
      <div className="bg-primary text-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Videos</h3>
        <p className="text-xl">{totalVideos}</p>
      </div>
    </div>
  );
};

export default MetricsSection;
