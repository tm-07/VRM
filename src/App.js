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
  ADD: 'ADD',
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
      <VendorTile vendor={d} key={i} onClick={this.navigateToDetailPage} />
    ));
  }

  // simple state based routing functions
  navigateToDetailPage = () => {
    this.setState({ view: VIEW.DETAIL });
  }
  navigateToAddPage = () => {
    this.setState({ view: VIEW.ADD });
  }
  navigateToSearchPage = () => {
    this.setState({ view: VIEW.SEARCH });
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
          <div>

          </div>
        );
      }

      case VIEW.ADD: {
        return (
          <div>

          </div>
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
                  className="btn btn-small clear-button"
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
