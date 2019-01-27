import React, { Component } from 'react';

import VendorTile from './components/VendorTile/VendorTile';
import AddNewDonation from './components/AddNewDonation/AddNewDonation';

import './App.css';

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
      <VendorTile vendor={d} key={i} index={i} onClick={this.navigateToDetailPage} />
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
                      className="form-control search-bar-input"
                      id="formGroupExampleInput"
                      placeholder={this.state.placeholder}
                      onChange={this.handleChange}
                      value={this.state.searchString}
                    />
                  </div>
                </form>
              </div>
              
              {this.state.currentSearch !== '' ?
                <p className="keyword-text">keyword: {this.state.currentSearch}<button
                className="clear-button"
                onClick={this.handleClear}
              >
                ❌
          </button></p>
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
