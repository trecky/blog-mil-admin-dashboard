import React, {Component} from 'react';
import {Slide, Dialog} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import _ from '@lodash';
import * as Actions from 'app/main/apps/notes/store/actions';
import NoteForm from 'app/main/apps/notes/note-form/NoteForm';

function Transition(props)
{
    return <Slide direction="up" {...props} />;
}

class NoteDialog extends Component {

    handleOnChange = _.debounce((note) => {
        this.props.updateNote(note);
    }, 600);

    handleOnRemove = (() => {
        this.props.removeNote(this.props.notes.noteDialogId);
    });

    render()
    {
        const {notes, closeNoteDialog} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "w-full m-24 rounded-8"
                }}
                TransitionComponent={Transition}
                onClose={closeNoteDialog}
                open={Boolean(notes.noteDialogId)}
            >
                <NoteForm note={notes.entities[notes.noteDialogId]} onChange={this.handleOnChange} onClose={closeNoteDialog} onRemove={this.handleOnRemove}/>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeNoteDialog: Actions.closeNoteDialog,
        updateNote     : Actions.updateNote,
        removeNote     : Actions.removeNote
    }, dispatch);
}

function mapStateToProps({notesApp})
{
    return {
        notes: notesApp.notes
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDialog);
