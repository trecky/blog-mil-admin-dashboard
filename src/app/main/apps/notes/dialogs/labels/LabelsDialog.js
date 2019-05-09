import React, {Component} from 'react';
import {Typography, Dialog, ListItem, Input, IconButton, Icon, List} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import _ from '@lodash';
import * as Actions from 'app/main/apps/notes/store/actions';
import LabelModel from 'app/main/apps/notes/model/LabelModel';

class LabelsDialog extends Component {

    state = {
        labels      : this.props.labels,
        newLabelText: ""
    };

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(prevProps.labels, this.props.labels) &&
            !_.isEqual(this.state.labels, this.props.labels) )
        {
            this.setState({labels: this.props.labels});
        }

        if ( prevState.labels &&
            this.state.labels &&
            !_.isEqual(prevState.labels, this.state.labels) &&
            !_.isEqual(this.state.labels, this.props.labels)
        )
        {
            this.handleOnChange(this.state.labels);
        }
    }

    handleOnChange = _.debounce((labels) => {
        this.props.updateLabels(labels);
    }, 600);

    handleOnDelete = ((label) => {
        this.setState({labels: _.omit(this.state.labels, [label.id])});
    });

    handleLabelChange = (event, label) => {
        const updatedLabel = new LabelModel(_.setIn(label, event.target.name, event.target.value));
        this.setState({labels: _.setIn(this.state.labels, updatedLabel.id, updatedLabel)});
    };

    handleNewLabelChange = (event) => {
        this.setState({newLabelText: event.target.value});
    };

    handleNewLabel = () => {
        const newLabel = new LabelModel({name: this.state.newLabelText});
        this.setState({labels: _.setIn(this.state.labels, newLabel.id, newLabel)});
        this.setState({newLabelText: ""});
    };

    render()
    {
        const {closeLabelsDialog, labelsDialogOpen} = this.props;
        const {labels, newLabelText} = this.state;
        return (
            <Dialog
                classes={{
                    paper: "w-full max-w-320 p-16 m-24 rounded-8"
                }}
                onClose={closeLabelsDialog}
                open={labelsDialogOpen}
            >
                <Typography className="text-16 mb-8 font-600">Edit Labels</Typography>
                <List dense>
                    <ListItem
                        className="p-0 mb-16"
                        dense
                    >
                        <Icon className="list-item-icon text-16" color="action">add</Icon>
                        <Input
                            className={classNames("flex flex-1 mx-8")}
                            name="name"
                            value={newLabelText}
                            onChange={this.handleNewLabelChange}
                            placeholder="Create new label"
                        />
                        <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={this.handleNewLabel} disabled={newLabelText === ""}>
                            <Icon fontSize="small">check</Icon>
                        </IconButton>
                    </ListItem>
                    {Object.entries(labels).map(([key, label]) => (
                        <ListItem
                            className="p-0"
                            key={label.id}
                            dense
                        >
                            <Icon className="list-item-icon text-16" color="action">label</Icon>
                            <Input
                                className={classNames("flex flex-1 mx-8")}
                                name="name"
                                value={label.name}
                                onChange={(event) => this.handleLabelChange(event, label)}
                                disableUnderline
                            />
                            <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={(ev) => this.handleOnDelete(label)}>
                                <Icon fontSize="small">delete</Icon>
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        closeLabelsDialog: Actions.closeLabelsDialog,
        updateLabels     : Actions.updateLabels
    }, dispatch);
}

function mapStateToProps({notesApp})
{
    return {
        labels          : notesApp.labels.entities,
        labelsDialogOpen: notesApp.labels.labelsDialogOpen
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelsDialog);
