import React from 'react';

const Star = ({ active }) => (
  <span className={`star${active ? '' : '__empty'}`} />
);

const Stars = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; ++i) {
    stars.push(i <= rating);
  }
  return (
    <span className="stars">
      {stars.map((active, idx) => (
        <Star key={idx} active={active} />
      ))}
    </span>
  );
};

export default Stars;
