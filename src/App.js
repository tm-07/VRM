import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      data: []
    };
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
          // David render card with data
          console.log(doc.data());
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

  render() {
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
                  placeholder="Find a vendor..."
                  onChange={this.handleChange}
                />
              </div>
            </form>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
