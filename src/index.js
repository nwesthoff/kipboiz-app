import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Grid } from "@material-ui/core";

import fb, { fbMessage } from "/src/api/firebase";

import ls from "local-storage";
import { format } from "date-fns";

// User Components
import SendChicken from "./components/sendchicken";
import { CurrentKipBoiz, EnterKipName } from "./components/kipboiz";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDate: format(new Date(), "MM-DD-YYYY")
    };
  }

  render() {
    return (
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item xs={12} style={{ maxWidth: "28rem", height: "auto" }}>
          <SendChicken
            userName={ls("name")}
            kipboiz={
              this.props[this.state.currentDate]
                ? this.props[this.state.currentDate].users
                : []
            }
          />
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
                kipboiz={
                  this.props[this.state.currentDate]
                    ? this.props[this.state.currentDate].users
                    : []
                }
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
