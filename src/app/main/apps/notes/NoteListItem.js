import React from 'react';
import {Card, Typography, Icon} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';
import * as Actions from './store/actions';
import setDescriptionStyle from './setDescriptionStyle';
import NoteReminderLabel from './NoteReminderLabel';
import NoteLabel from './NoteLabel';

const NoteListItem = ({className, note, variateDescSize, openNoteDialog}) => {

    return (
        <FuseAnimate animation="transition.fadeIn" duration={400} delay={100}>
            <Card className={classNames("cursor-pointer", className)} onClick={() => openNoteDialog(note.id)}>
                {note.image && note.image !== "" && (
                    <img src={note.image} className="w-full block" alt="note"/>
                )}

                {note.title && note.title !== "" && (
                    <Typography className="p-16 pb-8 text-14 font-bold">
                        {note.title}
                    </Typography>
                )}

                {note.description && note.description !== "" && (
                    <Typography
                        className="py-8 px-16"
                        component="div"
                    >
                        <div
                            className={classNames("w-full break-words", variateDescSize ? "font-200" : "text-14")}
                            ref={el => {
                                setTimeout(() => setDescriptionStyle(note.description, el, variateDescSize));
                            }}>
                            {note.description}
                        </div>
                    </Typography>
                )}

                {note.checklist && note.checklist.length > 0 && (
                    <ul className="py-8 px-16 flex flex-wrap list-reset">
                        {note.checklist.map(item => (
                            <li key={item.id} className="flex items-center w-full">
                                <Icon color="action" className="mr-8 text-16">{item.checked ? "check_box_outline" : "check_box_outline_blank"}</Icon>
                                <Typography
                                    className={classNames("truncate", item.checked && "line-through")}
                                    color={item.checked ? "textSecondary" : "default"}
                                >
                                    {item.text}
                                </Typography>
                            </li>
                        ))}
                    </ul>
                )}

                {(note.labels.length > 0 || note.reminder) && (
                    <div className="py-8 px-16 flex flex-wrap w-full">
                        {note.reminder && (
                            <NoteReminderLabel className="mt-4 mr-4" date={note.reminder}/>
                        )}
                        {note.labels.map(id => (
                            <NoteLabel id={id} key={id} className="mt-4 mr-4" linkable/>
                        ))}
                    </div>
                )}
            </Card>
        </FuseAnimate>
    );
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        openNoteDialog: Actions.openNoteDialog
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(NoteListItem);
