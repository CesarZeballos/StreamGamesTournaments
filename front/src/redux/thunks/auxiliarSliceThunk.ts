import { IFiltersProp } from "@/interfaces/interfaceRedux"
import { fetchUsers } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setRootFilters, setRunFilters } from "../slices/tournamentSlice"


export const getUsersSlice = createAsyncThunk('auxiliar/getUsers', async () => {
    const response = await fetchUsers()
    return response
})

// ejecucion los filtros:


export const filtered = createAsyncThunk(
    'tournament/setRootFilters', 
    async (props: IFiltersProp, { dispatch }) => {
    dispatch(setRootFilters(props))
    dispatch(setRunFilters())
    return
})

export default { getUsersSlice, filtered }