import React from 'react';

/**
 * Render a Tile containing basic vendor information
 *
 */
const VendorTile = ({ vendor, onClick }) => {
  const {
    name = '',
    address = '',
    updated = '',
    status = '',
    contact = {},
  } = vendor;

  const {
    name: contactName = '',
    phone = '',
    email = '',
  } = contact;

  return (
    <div className="vendor-container">
      {/* <div className="vendor-img" /> */}
      <h3 className="vender-header">{name}</h3>
      <div className="row vendor-row">
        <div className="col-sm-4">
          <h6>Address</h6>
          <p>{address}</p>
          {/* <p>{address.city}, {address.state} {address.zip}</p> */}
        </div>
        <div className="col-sm-4">
          <h6>Primary Contact</h6>
          <p>Name: {contactName}</p>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
        <div className="col-sm-1">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClick}
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorTile;
