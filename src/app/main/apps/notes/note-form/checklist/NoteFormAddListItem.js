import React, {Component} from 'react';
import {Icon, ListItem, IconButton, Input} from '@material-ui/core';
import _ from '@lodash';
import NoteListItemModel from 'app/main/apps/notes/model/NoteListItemModel';

class NoteFormAddListItem extends Component {

    state = {
        text: ""
    };

    handleChange = (event) => {
        this.setState(_.setIn(this.state, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    submit = (ev) => {
        ev.preventDefault();
        const {text} = this.state;
        if ( text === '' )
        {
            return;
        }
        this.props.onListItemAdd(new NoteListItemModel({text}));
        this.setState({text: ''})
    };

    render()
    {
        return (
            <form onSubmit={this.submit}>
                <ListItem className="p-0" dense>
                    <IconButton
                        className="w-32 h-32 -ml-4 mr-4 p-0"
                        aria-label="Add"
                        type="submit"
                    >
                        <Icon fontSize="small">add</Icon>
                    </IconButton>
                    <Input
                        className="flex flex-1"
                        name="text"
                        value={this.state.text}
                        onChange={this.handleChange}
                        placeholder="Add an item"
                        disableUnderline
                        autoFocus
                    />
                </ListItem>
            </form>
        );
    }
}

export default NoteFormAddListItem;
