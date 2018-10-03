import React, { Component } from "react";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
  Button,
  CardContent,
  Typography,
  ListItemIcon,
  Divider
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";

import ls from "local-storage";

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
  render() {
    let kipboiNames = [];
    let kipboiKeys = [];
    let kipboiArr = [];
    if (this.props.kipboiz) {
      kipboiNames = Object.values(this.props.kipboiz);
      kipboiKeys = Object.keys(this.props.kipboiz);
      kipboiArr = kipboiKeys.map((key, i) => {
        return { key: key, name: kipboiNames[i] };
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
            {
              //TO:DO count
            }
            {kipboiArr.map(item => (
              <ListItem key={`item-${item.key}`}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={`Kipboi ${item.name}`} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    );
  }
}
