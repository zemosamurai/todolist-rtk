import React, {ChangeEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';

type EditableSpan = {
    value: string
    changeValue: (value: string) => void
}

export const EditableSpan = memo(({value, changeValue}: EditableSpan) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setValue] = useState(value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onEditMode = () => {
        setEditMode(true)
    }
    const onViewMode = () => {
        setEditMode(false)
        changeValue(title)
    }

    return editMode
        ? <TextField
            value={title}
            onChange={onChangeHandler}
            onBlur={onViewMode}
            variant={'standard'}
            size={'small'}
            autoFocus/>

        : <span onDoubleClick={onEditMode}>{value}</span>
})