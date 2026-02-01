import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import categoryReducer from "./categorySlice";
import metadataReducer from "./metadataSlice";
import liveRacesReducer from "./liveRacesSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      category: categoryReducer,
      metadata: metadataReducer,
      liveRaces: liveRacesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
