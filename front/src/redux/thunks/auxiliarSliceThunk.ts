import { IFiltersProp } from "@/interfaces/interfaceRedux"
import { fetchUsers } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setRootFilters, setRunFilters } from "../slices/tournamentSlice"
import { fetchGames } from "@/utils/fetchTournaments"
import { IGame } from "@/interfaces/interfaceTournaments"


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

// solicitud de juegos activos:
export const getGamesActivesSlice = createAsyncThunk('tournaments/getGames', async () => {
    const response = await fetchGames()
    const games = response.filter((game: IGame) => game.state === true)
    return response
})