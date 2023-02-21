import React, {ChangeEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";

type EditableSpan = {
    value: string
    variant?: "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    changeValue: (value: string) => void
    disabled?: boolean
}

export const EditableSpan = memo(({value, changeValue, disabled, variant}: EditableSpan) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setValue] = useState(value)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onEditMode = () => {
        if (disabled) {
            return
        }
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

        : <Typography variant={variant} onDoubleClick={onEditMode}>{value}</Typography>
})