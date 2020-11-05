import { createStore, combineReducers, Store } from "redux";
import { SearchResult, searchResultReducer } from "./reducers/searchresult";
import { SearchParams, searchParamsReducer } from "./reducers/searchparams";

export type AppState = {
    searchParams: SearchParams;
    searchResult: SearchResult | null;
};

//Utility-funksjon for å kombinere flere reducere
const rootReducer = combineReducers<AppState>({
    searchParams : searchParamsReducer,
    searchResult: searchResultReducer
});

function configureStore(): Store<AppState> {
    const store = createStore(rootReducer, undefined);
    return store;
}

//Oppretter en store
export const store = configureStore();