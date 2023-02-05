import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type AddItemForm = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemForm) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onAddItem = () => {
        if (value.trim() !== '') {
            addItem(value.trim())
            setValue('')
        } else {
            setError(true)
        }
    }
    const onEnterAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onAddItem()
        } else {
            error && setError(false)
        }
    }

    return (
        <div>
            <TextField
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onEnterAddTask}
                size={'small'}
                label={error ? 'enter correct value' : 'your title'}
                color={error ? 'error' : 'primary'}
                style={{maxWidth: '200px'}}
            />

            <Button
                onClick={onAddItem}
                style={{minHeight: '40px', minWidth: '40px', maxHeight: '40px', maxWidth: '40px'}}
                variant={'contained'}
            >+</Button>
        </div>
    )
}