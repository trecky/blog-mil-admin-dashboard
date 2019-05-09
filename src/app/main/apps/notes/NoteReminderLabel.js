import React from 'react';
import {Chip, Icon} from '@material-ui/core';
import classNames from 'classnames';
import moment from 'moment';

const NoteLabel = (props) => {

    const {date, className, classes, onDelete} = props;

    if ( !date )
    {
        return null;
    }

    return (
        <Chip
            icon={<Icon className="text-16 mr-0">access_time</Icon>}
            label={moment(date).format('MMM DD YY, h:mm A')}
            classes={{
                root      : classNames("h-24", className),
                label     : "pl-4 pr-6 py-4 text-11",
                deleteIcon: "w-16 ml-0",
                ...classes
            }}
            variant="outlined"
            onDelete={onDelete}
        />
    );
};

export default NoteLabel;
