import { SearchResult } from "../reducers/searchresult";

//Funksjoner som returnerer action-objekter
export function setSearchResult(result : SearchResult) {
    return {
        type: "SET_SEARCH_RESULT",
        payload: result
    } as const;
}
export function clearSearchResult() {
    return {
        type: "CLEAR_SEARCH_RESULT"
    } as const;
}
export type SearchResultActions = ReturnType<typeof clearSearchResult> | ReturnType<typeof setSearchResult>;
