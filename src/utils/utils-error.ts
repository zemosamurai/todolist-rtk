import {setError, setLoading} from "../store/slice/appSlice";
import {AppDispatchType} from "../store/store";
import {ResponseType} from "../api/todolist-api";

export const handleServerAppError = <T>(dispatch: AppDispatchType, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setError({error: data.messages[0]}))
    } else {
        dispatch(setError({error: 'Some Error'}))
    }
    dispatch(setLoading({status: 'failed'}))
}

export const handleServerNetworkError = (dispatch: AppDispatchType, error: string) => {
    dispatch(setError({error: error}))
    dispatch(setLoading({status: 'failed'}))
}
