import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      introPage: true,
      displayPage: false,
      searchString: '',
      data: {}
    };
  }

  handleSubmit = (e) => {
    this.setState({
      introPage: false,
      displayPage: true
    });
    this.searchDB();
    this.renderDisplayPage();
  }

  handleClick = (e) => {
    this.setState({
      introPage: true,
      displayPage: false,
      searchString: ''
    });
    this.renderIntroPage();
  }

  handleChange = (e) => {
    this.setState({
      searchString: e.target.value
    });
  }

  searchDB = () => {
    let inputText = this.state.searchString;
    window.db.collection("business-collection").where("category", "==", inputText)
        .get()
        .then((querySnapshot) => {
            this.setState({
              data: querySnapshot.docs
            });
            querySnapshot.forEach(function (doc) {
                // David render card with data
                console.log(doc);
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

  renderIntroPage() {
    return (
      <>
        {this.state.introPage ? 
          <div className="intro-page">
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
                    placeholder="Search vendor category..."
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
          </div>
          :
          this.renderDisplayPage()
        }
      </>
    );
  }

  renderDisplayPage() {
    return (
      <>
        {this.state.displayPage ?
          <div className="display-page">
            <div className="small-search">
              <img 
                src={require('./images/Make-A-Wish_small_logo.png')}
                className="small-logo"
                alt="logo"
                height="30"
                width="30"
              />
              <button
                type="button"
                onClick={this.handleClick}
                className="backButton"
              >
                Go back to start page
              </button>
            </div>
            <p>List of vendors related to: {this.state.searchString}</p>
          </div>
          :
          this.renderIntroPage()
        }
      </>
    );
  }

  render() {
    return (
      <main>
        {this.renderIntroPage()}
      </main>
    );
  }
}

export default App;
