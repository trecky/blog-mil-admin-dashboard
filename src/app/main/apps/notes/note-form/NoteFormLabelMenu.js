import React, {Component} from 'react';
import {Popover, ClickAwayListener, IconButton, Icon, List, ListItem, ListItemText} from '@material-ui/core';
import {connect} from 'react-redux';
import _ from '@lodash';

class NoteFormLabelMenu extends Component {
    state = {
        anchorEl: null
    };

    handleMenuClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    handleToggleLabel = (id) => {
        this.props.onChange(_.xor(this.props.note.labels, [id]));
    };

    render()
    {
        const {anchorEl} = this.state;
        const {labels, note} = this.props;

        return (
            <div>
                <IconButton className="w-32 h-32 mx-4 p-0" onClick={this.handleMenuClick}>
                    <Icon fontSize="small">label</Icon>
                </IconButton>
                <Popover
                    hideBackdrop={true}
                    open={Boolean(anchorEl)}
                    anchorEl={anchorEl}
                    onClose={this.handleMenuClose}
                    anchorOrigin={{
                        vertical  : 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical  : 'top',
                        horizontal: 'center'
                    }}
                    className="pointer-events-none"
                    classes={{
                        paper: "pointer-events-auto py-8 prevent-add-close"
                    }}
                >
                    <ClickAwayListener onClickAway={this.handleMenuClose}>
                        <List className="p-0">
                            {Object.entries(labels).map(([key, label]) => (
                                <ListItem
                                    key={label.id}
                                    button
                                    dense
                                    onClick={() => this.handleToggleLabel(label.id)}
                                >
                                    <Icon className="list-item-icon text-16" color="action">
                                        {note.labels.includes(label.id) ? "check_box" : "check_box_outline_blank"}
                                    </Icon>
                                    <ListItemText className="truncate pl-8" primary={label.name} disableTypography={true}/>
                                </ListItem>
                            ))}
                        </List>
                    </ClickAwayListener>
                </Popover>
            </div>
        );
    }
}

function mapStateToProps({notesApp})
{
    return {
        labels: notesApp.labels.entities
    }
}

export default connect(mapStateToProps)(NoteFormLabelMenu);

