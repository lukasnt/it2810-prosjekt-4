import { SearchParamsActions } from "../actions/searchparams";

//Typene brukt i state
export type SearchParams = {
    query : string;
    genres : Array<string>;
    language : string;
    runtimeMinutes : Array<number>;
    orderField : string;
    orderDir : number;
    page : number;
    pageSize : number;
    loading: boolean;
};

//Reducer-funksjonen, initialiserer store med searchParams
export function searchParamsReducer(state : SearchParams = {
    query : "",
    genres : [],
    language : "",
    runtimeMinutes : [],
    orderField : "voteCount",
    orderDir : -1,
    page : 1,
    pageSize : 18,
    loading: true
}, action: SearchParamsActions) { 

    let newState : SearchParams = { ...state }

    switch (action.type) {
        case "SET_QUERY":
            newState.query = action.payload;
            break;
        case "SET_GENRES":
            newState.genres = action.payload as Array<string>;
            break;
        case "SET_LANGUAGE":
            newState.language = action.payload as string;
            break;
        case "SET_RUNTIME_MINUTES":
            newState.runtimeMinutes = action.payload as Array<number>;
            break;
        case "SET_ORDER_FIELD":
            newState.orderField = action.payload as string;
            break;
        case "SET_ORDER_DIR":
            newState.orderDir = action.payload as number;
            break;
        case "SET_PAGE":
            newState.page = action.payload as number;
            break;
        case "SET_PAGE_SIZE":
            newState.pageSize = action.payload as number;
            break;
        case "SET_LOADING":
            newState.loading = action.payload as boolean;
            break;
        default:
            newState = state;
            break;
    }
    return newState;
}