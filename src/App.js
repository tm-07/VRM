import React, { Component } from 'react';
import './App.css';
import VendorTile from './components/VendorTile/VendorTile';

/**
 * Data interface
 *  address: string
 *   category: string;
 *   name: string;
 */

const VIEW = {
  SEARCH: 'SEARCH',
  DETAIL: 'DETAIL',
};

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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: VIEW.SEARCH,
      searchString: '',
      currentSearch: '',
      data: [],
      placeholder: "Find a vendor...",
    };
  }

  componentDidMount = () => {
    document.getElementById('formGroupExampleInput').focus();
  }

  renderTiles = () => {
    const { data } = this.state;
    return data.map((d, i) => (
      <VendorTile vendor={d} key={i} onClick={this.navigateToDetailPage} />
    ));
  }

  navigateToDetailPage = () => {
    this.setState({ view: VIEW.DETAIL });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      currentSearch: this.state.searchString,
      searchString: ''
    });
    this.searchDB();
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value
    });
  }

  handleClear = () => {
    this.setState({
      data: [],
      searchString: '',
      currentSearch: '',
    });
    document.getElementById('formGroupExampleInput').focus();
  }

  handleBack = () => {
    this.setState({
      view: VIEW.SEARCH,

    });
  }

  searchDB = () => {
    let inputText = this.state.searchString;
    window.db
      .collection("business-collection")
      .where("category", "==", inputText)
      .get()
      .then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          // David render card with data
          console.log(doc.data());
          data.push(doc.data());
        });
        this.setState({
          data,
        });
      })
      .then(() => {
        this.setState({
          placeholder: "Find a vendor..."
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  render() {
    const { view } = this.state;

    switch (view) {
      case VIEW.DETAIL: {
        // this will be the details page component
        return (
          <AddNewDonation handleBack={this.handleBack}/>
        );
      }

      default: {
        return (
          <main>
            <div className="main-page">
              <p className="form-title">
                Vendor Relationship Manager
              </p>
              <div className="intro-search">
                <img
                  src={require('./images/Make-A-Wish_small_logo.png')}
                  className="medium-logo"
                  alt="logo"
                  height="36"
                  width="36"
                />
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder={this.state.placeholder}
                      onChange={this.handleChange}
                      value={this.state.searchString}
                    />
                  </div>
                </form>
                <button
                  className="clear-button"
                  onClick={this.handleClear}
                >
                  Clear
            </button>
              </div>
              {this.state.currentSearch !== '' ?
                <p>Results for: {this.state.currentSearch}</p>
                :
                null
              }
              {this.renderTiles()}
            </div>
          </main>
        );
      }
    }
  }
}

export default App;
