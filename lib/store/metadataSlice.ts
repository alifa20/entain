import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface MetadataState {
    lastChecked: number | null
}


const initialState: MetadataState = {
    lastChecked: null
}


export const metadataSlice = createSlice({
    name: 'metadata',
    initialState,
    reducers: {
        setLastChecked: (state, action: PayloadAction<number>) => {
            state.lastChecked = action.payload
        },
    },
})

export const { setLastChecked } = metadataSlice.actions

export const selectLastChecked = (state: RootState) => state.metadata.lastChecked

export default metadataSlice.reducer
