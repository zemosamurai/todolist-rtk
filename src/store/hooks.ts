import {useDispatch, useSelector} from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'
import type {AppDispatchType, RootStateType,} from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector