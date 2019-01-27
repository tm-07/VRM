import React from 'react';

const ActionButton = ({ onClick, view, index }) => {
  const text = (view === 'SEARCH') ? 'Details' : 'Add Donation';
  const action = (view === 'SEARCH')
    ? () => onClick(index)
    : onClick;

  return (
    <button
      type="button"
      className="btn btn-primary details-button"
      onClick={action}
    >
      {text}
    </button>
  );
}

/**
 * Render a Tile containing basic vendor information
 *
 */
const VendorTile = ({ vendor, index, onClick, view }) => {
  const {
    name = '',
    address = '',
    updated = '',
    status = '',
    primaryContact = {},
    website = ''
  } = vendor;
  return (
    <div className={"vendor-container border-" + status + " fade-animation"}>
      {/* <div className="vendor-img" /> */}
      <div className="row">
        <div className="col-sm-6 vender-header">{name}</div>
        <div className={"col-sm-6 vendor-status status-" + status}>{status.substring(0, 1).toUpperCase() + status.substring(1)}</div>
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
            <div className="col-sm-12">
              <div className="data-header">Primary Contact</div>
              <p>Name: {primaryContact.name}<br />Phone: {primaryContact.phone}<br />Email: {primaryContact.email}</p>
              <ActionButton onClick={onClick} view={view} index={index} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorTile;
