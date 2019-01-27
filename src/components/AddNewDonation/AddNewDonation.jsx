import React from 'react';

/**
 * Form page for adding new history about a vendor
 */
const AddNewDonation = ({ handleBack }) => {
  return (
    <div className="details-page">
      <button
        className="back-button"
        onClick={() => handleBack()}
      >
        Back
      </button>
      <div id="new-donation-text">Add new contribution</div>
      <form>
        <div id="details-first-row">
          <span>
            <label htmlFor="contributionField">Contribution type<font color="red">*</font></label>
            <input type="email" className="form-control" id="contributionField" />
          </span>
          <span>
            <label htmlFor="dateField">Date</label>
            <input type="email" className="form-control" id="dateField" />
          </span>
        </div>
        <div id="details-second-row">
          <label htmlFor="valueField">Value</label>
          <input type="email" className="form-control" id="valueField" />
        </div>
        <div id="details-third-row">
          <label htmlFor="noteField">Notes</label>
          <textarea type="email" className="form-control" id="noteField" />
        </div>
      </form>
      <button
        id="save-button"
        onClick={() => handleBack()}
      >
        Save
      </button>
    </div>
  );
}

export default AddNewDonation;
