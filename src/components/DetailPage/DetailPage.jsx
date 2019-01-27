import React from 'react';
import VendorTile from '../VendorTile/VendorTile';

/**
 * Render a Tile to display recorder contribution history
 */
const ContributionTile = ({ comments, date, type, value }) => (
  <tr>
    <td>{type}</td>
    <td>{value}</td>
    <td>{comments}</td>
    <td>{date}</td>
  </tr>
);

/** Render a list of ContributionTiles */
const renderContributions = ({ contributions }) => {
  return contributions.map((c, i) => (
    <ContributionTile
      key={i}
      comments={c.comments}
      date={c.date}
      type={c.type}
      value={c.value}
    />))
}

/**
 * Render a detail page for a single vendor
 */
const DetailPage = ({
  vendor = {},
  handleBack,
  onClick = () => { },
}) => {
  const { contributions = [] } = vendor;
  return (
    <div className="detail-container">
      <div className="block-background">
        <button className="btn btn-primary back-button" onClick={handleBack}>Back</button>
        <div className="flex-row-centered">
          <VendorTile vendor={vendor} onClick={onClick} view="DETAIL" />
        </div>
      </div>
      <div className="contributions">
        <div className="flex-row">
          <h2>Contribution History</h2>
          <button className="btn btn-primary" onClick={onClick}>+ Add New Donation</button>
        </div>
        <div className="contribution table">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Type</th>
                <th scope="col">Contribution</th>
                <th scope="col">Comment</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {renderContributions({ contributions })}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default DetailPage;
