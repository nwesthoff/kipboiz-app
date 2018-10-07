import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  Button,
  TextField,
  DialogActions
} from "@material-ui/core";

import fb from "../api/firebase";

export default class ChangeNicknameDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname: ""
    };
  }

  saveNickname = key => {
    fb.child("users")
      .child(key)
      .update({ nickname: this.state.nickname }, response =>
        console.log(response)
      );
    this.handleClose();
  };

  handleClose = () => {
    this.props.handleClose();
  };

  handleChange = event => {
    this.setState({ nickname: event.target.value });
  };

  render() {
    return (
      <Dialog
        open={true}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          Change {this.props.user && this.props.user.name}
          's Nickname
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To change {this.props.user.name}
            's nickname, enter a new one and click save. It's that easy!
          </DialogContentText>
          <FormControl required fullWidth>
            <TextField
              label="What's the new nickname?"
              type="name"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="raised"
            color="primary"
            onClick={() => {
              this.saveNickname(this.props.user.key);
            }}
          >
            Save nickname
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
