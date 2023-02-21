import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import s from './AddItemForm.module.css'

type AddItemForm = {
    addItem: (title: string) => void
    disabled?: boolean
    description: string
}

export const AddItemForm = memo(({addItem, disabled, description}: AddItemForm) => {
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
        }
        if (error) {
            setError(false)
        }
    }

    return (
        <Box className={s.formWrapper}>
            <TextField
                value={value}
                onChange={onChangeHandler}
                onKeyDown={onEnterAddTask}
                size={'small'}
                label={error ? 'enter correct value' : `${description}`}
                color={error ? 'error' : 'primary'}
                className={s.inputSuper}
                disabled={disabled}
            />

            <Button
                onClick={onAddItem}
                // className={s.buttonSuper}
                variant={'contained'}
                disabled={disabled}
            >+</Button>
        </Box>
    )
})