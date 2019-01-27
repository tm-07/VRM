import React from 'react';

/**
 * Form page for adding new history about a vendor
 */
const AddNewDonation = ({ handleBack }) => {
  return (
    <div className="details-page">
     
      <form>
   
      <button className="btn btn-primary back-button"  onClick={() => handleBack()}>Back</button>
      <div id="new-donation-text">Add new contribution</div>
        <div id="details-first-row">
          <span>
            <label className="contribution-label" htmlFor="contributionField">Contribution Type<font color="red">*</font></label>
            <select className="form-control" id="contributionField">  
              <option>Discount</option>
              <option>Monetary</option>
              <option>In Kind</option>
            </select>
          </span>
          </div>
        <div id="details-first-second-row">
          <span>
            <label className="contribution-label" htmlFor="dateField">Date</label>
            <input type="date" className="form-control" id="dateField" />
          </span>
        </div>
        <div id="details-second-row">
          <label className="contribution-label" htmlFor="valueField">Contribution Description</label>
          <input type="email" className="form-control" id="valueField" />
        </div>
        <div id="details-third-row">
          <label className="contribution-label" htmlFor="noteField">Notes</label>
          <textarea type="email" className="form-control" id="noteField" />
        </div>
        <button
      className="btn btn-primary"
        id="save-button"
        onClick={() => handleBack()}
      >
        Save
      </button>
      </form>
     
    </div>
  );
}

export default AddNewDonation;
