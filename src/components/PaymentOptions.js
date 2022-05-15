import React, { useCallback } from 'react';

const PaymentOptions = ({ paymentOptions }) => {
  const renderOption = useCallback(
    (name, idx) => (
      <span className="badge" key={idx}>
        {name}
      </span>
    ),
    []
  );

  return <p className="payment-option">{paymentOptions.map(renderOption)}</p>;
};

export default PaymentOptions;
