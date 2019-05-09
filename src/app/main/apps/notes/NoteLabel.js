import React from 'react';
import {Chip} from '@material-ui/core';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

const NoteLabel = (props) => {

    const {labels, id, className, classes, onDelete, linkable} = props;

    if ( !labels )
    {
        return null;
    }

    const label = labels[id];

    if ( !label )
    {
        return null;
    }

    const linkProps = linkable ? {
        component: Link,
        onClick  : ev => {
            ev.stopPropagation();
        },
        to       : `/apps/notes/labels/${label.handle}/${label.id}`
    } : {};

    return (
        <Chip
            {...linkProps}
            label={label.name}
            classes={{
                root      : classNames("h-24", className),
                label     : "px-6 py-4 text-11",
                deleteIcon: "w-16 ml-0",
                ...classes
            }}
            variant="outlined"
            onDelete={onDelete}
        />
    );
};

function mapStateToProps({notesApp})
{
    return {
        labels: notesApp.labels.entities
    }
}

export default connect(mapStateToProps)(NoteLabel);
