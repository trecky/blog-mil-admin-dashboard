import React, {Component} from 'react';
import {Typography, Select, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Icon} from '@material-ui/core';

class Widget7 extends Component {
    state = {
        currentRange: this.props.widget.currentRange
    };

    handleChangeSelect = (ev) => {
        this.setState({[ev.target.name]: ev.target.value});
    };

    render()
    {
        const {widget} = this.props;
        const {currentRange} = this.state;

        return (
            <Paper className="w-full rounded-8 shadow-none border-1">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                    <Typography className="text-16">{widget.title}</Typography>

                    <Select
                        native
                        value={this.state.currentRange}
                        onChange={this.handleChangeSelect}
                        inputProps={{
                            name: 'currentRange'
                        }}
                        disableUnderline={true}
                    >
                        {Object.entries(widget.ranges).map(([key, n]) => {
                            return (
                                <option key={key} value={key}>{n}</option>
                            )
                        })}
                    </Select>
                </div>
                <List>
                    {widget.schedule[currentRange].map(item =>
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.title}
                                secondary={item.time}
                            />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="more">
                                    <Icon>more_vert</Icon>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )}
                </List>
            </Paper>
        );
    }
}

export default Widget7;
