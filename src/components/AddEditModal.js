import React, { useContext, createRef } from 'react';
import { AppContext } from '../context';
import Modal from './Modal';

const fields = [
  { name: 'address', type: 'text', label: 'Address' },
  { name: 'area', type: 'text', label: 'Area' },
  { name: 'city', type: 'text', label: 'City' },
  { name: 'state', type: 'text', label: 'State' },
  { name: 'country', type: 'text', label: 'Country' },
  {
    name: '_geoloc',
    type: 'range',
    fields: [
      { name: 'lat', type: 'number', label: 'Latitude' },
      { name: 'lng', type: 'number', label: 'Longitude' },
    ],
  },
  {
    name: 'dining_style',
    type: 'select',
    options: ['Casual Dining', 'Casual Elegant', 'Fine Dining', 'Home Style'],
    label: 'Dining Style',
  },
  { name: 'food_type', type: 'text', label: 'Food Type' },
  { name: 'image_url', type: 'text', label: 'Image URL' },
  { name: 'mobile_reserve_url', type: 'text', label: 'Mobile Reserve URL' },
  { name: 'name', type: 'text', label: 'Name' },
  { name: 'neighborhood', type: 'text', label: 'Neighborhood' },
  { name: 'phone_number', type: 'phone', label: 'Phone Number' },
  { name: 'postal_code', type: 'text', label: 'Postal Code' },
  { name: 'price', type: 'number', label: 'Price' },
  { name: 'price_range', type: 'text', label: 'Price Range ($x and $x)' },
  { name: 'reserve_url', type: 'text', label: 'Reserve URL' },
  { name: 'reviews_count', type: 'number', label: 'Review Count' },
  {
    name: 'payment_options',
    type: 'select',
    multiple: true,
    options: ['Cash', 'AMEX', 'Discover', 'MasterCard', 'Visa'],
    label: 'Payment Options',
  },
  { name: 'stars_count', type: 'number', label: 'Stars' },
];

const AddEditModal = () => {
  const formRef = createRef();
  const { state, dispatch } = useContext(AppContext);
  const {
    editModalData,
    editModalData: { hit = {}, hit: { objectID, name } = {} } = {},
  } = state;
  const isOpen = Boolean(editModalData);
  const title = objectID ? name : 'Add restaurant';

  const closeModal = () => {
    dispatch({ type: 'CLOSE_EDIT_MODAL' });
  };

  const acceptModal = () => {
    const isValid = formRef.current.reportValidity();
    if (isValid) {
      formRef.current.dispatchEvent(new Event('submit'));
    }
  };
  const onSubmit = e => {
    e.preventDefault();
    const elements = [...e.target.elements];
    const values = { objectID: hit.objectID };
    elements.forEach(({ name, value, multiple, options }) => {
      if (multiple) {
        values[name] = [...options]
          .filter(option => option.selected)
          .map(option => option.value);
      } else {
        values[name] = value;
      }
    });
    values.phone = values.phone_number.replace(/[^0-9+]/g, '');
    values.rounded_stars_count = Math.round(values.stars_count);
    console.log('====elements', values);

    fetch('http://localhost:3003/update', { method: 'PUT', body: JSON.stringify(values), headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log('====response', response);
      })
      .catch((e) => {
        console.log('====e', e);
      });
  };

  const renderField = (
    { label, name, type, options, multiple, fields },
    values = hit
  ) => {
    const id = `field_${name}`;
    switch (type) {
      case 'number':
      case 'phone':
      case 'text': {
        return (
          <>
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              className="form-control"
              id={id}
              name={name}
              defaultValue={values[name]}
              required
            />
          </>
        );
      }
      case 'select': {
        return (
          <>
            <label htmlFor={id}>{label}</label>
            <select
              className="form-control"
              id={id}
              name={name}
              multiple={multiple}
              required
            >
              {options.map(option => {
                let selected = values[name] === option;
                if (Array.isArray(values[name])) {
                  selected = values[name].indexOf(option) !== -1;
                }
                return (
                  <option value={option} key={option} selected={selected}>
                    {option}
                  </option>
                );
              })}
            </select>
          </>
        );
      }
      case 'range': {
        return (
          <div className="row no-gutter">
            {fields.map(field => (
              <div className="col-xs-6" key={field.name}>
                {renderField(field, values[name])}
              </div>
            ))}
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <Modal
      className="add-edit-modal"
      open={isOpen}
      title={title}
      onClose={closeModal}
      onAccept={acceptModal}
    >
      <form ref={formRef} onSubmit={onSubmit}>
        <div className="container-fluid">
          <div className="row">
            {fields.map(field => (
              <div className="col-sm-6 col-md-4" key={field.name}>
                <div className="form-group">{renderField(field)}</div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditModal;
