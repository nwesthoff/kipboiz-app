import React, { Component } from "react";
import styled from "styled-components";

import chickenimage from "../assets/images/chicken.png";
import fb from "../api/firebase";
import { format } from "date-fns";

const SendChickenStyled = styled.a``;

export default class SendChicken extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    };
  }

  componentDidMount() {
    if (this.props.todayUsers && this.props.userName) {
      if (Object.keys(this.props.todayUsers).includes(this.props.userName)) {
        this.setState({ clicked: true });
      }
    }
  }

  handleChickenClick = () => {
    const currentDate = format(new Date(), "MM-DD-YYYY");

    if (this.props.userID && (this.props.userID !== undefined || "")) {
      if (this.props.todayUsers && Object.keys(this.props.todayUsers)) {
        if (Object.values(this.props.todayUsers).includes(this.props.userID)) {
          // Unclicked
          fb.child("dates")
            .child(currentDate)
            .equalTo(this.props.userID)
            .once("value", snapshot => {
              snapshot.ref.remove();
            });
          this.setState({ clicked: false });
          window.alert("Noooo why do you leave us??!!!");
        } else {
          // Clicked
          this.setState({ clicked: true });
          fb.child("dates")
            .child(currentDate)
            .push(this.props.userID, response => console.log(response));
        }
      } else {
        window.alert("something went horribly wrong");
      }
    } else {
      // Error
      window.alert("No kipboi name set!");
    }
  };

  render() {
    return (
      <SendChickenStyled
        href="#"
        onClick={this.handleChickenClick}
        style={{ display: "flex", alignItems: "center", padding: "3rem" }}
      >
        <img
          src={chickenimage}
          alt="ChickenButton"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            filter: "drop-shadow(0px 0px 35px rgba(0,0,0,0.45))"
          }}
        />
      </SendChickenStyled>
    );
  }
}
