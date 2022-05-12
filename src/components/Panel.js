import React from 'react';

const Panel = ({ title, children, id }) => (
  <div id={id}>
    <h5>
      <i className="fa fa-chevron-right" /> {title}
    </h5>
    {children}
  </div>
);

export default Panel;
