import React from 'react';
import {List} from '@material-ui/core';
import classNames from 'classnames';
import NoteFormListItem from './NoteFormListItem';
import NoteFormAddListItem from './NoteFormAddListItem';

const NoteFormList = ({className, checklist, onCheckListChange}) => {

    function handleListItemChange(item)
    {
        onCheckListChange(checklist.map((_item) => _item.id === item.id ? item : _item));
    }

    function handleListItemRemove(id)
    {
        onCheckListChange(checklist.filter((_item) => _item.id !== id));
    }

    function handleListItemAdd(item)
    {
        onCheckListChange([...checklist, item]);
    }

    if ( !checklist )
    {
        return null;
    }

    return (
        <div className={classNames("", className)}>
            <List dense>
                {checklist.map(item => (
                    <NoteFormListItem
                        item={item}
                        key={item.id}
                        onListItemChange={handleListItemChange}
                        onListItemRemove={handleListItemRemove}
                    />
                ))}
                <NoteFormAddListItem onListItemAdd={handleListItemAdd}/>
            </List>
        </div>
    );
};

export default NoteFormList;
