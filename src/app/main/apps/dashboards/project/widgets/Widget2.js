import React, {Component} from 'react';
import {Icon, Typography, Paper, IconButton} from '@material-ui/core';

class Widget2 extends Component {
    render()
    {
        const {widget} = this.props;

        return (
            <Paper className="w-full rounded-8 shadow-none border-1">
                <div className="flex items-center justify-between pr-4 pl-16 pt-4">
                    <Typography className="text-16">{widget.title}</Typography>
                    <IconButton aria-label="more">
                        <Icon>more_vert</Icon>
                    </IconButton>
                </div>
                <div className="text-center pt-12 pb-28">
                    <Typography
                        className="text-72 leading-none text-red">{widget.data.count}</Typography>
                    <Typography className="text-16" color="textSecondary">{widget.data.label}</Typography>
                </div>
                <div className="flex items-center px-16 h-52 border-t-1">
                    <Typography className="text-15 flex w-full" color="textSecondary">
                        <span className="truncate">{widget.data.extra.label}</span>
                        :
                        <b className="pl-8">{widget.data.extra.count}</b>
                    </Typography>
                </div>
            </Paper>
        );
    }
}

export default Widget2;
