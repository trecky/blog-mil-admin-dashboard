import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {FuseUtils} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import Masonry from 'react-masonry-css';
import * as Actions from './store/actions';
import NoteListItem from './NoteListItem';

class NoteList extends Component {

    state = {
        selectedNotesMenu: null,
        data             : []
    };

    static getDerivedStateFromProps(props)
    {
        const {notes, searchText, match} = props;
        const {params} = match;
        const {id, labelId} = params;

        let data = Object.keys(notes).map((id) => notes[id]);

        if ( labelId )
        {
            data = data.filter((note) => note.labels.includes(labelId) && !note.archive);
        }

        if ( !id )
        {
            data = data.filter((note) => !note.archive);
        }

        if ( id === "archive" )
        {
            data = data.filter((note) => note.archive);
        }

        if ( id === "reminders" )
        {
            data = data.filter((note) => Boolean(note.reminder) && !note.archive);
        }

        if ( searchText.length === 0 )
        {
            return {data};
        }

        data = FuseUtils.filterArrayByString(data, searchText);

        return {
            data
        }
    }

    render()
    {
        const {variateDescSize} = this.props;
        const {data} = this.state;

        if ( !data || data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no notes!
                    </Typography>
                </div>
            );
        }

        return (
            <div className="flex flex-wrap w-full">
                <Masonry
                    breakpointCols={{
                        default: 6,
                        1920   : 5,
                        1600   : 4,
                        1366   : 3,
                        1280   : 4,
                        960    : 3,
                        600    : 2,
                        480    : 1
                    }}
                    className="my-masonry-grid flex w-full"
                    columnClassName="my-masonry-grid_column flex flex-col p-8">

                    {data.map(note => (
                        <NoteListItem
                            key={note.id}
                            note={note}
                            className="w-full rounded-8 shadow-none border-1 mb-16"
                            variateDescSize={variateDescSize}
                        />
                    ))}
                </Masonry>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getNotes       : Actions.getNotes,
        openNoteDialog : Actions.openNoteDialog,
        closeNoteDialog: Actions.closeNoteDialog,
        removeNote     : Actions.removeNote
    }, dispatch);
}

function mapStateToProps({notesApp})
{
    return {
        notes          : notesApp.notes.entities,
        variateDescSize: notesApp.notes.variateDescSize,
        searchText     : notesApp.notes.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NoteList));
