import React, { Component } from 'react';

import Logo from './images/Make-A-Wish_small_logo.png';

import VendorTile from './components/VendorTile/VendorTile';
import AddNewDonation from './components/AddNewDonation/AddNewDonation';
import DetailPage from './components/DetailPage/DetailPage';

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
  ADD: 'ADD',
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: VIEW.SEARCH,
      searchString: '',
      currentSearch: '',
      selectedTile: 0,
      data: [],
    };
  }

  renderTiles = () => {
    const { data } = this.state;
    return data.map((d, i) => (
      <VendorTile
        key={i}
        vendor={d}
        index={i}
        view={VIEW.SEARCH}
        onClick={this.navigateToDetailPage}
      />
    ));
  }

  handleBackToDetailPage = () => {
    this.setState({
      view: VIEW.DETAIL,
    });
  }

  navigateToDetailPage = (index) => {
    this.setState({
      view: VIEW.DETAIL,
      selectedTile: index,
    });
  }

  navigateToAddPage = () => {
    this.setState({ view: VIEW.ADD });
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
    const { searchString } = this.state;
    window.db
      .collection('business-collection')
      .where('category', '==', searchString)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map(doc => doc.data());
        this.setState({ data });
      })
      .then(() => {
        this.setState({ searchString: '' });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }

  render() {
    const { data, view, selectedTile } = this.state;

    switch (view) {
      case VIEW.DETAIL: {
        // this will be the details page component
        return (
          <DetailPage
            vendor={data[selectedTile]}
            handleBack={this.handleBack}
            onClick={this.navigateToAddPage}
          />
        );
      }

      case VIEW.ADD: {
        return <AddNewDonation handleBack={this.handleBackToDetailPage} />
      }

      default: {
        return (
          <main>
            <div className="main-page">
              <div className="intro-search">
                <img
                  src={Logo}
                  className="medium-logo"
                  alt="logo"
                  height="36"
                  width="36"
                />
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <input
                      autoFocus
                      type="text"
                      className="form-control search-bar-input"
                      id="formGroupExampleInput"
                      placeholder="Find a vendor..."
                      onChange={this.handleChange}
                      value={this.state.searchString}
                    />
                  </div>
                </form>
              </div>

              {this.state.currentSearch !== '' ?
                (
                  <p className="keyword-text">keyword: {this.state.currentSearch}
                    <button
                      className="clear-button"
                      onClick={this.handleClear}
                    >
                      <span role="img" aria-label="x button">❌</span>
                    </button>
                  </p>)
                : null
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
