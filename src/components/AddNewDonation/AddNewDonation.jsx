import React from 'react';

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
            <label for="contributionField">Contribution type<font color="red">*</font></label>
            <input type="email" class="form-control" id="contributionField" />
          </span>
          <span>
            <label for="dateField">Date</label>
            <input type="email" class="form-control" id="dateField" />
          </span>
        </div>
        <div id="details-second-row">
          <label for="valueField">Value</label>
          <input type="email" class="form-control" id="valueField" />
        </div>
        <div id="details-third-row">
          <label for="noteField">Notes</label>
          <textarea type="email" class="form-control" id="noteField" />
        </div>
      </form>
      <button
        id="save-button"
        onClick={null}
      >
        Save
      </button>
    </div>
  );
}

export default AddNewDonation;
