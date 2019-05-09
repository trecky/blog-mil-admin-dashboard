import React, {Component} from 'react';
import {Typography, Select, Paper} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';
import _ from 'lodash';

class Widget6 extends Component {
    state = {
        currentRange: this.props.widget.currentRange
    };

    handleChangeSelect = (ev) => {
        this.setState({[ev.target.name]: ev.target.value});
    };

    render()
    {
        const {widget: widgetRaw} = this.props;
        const {currentRange} = this.state;
        const widget = _.merge({}, widgetRaw);

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
                <div className="h-400 w-full p-32">
                    <Doughnut
                        data={{
                            labels  : widget.mainChart.labels,
                            datasets: widget.mainChart.datasets[currentRange]
                        }}
                        options={widget.mainChart.options}
                    />
                </div>
                <div className="flex items-center p-8 border-t-1">
                    <div className="flex flex-1 flex-col items-center justify-center p-16 border-r-1">
                        <Typography className="text-32 leading-none">
                            {widget.footerLeft.count[currentRange]}
                        </Typography>
                        <Typography className="text-15" color="textSecondary">
                            {widget.footerLeft.title}
                        </Typography>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center p-16">
                        <Typography className="text-32 leading-none">
                            {widget.footerRight.count[currentRange]}
                        </Typography>
                        <Typography className="text-15" color="textSecondary">
                            {widget.footerRight.title}
                        </Typography>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default Widget6;
