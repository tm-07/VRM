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
    primaryContact = {},
    website = ''
  } = vendor;
  console.log(primaryContact);

  return (
    <div className="vendor-container">
      {/* <div className="vendor-img" /> */}
      <div className="row">
        <div className="col-sm-6 vender-header">{name}</div>
        <div className="col-sm-5 vendor-status">{status}</div>
      </div>
      <div className="row">
      <div className="col-sm-6">
        <div className="row vendor-row">
          <div className="col-sm-12">
            <div className="data-header">Address</div>
            <p>{address}</p>
            <div className="data-header">Website</div>
            <p>{website}</p>
          </div>
        </div>
        </div>
        <div className="col-sm-6">
        <div className="row vendor-row">
          <div className="col-sm-8">
            <h6>Primary Contact</h6>
            <p>Name: {primaryContact.name}</p>
            <p>Phone: {primaryContact.phone}</p>
            <p>Email: {primaryContact.email}</p>
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
      </div>
    </div>
  );
};

export default VendorTile;
