import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CheckIcon from "@material-ui/icons/Check";
import SaveIcon from "@material-ui/icons/Save";

const axios = require("axios");

const styles = theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: "relative",
    marginTop: 24,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  fabProgress: {
    color: green[500],
    position: "absolute",
    top: -6,
    left: -6,
    zIndex: 1
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

class CircularIntegration extends React.Component {
  state = {
    loading: false,
    success: false,
    urlImage: 'https://api.netlify.com/api/v1/badges/e80eaed9-7558-4534-98ec-abafb5f9579e/deploy-status'
  };

  componentWillUnmount() {
    clearInterval(this.urlImage);
  }
  tickImg() {
    this.setState({ urlImage: this.state.urlImage + Math.random() });
  }


  handleButtonClick = () => {
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true
        },
        () => {
          axios
            .post(
              "https://api.netlify.com/build_hooks/5c99d349ff1d72078f0fa82c",
              {}
            )
            .then(function(response) {
              console.log(response);
              this.setState({
                loading: false,
                success: true,
                urlImage: this.state.urlImage + '?v='
              });
              this.imgID = setInterval(() => {
                this.tickImg();
              }, 5000);
            }.bind(this))
            .catch(function(error) {
              console.log(error);
            });

        }
      );
    }
  };

  render() {
    const { loading, success, urlImage } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames(
      {
        [classes.buttonSuccess]: success
      },
      "px-36"
    );
    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={this.handleButtonClick}
          >
            Deploy
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
        <a href="https://app.netlify.com/sites/blogmil/deploys"><img src={urlImage}/></a>
      </div>
    );
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIntegration);
