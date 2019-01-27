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

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      view: VIEW.SEARCH,
      data: []
    };
  }

  renderTiles = () => {
    const { data } = this.state;
    return data.map((d, i) => (
      <VendorTile vendor={d} key={i} onClick={this.navigateToDetailPage} />
    ))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.searchDB();
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value
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
          data.push(doc.data());
        });
        this.setState({
          data,
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  navigateToDetailPage = () => {
    this.setState({ view: VIEW.DETAIL });
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
                      autoFocus
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="Find a vendor..."
                      onChange={this.handleChange}
                    />
                  </div>
                </form>
              </div>
              {this.renderTiles()}
            </div>
          </main>
        );
      }
    }
  }
}

export default App;
