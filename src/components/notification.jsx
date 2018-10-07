import React, { Component } from "react";
import { Snackbar, SnackbarContent, Icon, IconButton } from "@material-ui/core";
import { CloseIcon } from "@material-ui/icons/Close";

function MySnackbarContent(props) {
  const { classes, message, onClose, variant } = props;

  return (
    <SnackbarContent
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar">
          <Icon />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
}

export default class Notification extends Component {
  render() {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          variant="success"
          message="This is a success message!"
        />
      </Snackbar>
    );
  }
}
