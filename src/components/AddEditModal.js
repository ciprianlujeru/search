import React, {
  useState,
  useContext,
  createRef,
  useCallback,
  useMemo,
} from 'react';
import { AppContext } from '../context';
import Modal from './Modal';

const fields = [
  { name: 'name', type: 'text', label: 'Name' },
  {
    name: 'dining_style',
    type: 'select',
    options: ['Casual Dining', 'Casual Elegant', 'Fine Dining', 'Home Style'],
    label: 'Dining Style',
  },
  { name: 'food_type', type: 'text', label: 'Food Type' },
  { name: 'phone_number', type: 'phone', label: 'Phone Number' },
  { name: 'address', type: 'text', label: 'Address' },
  { name: 'area', type: 'text', label: 'Area' },
  { name: 'city', type: 'text', label: 'City' },
  { name: 'state', type: 'text', label: 'State' },
  { name: 'country', type: 'text', label: 'Country' },
  { name: 'postal_code', type: 'text', label: 'Postal Code' },
  { name: 'neighborhood', type: 'text', label: 'Neighborhood' },
  {
    name: '_geoloc',
    type: 'range',
    fields: [
      { name: 'lat', type: 'number', label: 'Latitude' },
      { name: 'lng', type: 'number', label: 'Longitude' },
    ],
  },
  { name: 'price', type: 'number', label: 'Price' },
  { name: 'stars_count', type: 'number', label: 'Stars', step: '0.1' },
  { name: 'reviews_count', type: 'number', label: 'Review Count' },
  { name: 'price_range', type: 'text', label: 'Price Range ($x and $x)' },
  { name: 'image_url', type: 'text', label: 'Image URL' },
  { name: 'reserve_url', type: 'text', label: 'Reserve URL' },
  { name: 'mobile_reserve_url', type: 'text', label: 'Mobile Reserve URL' },
  {
    name: 'payment_options',
    type: 'select',
    multiple: true,
    options: ['Cash', 'AMEX', 'Discover', 'MasterCard', 'Visa'],
    label: 'Payment Options',
  },
];

const AddEditModal = () => {
  const formRef = createRef();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useContext(AppContext);
  const {
    addEditModalData,
    addEditModalData: { hit = {}, hit: { objectID, name } = {} } = {},
  } = state;
  const isOpen = Boolean(addEditModalData);
  const title = objectID ? name : 'Add restaurant';

  const closeModal = useCallback(() => {
    setError(null);
    setIsPending(false);
    dispatch({ type: 'CLOSE_ADD_EDIT_MODAL' });
  }, [setIsPending]);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      setError(null);

      if (!isPending) {
        setIsPending(true);
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

        let url = `${window.location.origin}/restaurant`;
        let method = 'POST';
        if (objectID) {
          url += `/${objectID}`;
          method = 'PUT';
        }

        fetch(url, {
          method,
          body: JSON.stringify(values),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => {
            if (response.ok) {
              dispatch({ type: 'TOGGLE_REFRESH_QUERY' });
              closeModal();
            } else {
              throw response;
            }
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setIsPending(false);
          });
      }
    },
    [isPending, hit]
  );

  const renderField = useMemo(
    () => (
      { label, name, type, options, multiple, fields, step },
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
                autoComplete="off"
                className="form-control"
                id={id}
                name={name}
                defaultValue={values[name]}
                step={step}
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
                <div className="col-xs-6" key={`${field.name}${objectID}`}>
                  {renderField(field, values[name])}
                </div>
              ))}
            </div>
          );
        }
        default:
          return null;
      }
    },
    [hit]
  );

  const renderFields = useCallback(
    field => (
      <div className="col-sm-6 col-md-4" key={`${field.name}${objectID}`}>
        <div className="form-group">{renderField(field)}</div>
      </div>
    ),
    [renderField]
  );

  return (
    isOpen && (
      <Modal
        className="add-edit-modal"
        open={isOpen}
        title={title}
        onClose={closeModal}
        saveType="submit"
        isPending={isPending}
        renderContent={(bodyClass, extraElements) => (
          <>
            <form ref={formRef} onSubmit={onSubmit}>
              <div className={bodyClass}>
                <div className="container-fluid">
                  <div className="row">{fields.map(renderFields)}</div>
                </div>
                <div className="form-error">
                  {error && 'A problem has occurred, please try again later.'}
                </div>
              </div>
              {extraElements}
            </form>
          </>
        )}
      />
    )
  );
};

export default AddEditModal;
