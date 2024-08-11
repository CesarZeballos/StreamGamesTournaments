import { IFiltersProp } from "@/interfaces/interfaceRedux"
import { fetchUsers } from "@/utils/fetchUser"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { setRootFilters, setRunFilters } from "../slices/tournamentSlice"
import { fetchGames, fetchUploadFile } from "@/utils/fetchTournaments"
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

// solicitud de juegos activos:
export const getAllGamesSlice = createAsyncThunk('tournaments/getAllGames', async () => {
    const response = await fetchGames()
    return response
})

// subida de archivos a la base de datos:
export const uploadFileSlice = createAsyncThunk('auxiliar/uploadFile', async (data: File) => {
    const response = await fetchUploadFile(data)
    return response
})