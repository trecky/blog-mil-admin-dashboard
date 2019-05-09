import React from 'react';
import {Icon, IconButton, Checkbox, ListItem, Input} from '@material-ui/core';
import classNames from 'classnames';
import _ from '@lodash';

const NoteFormListItem = ({item, onListItemChange, onListItemRemove}) => {

    function handleChange(event)
    {
        onListItemChange(_.setIn(item, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    }

    if ( !item )
    {
        return null;
    }

    return (
        <ListItem
            className="p-0"
            key={item.id}
            dense
        >
            <Checkbox
                className="p-0"
                checked={item.checked}
                tabIndex={-1}
                disableRipple
                name="checked"
                onChange={handleChange}
                color="default"
            />
            <Input
                className={classNames("flex flex-1 mx-8", item.checked && "line-through opacity-50")}
                name="text"
                value={item.text}
                onChange={handleChange}
                disableUnderline
            />
            <IconButton className="w-32 h-32 mx-4 p-0" aria-label="Delete" onClick={() => onListItemRemove(item.id)}>
                <Icon fontSize="small">delete</Icon>
            </IconButton>
        </ListItem>
    );
};

export default NoteFormListItem;
