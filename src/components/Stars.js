import React, { useState, useEffect, useCallback } from 'react';

const Stars = ({ rating }) => {
  const [fullStars, setFullStars] = useState([]);

  useEffect(() => {
    const stars = [];
    for (let i = 1; i <= 5; ++i) {
      stars.push(i <= rating);
    }
    setFullStars(stars);
  }, [rating, setFullStars]);

  const renderStar = useCallback(
    (active, idx) => (
      <span key={idx} className={`star${active ? '' : '__empty'}`} />
    ),
    []
  );

  return <span className="stars">{fullStars.map(renderStar)}</span>;
};

export default Stars;
