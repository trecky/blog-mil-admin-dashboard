import React, {Component} from 'react';
import {Typography, Paper} from '@material-ui/core';
import {Doughnut} from 'react-chartjs-2';

class Widget8 extends Component {
    render()
    {
        const {widget} = this.props;

        return (
            <Paper className="w-full rounded-8 shadow-none border-1">
                <div className="flex items-center justify-between px-16 h-64 border-b-1">
                    <Typography className="text-16">{widget.title}</Typography>
                </div>
                <div className="h-400 w-full p-32">
                    <Doughnut
                        data={{
                            labels  : widget.mainChart.labels,
                            datasets: widget.mainChart.datasets
                        }}
                        options={widget.mainChart.options}
                    />
                </div>
            </Paper>
        );
    }
}

export default Widget8;
