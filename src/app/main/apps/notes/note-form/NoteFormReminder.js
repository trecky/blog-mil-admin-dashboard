import React, {Fragment} from 'react';
import {Icon, IconButton} from '@material-ui/core';
import {DateTimePicker, MuiPickersUtilsProvider} from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const NoteFormReminder = ({reminder, onChange}) => {

    reminder = new Date(reminder);
    let picker = null;

    function handleOpen()
    {
        picker.open();
    }

    function handlePickerRef(node)
    {
        picker = node;
    }

    return (
        <Fragment>
            <IconButton
                className="w-32 h-32 mx-4 p-0"
                onClick={handleOpen}
            >
                <Icon fontSize="small">notifications_active</Icon>
            </IconButton>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                    className="hidden"
                    ref={handlePickerRef}
                    clearable
                    showTodayButton
                    disablePast
                    value={reminder}
                    onChange={onChange}
                    DialogProps={{
                        className: "prevent-add-close"
                    }}
                />
            </MuiPickersUtilsProvider>
        </Fragment>
    );
};

export default NoteFormReminder;
