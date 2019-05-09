import React, {Component} from 'react';
import {withStyles, ClickAwayListener, Paper, Typography} from '@material-ui/core';
import classNames from 'classnames';
import {bindActionCreators} from 'redux';
import * as Actions from 'app/main/apps/notes/store/actions';
import {connect} from 'react-redux';
import NoteForm from './note-form/NoteForm';

const styles = theme => ({
    button: {
        cursor: 'text'
    }
});

class NewNote extends Component {
    state = {
        formOpen: false
    };

    handleFormOpen = () => {
        this.setState({formOpen: true});
        document.addEventListener("keydown", this.escFunction, false);
    };

    handleFormClose = () => {
        if ( !this.state.formOpen )
        {
            return;
        }
        this.setState({formOpen: false});
        document.removeEventListener("keydown", this.escFunction, false);
    };

    handleCreate = (note) => {
        this.props.createNote(note);
        this.handleFormClose();
    };

    escFunction = (event) => {
        if ( event.keyCode === 27 )
        {
            this.handleFormClose();
        }
    };
    handleClickAway = (ev) => {
        const preventCloseElements = document.querySelector(".prevent-add-close");
        const preventClose = preventCloseElements ? preventCloseElements.contains(ev.target) : false;
        if ( preventClose )
        {
            return;
        }
        this.handleFormClose();
    };

    render()
    {
        const {classes} = this.props;
        const {formOpen} = this.state;

        return (
            <ClickAwayListener onClickAway={this.handleClickAway}>
                <Paper
                    className={classNames(classes.button, "flex items-center w-full max-w-512 mt-8 mb-16 min-h-48")}
                    elevation={1}
                >
                    {formOpen ? (
                        <NoteForm onCreate={this.handleCreate} variant="new"/>
                    ) : (
                        <Typography
                            className="w-full px-16 py-12 font-500 text-16 w-full"
                            color="textSecondary"
                            onClick={this.handleFormOpen}
                        >
                            Take a note..
                        </Typography>
                    )}
                </Paper>
            </ClickAwayListener>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        createNote: Actions.createNote
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(withStyles(styles, {withTheme: true})(NewNote));
