import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";

import fb from "/src/api/firebase";

import ls from "local-storage";

// User Components
import SendChicken from "./components/sendchicken";
import { CurrentKipBoiz, EnterKipName } from "./components/kipboiz";

export default class App extends Component {
  render() {
    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} style={{ maxWidth: "28rem", height: "auto" }}>
          <SendChicken userName={ls("name")} kipboiz={this.props.users} />
        </Grid>
        <Grid item style={{ minWidth: "24rem" }}>
          <Grid container direction="column" spacing={16}>
            {!ls("name") || ls("name") === undefined ? (
              <Grid item xs={12}>
                <EnterKipName />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <CurrentKipBoiz kipboiz={this.props.users} />
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
