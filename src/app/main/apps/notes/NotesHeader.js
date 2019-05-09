import React, {Component} from 'react';
import {Hidden, Icon, IconButton, Tooltip, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions';
import NotesSearch from './NotesSearch';

class NotesHeader extends Component {

    render()
    {
        const {pageLayout, variateDescSize, toggleVariateDescSize} = this.props;

        return (
            <div className="flex flex-1 items-center justify-between p-8 sm:p-24 relative">

                <div className="flex flex-shrink items-center sm:w-224">
                    <Hidden lgUp>
                        <IconButton
                            onClick={(ev) => pageLayout().toggleLeftSidebar()}
                            aria-label="open left sidebar"
                        >
                            <Icon>menu</Icon>
                        </IconButton>
                    </Hidden>

                    <div className="flex items-center">
                        <FuseAnimate animation="transition.expandIn" delay={300}>
                            <Icon className="text-32 mr-12">account_box</Icon>
                        </FuseAnimate>
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography variant="h6" className="hidden sm:flex">Notes</Typography>
                        </FuseAnimate>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-end">
                    <Tooltip title="Toggle Variate Description Size">
                        <IconButton onClick={toggleVariateDescSize}>
                            <Icon color={variateDescSize ? "action" : "disabled"}>format_size</Icon>
                        </IconButton>
                    </Tooltip>
                    <NotesSearch/>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleVariateDescSize: Actions.toggleVariateDescSize
    }, dispatch);
}

function mapStateToProps({notesApp})
{
    return {
        variateDescSize: notesApp.notes.variateDescSize
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesHeader);
