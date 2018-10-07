import React, { Component } from "react";
import styled from "styled-components";

import chickenimage from "../assets/images/chicken.png";
import fb from "../api/firebase";
import { format } from "date-fns";

const SendChickenStyled = styled.a``;

export default class SendChicken extends Component {
  constructor(props) {
    super(props);

    this.findUID = this.findUID.bind(this);

    this.state = {
      clicked: false
    };
  }

  componentDidMount() {
    if (this.props.kipboiz && this.props.userName) {
      if (Object.keys(this.props.kipboiz).includes(this.props.userName)) {
        this.setState({ clicked: true });
      }
    }
  }

  findUID = () => {
    return Object.keys(this.props.kipboiz).find(
      key => this.props.kipboiz[key] === this.props.userName
    );
  };

  handleChickenClick = () => {
    const currentDate = format(new Date(), "MM-DD-YYYY");

    if (this.props.userName && (this.props.userName !== undefined || "")) {
      if (this.props.kipboiz && Object.keys(this.props.kipboiz)) {
        if (Object.values(this.props.kipboiz).includes(this.props.userName)) {
          // Unclicked
          fb.child(currentDate)
            .child("users")
            .child(this.findUID())
            .remove();
          this.setState({ clicked: false });
          window.alert("Noooo why do you leave us??!!!");
        } else {
          // Clicked
          this.setState({ clicked: true });
          fb.child(currentDate)
            .child("users")
            .push(this.props.userName, response => console.log(response));
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
