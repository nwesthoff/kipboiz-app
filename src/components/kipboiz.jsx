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
  ListItemSecondaryAction
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import EditIcon from "@material-ui/icons/Edit";

import ls from "local-storage";
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
          <form>
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
          </form>
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
      selectedUser: {}
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
    } else {
      return (
        <Card>
          <CardContent>
            <Typography
              gutterBottom
              variant="headline"
              component="h2"
              gutterBottom
            >
              You're alone :(
            </Typography>
            <Divider />
            <Typography component="p">
              There are no kipboiz yet, you can be the one that starts it.
            </Typography>
            <Typography component="p" variant="body1">
              Click the Chicken!
            </Typography>
          </CardContent>
        </Card>
      );
    }

    return (
      <div>
        <Card>
          <CardContent>
            <Typography variant="headline" component="h2">
              {kipboiArr.length} Kipboiz
            </Typography>
            <Typography component="p" variant="body1" gutterBottom>
              Click the chicken to join the chickenfest!
            </Typography>
            <Divider />
            <List>
              {kipboiArr.map(item => (
                <ListItem key={`item-${item.key}`}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
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
