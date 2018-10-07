import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";

import fb from "/src/api/firebase";

import ls from "local-storage";
import { format } from "date-fns";

// User Components
import SendChicken from "./components/sendchicken";
import { CurrentKipBoiz, EnterKipName } from "./components/kipboiz";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUID = this.getUID.bind(this);

    this.state = {
      currentDate: format(new Date(), "MM-DD-YYYY")
    };
  }

  getUserInfo = () => {
    return Object.keys(this.props.users).find(
      key => this.props.users[key].name === ls("name")
    );
  };

  getUID = () => {
    return Object.keys(this.props.users).find(
      key => this.props.users[key].name === ls("name")
    );
  };

  render() {
    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} style={{ maxWidth: "28rem", height: "auto" }}>
          {this.props.users && (
            <SendChicken
              userID={this.getUID()}
              todayUsers={
                this.props.dates ? this.props.dates[this.state.currentDate] : []
              }
            />
          )}
        </Grid>
        <Grid item style={{ minWidth: "24rem" }}>
          <Grid container direction="column" spacing={16}>
            {!ls("name") || ls("name") === undefined ? (
              <Grid item xs={12}>
                <EnterKipName />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <CurrentKipBoiz
                todayUsers={
                  this.props.dates
                    ? this.props.dates[this.state.currentDate]
                    : []
                }
                allKipboiz={this.props.users}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

fb.on("value", snapshot => {
  const store = snapshot.val();
  ReactDOM.render(<App {...store} />, document.getElementById("app"));
});

if (module.hot) {
  module.hot.accept();
}
