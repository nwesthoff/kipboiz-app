import React, { Component } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
  IconButton,
  Button,
  CardContent,
  Typography,
  ListItemIcon,
  Divider,
  ListItemSecondaryAction,
  CardHeader
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

import ls from "local-storage";
import fb from "../api/firebase";
import { format } from "date-fns";
import ChangeNicknameDialog from "./changenickname";

export class EnterKipName extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  handleClick = e => {
    if (this.state.name && (this.state.name !== undefined || "")) {
      ls("name", this.state.name);
      console.log(this.props.users);
      if (
        !Object.values(this.props.users)
          .map(user => user.name)
          .includes(ls("name"))
      ) {
        fb.child("users").push({
          name: this.state.name
        });
      }
      location.reload();
    } else {
      window.alert("No valid kipboi name set!");
    }
  };

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <Card>
        <CardContent>
          <Typography variant="headline" component="h2">
            Set a name
          </Typography>
          <Typography variant="subheading" gutterBottom>
            You only have to do this once. Probably.
          </Typography>
          <Divider />
          <FormControl required fullWidth>
            <TextField
              label="What's your kipboi name?"
              type="name"
              margin="normal"
              variant="outlined"
              onChange={this.handleChange}
            />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            onClick={this.handleClick}
          >
            Save name
          </Button>
        </CardContent>
      </Card>
    );
  }
}

export class CurrentKipBoiz extends Component {
  constructor(props) {
    super(props);
    this.changeNickname = this.changeNickname.bind(this);

    this.state = {
      showNicknameDialog: false,
      selectedUser: {},
      currentDate: format(new Date(), "MM-DD-YYYY")
    };
  }

  changeNickname = user => {
    this.setState({
      showNicknameDialog: true,
      selectedUser: user
    });
  };

  render() {
    let kipboiInfo = [];
    let kipboiKeys = [];
    let kipboiArr = [];

    if (
      this.props.todayUsers &&
      Object.values(this.props.todayUsers).length > 0
    ) {
      kipboiInfo = this.props.allKipboiz;
      kipboiKeys = Object.values(this.props.todayUsers);

      kipboiArr = kipboiKeys.map(key => {
        kipboiInfo[key].key = key;
        return kipboiInfo[key];
      });
    }

    return (
      <div>
        <Card>
          <CardHeader
            title={`${kipboiArr.length} Kipboiz`}
            subheader={
              this.state.currentDate !== format(new Date(), "MM-DD-YYYY")
                ? "on " + this.state.currentDate
                : null
            }
            action={
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            }
          />
          <Divider />
          <CardContent>
            <List disablePadding>
              {kipboiArr.map(item => (
                <ListItem disableGutters key={`item-${item.key}`}>
                  <ListItemText
                    primary={`Kipboi ${item.name}`}
                    secondary={item.nickname && item.nickname}
                  />
                  <ListItemSecondaryAction
                    onClick={() => this.changeNickname(item)}
                  >
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
        {this.state.showNicknameDialog && (
          <ChangeNicknameDialog
            user={this.state.selectedUser}
            handleClose={() => {
              this.setState({ showNicknameDialog: false });
            }}
          />
        )}
      </div>
    );
  }
}
