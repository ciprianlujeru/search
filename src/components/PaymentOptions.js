import React from 'react';

const PaymentOption = ({ name }) => <span className="badge">{name}</span>;

const PaymentOptions = ({ paymentOptions }) => (
  <p className="payment-option">
    {paymentOptions.map((paymentOption, idx) => (
      <PaymentOption name={paymentOption} key={idx} />
    ))}
  </p>
);

export default PaymentOptions;
