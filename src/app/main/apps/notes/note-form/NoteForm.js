import React, {Component, Fragment} from 'react';
import {Tooltip, Button, Icon, Input, Typography, IconButton, Fab} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import moment from 'moment';
import _ from '@lodash';
import {withRouter} from 'react-router-dom';
import NoteReminderLabel from 'app/main/apps/notes/NoteReminderLabel';
import NoteLabel from 'app/main/apps/notes/NoteLabel';
import NoteModel from 'app/main/apps/notes/model/NoteModel';
import NoteFormList from './checklist/NoteFormList';
import NoteFormReminder from './NoteFormReminder';
import NoteFormUploadImage from './NoteFormUploadImage';
import NoteFormLabelMenu from './NoteFormLabelMenu';

const propTypes = {};

const defaultProps = {
    variant: "edit",
    note   : null
};

class NoteForm extends Component {

    state = {
        note    : _.merge(
            {},
            new NoteModel(),
            this.props.note,
            this.props.match.params.labelId ? {labels: [this.props.match.params.labelId]} : null,
            this.props.match.params.id === "archive" ? {archive: true} : null
        ),
        showList: false
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( prevState.note &&
            this.state.note &&
            !_.isEqual(prevState.note, this.state.note) &&
            this.props.onChange
        )
        {
            this.props.onChange(this.state.note);
        }
    }

    handleChange = (event) => {
        this.setState(_.setIn(this.state, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    handleOnCreate = (event) => {
        if ( !this.props.onCreate )
        {
            return;
        }
        this.props.onCreate(this.state.note);
    };

    handleToggleList = () => {
        this.setState({showList: !this.state.showList});
    };

    handleDateChange = date => {
        this.setState(_.setIn(this.state, "note.reminder", date));
    };

    handleChecklistChange = checklist => {
        this.setState(_.setIn(this.state, `note.checklist`, checklist));
    };

    handleRemoveLabel = id => {
        this.setState(_.setIn(this.state, `note.labels`, this.state.note.labels.filter(_id => _id !== id)));
    };

    handleLabelsChange = labels => {
        this.setState(_.setIn(this.state, `note.labels`, labels));
    };

    handleRemoveImage = e => {
        this.setState(_.setIn(this.state, `note.image`, ""));
    };

    handleArchiveToggle = e => {
        this.setState(_.setIn(this.state, `note.archive`, !this.state.archive));
        if ( this.props.variant === "new" )
        {
            setTimeout(() => this.handleOnCreate());
        }
    };

    handleUploadChange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsBinaryString(file);

        reader.onload = () => {
            this.setState(_.setIn(this.state, `note.image`, `data:${file.type};base64,${btoa(reader.result)}`));
        };

        reader.onerror = function () {
            console.log("error on load image");
        };
    };

    newFormButtonDisabled()
    {
        const note = this.state.note;
        return note.title === "" && note.image === "" && note.description === "" && note.checklist.length === 0;
    }

    render()
    {
        const {note, showList} = this.state;
        const {variant} = this.props;

        if ( !note )
        {
            return null;
        }

        return (
            <div className="flex flex-col w-full">
                <FuseScrollbars className="flex flex-auto w-full max-h-640">
                    <div className="w-full">
                        {note.image && note.image !== "" && (
                            <div className="relative">
                                <img src={note.image} className="w-full block" alt="note"/>
                                <Fab
                                    className="absolute pin-r pin-b m-8"
                                    variant="extended"
                                    size="small"
                                    color="secondary"
                                    aria-label="Delete Image"
                                    onClick={this.handleRemoveImage}
                                >
                                    <Icon fontSize="small">delete</Icon>
                                </Fab>
                            </div>
                        )}
                        <div className="p-16 pb-12">
                            <Input
                                className="font-bold"
                                placeholder="Title"
                                type="text"
                                name="note.title"
                                value={note.title}
                                onChange={this.handleChange}
                                disableUnderline
                                fullWidth
                            />
                        </div>
                        <div className="p-16 pb-12">
                            <Input
                                placeholder="Take a note..."
                                multiline
                                rows="4"
                                name="note.description"
                                value={note.description}
                                onChange={this.handleChange}
                                disableUnderline
                                fullWidth
                                autoFocus
                            />
                        </div>

                        {(note.checklist.length > 0 || showList) && (
                            <div className="px-16">
                                <NoteFormList checklist={note.checklist} onCheckListChange={this.handleChecklistChange}/>
                            </div>
                        )}

                        {(note.labels || note.reminder || note.time) && (
                            <div className="flex flex-wrap w-full p-16 pb-12">
                                {note.reminder && (
                                    <NoteReminderLabel className="mt-4 mr-4" date={note.reminder}/>
                                )}
                                {note.labels && note.labels.map(id => (
                                    <NoteLabel id={id} key={id} className="mt-4 mr-4" onDelete={() => this.handleRemoveLabel(id)}/>
                                ))}
                                {note.time && (
                                    <Typography color="textSecondary" className="text-12 ml-auto mt-8 mr-4">
                                        Edited: {moment(note.time).format('MMM DD YY, h:mm A')}
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                </FuseScrollbars>

                <div className="flex flex-auto justify-between items-center h-48">
                    <div className="flex items-center px-4">

                        <Tooltip title="Remind me" placement="bottom">
                            <div>
                                <NoteFormReminder reminder={note.reminder} onChange={this.handleDateChange}/>
                            </div>
                        </Tooltip>

                        <Tooltip title="Add image" placement="bottom">
                            <div>
                                <NoteFormUploadImage onChange={this.handleUploadChange}/>
                            </div>
                        </Tooltip>

                        <Tooltip title="Add checklist" placement="bottom">
                            <IconButton className="w-32 h-32 mx-4 p-0" onClick={this.handleToggleList}>
                                <Icon fontSize="small">playlist_add_check</Icon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Change labels" placement="bottom">
                            <div>
                                <NoteFormLabelMenu note={note} onChange={this.handleLabelsChange}/>
                            </div>
                        </Tooltip>

                        <Tooltip title={note.archive ? "Unarchive" : "Archive"} placement="bottom">
                            <div>
                                <IconButton className="w-32 h-32 mx-4 p-0" onClick={this.handleArchiveToggle} disabled={this.newFormButtonDisabled()}>
                                    <Icon fontSize="small">
                                        {note.archive ? "unarchive" : "archive"}
                                    </Icon>
                                </IconButton>
                            </div>
                        </Tooltip>
                    </div>
                    <div className="flex items-center px-4">
                        {variant === "new" ? (
                            <Button
                                className="m-4"
                                onClick={this.handleOnCreate}
                                variant="outlined"
                                size="small"
                                disabled={this.newFormButtonDisabled()}
                            >
                                Create
                            </Button>
                        ) : (
                            <Fragment>
                                <Tooltip title="Delete Note" placement="bottom">
                                    <IconButton className="w-32 h-32 mx-4 p-0" onClick={this.props.onRemove}>
                                        <Icon fontSize="small">delete</Icon>
                                    </IconButton>
                                </Tooltip>
                                <Button
                                    className="m-4"
                                    onClick={this.props.onClose}
                                    variant="outlined"
                                    size="small"
                                >
                                    Close
                                </Button>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

NoteForm.propTypes = propTypes;
NoteForm.defaultProps = defaultProps;

export default withRouter(NoteForm);
