import React from 'react';
import HorizontalBarChart from '@/components/Areas/TournamentsArea/HorizontalBarChart';

const TournamentsArea: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="heading3 text-center text-lightViolet mb-small">Tournaments Graphs</h1>
      <HorizontalBarChart />
    </div>
  );
};

export default TournamentsArea;