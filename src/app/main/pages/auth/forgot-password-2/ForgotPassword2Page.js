import React, {Component} from 'react';
import {withStyles, Button, Card, CardContent, TextField, Typography} from '@material-ui/core';
import {darken} from '@material-ui/core/styles/colorManipulator';
import {FuseAnimate} from '@fuse';
import classNames from 'classnames';
import {Link} from 'react-router-dom';
import _ from '@lodash';

const styles = theme => ({
    root : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + darken(theme.palette.primary.dark, 0.5) + ' 100%)',
        color     : theme.palette.primary.contrastText
    }
});

class ForgotPassword2Page extends Component {

    state = {
        email: ''
    };

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    canBeSubmitted()
    {
        const {email} = this.state;
        return (
            email.length > 0
        );
    }

    render()
    {
        const {classes} = this.props;
        const {email} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div className="flex flex-col flex-no-grow items-center text-white p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left">

                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo"/>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
              Blog MIL Dashboard
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate delay={400}>
                        <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel convallis elit fermentum pellentesque. Sed mollis velit
                            facilisis facilisis.
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="md:w-full mb-32">RECOVER YOUR PASSWORD</Typography>

                            <form name="recoverForm" noValidate className="flex flex-col justify-center w-full">

                                <TextField
                                    className="mb-16"
                                    label="Email"
                                    autoFocus
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    required
                                    fullWidth
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="w-224 mx-auto mt-16"
                                    aria-label="Reset"
                                    disabled={!this.canBeSubmitted()}
                                >
                                    SEND RESET LINK
                                </Button>

                            </form>

                            <div className="flex flex-col items-center justify-center pt-32 pb-24">
                                <Link className="font-medium" to="/pages/auth/login-2">Go back to login</Link>
                            </div>

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ForgotPassword2Page);
