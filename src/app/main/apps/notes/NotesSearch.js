import {Component} from 'react';
import {ClickAwayListener, Icon, IconButton, Input, Tooltip, withStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import React from 'react';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import classNames from 'classnames';
import * as Actions from './store/actions';

const propTypes = {};

const defaultProps = {
    trigger: (<IconButton className="w-64 h-64"><Icon>search</Icon></IconButton>)
};

const styles = theme => ({
    root        : {},
    inputWrapper: {
        backgroundColor: theme.palette.primary.dark
    }
});

class NotesSearch extends Component {

    state = {
        search: false
    };

    showSearch = () => {
        this.setState({search: true});
        document.addEventListener("keydown", this.escFunction, false);
    };

    hideSearch = () => {
        this.setState({
            search: false
        });
        this.props.resetSearchText();
        document.removeEventListener("keydown", this.escFunction, false);
    };

    escFunction = (event) => {
        if ( event.keyCode === 27 )
        {
            this.hideSearch();
        }
    };

    handleClickAway = event => {
        this.hideSearch();
    };

    render()
    {
        const {classes, className, setSearchText, searchText} = this.props;

        return (
            <div className={classNames(classes.root, "flex", className)}>

                <Tooltip title="Click to search" placement="bottom">
                    <div onClick={this.showSearch}>
                        {this.props.trigger}
                    </div>
                </Tooltip>

                {this.state.search && (
                    <ClickAwayListener onClickAway={this.handleClickAway}>

                        <div className={classNames(classes.inputWrapper, "absolute pin-l pin-r pin-t pin-b h-full z-9999 px-8 sm:px-24")}>

                            <div className="flex items-center w-full h-full" ref={this.handleRef}>

                                <Input
                                    placeholder="Search for anything"
                                    className="flex flex-1 py-0 pr-16 h-64"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={setSearchText}
                                    autoFocus
                                />

                                <IconButton onClick={this.hideSearch} className="mx-8">
                                    <Icon>close</Icon>
                                </IconButton>
                            </div>
                        </div>
                    </ClickAwayListener>
                )}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText  : Actions.setSearchText,
        resetSearchText: Actions.resetSearchText
    }, dispatch);
}

function mapStateToProps({notesApp})
{
    return {
        searchText: notesApp.notes.searchText
    }
}

NotesSearch.propTypes = propTypes;
NotesSearch.defaultProps = defaultProps;

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(NotesSearch)));
