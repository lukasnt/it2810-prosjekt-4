import { SearchResultActions } from "../actions/searchresult";

//Typene brukt i state
export type Movie = {
    tconst : string;
    titleType : string;
    primaryTitle : string;
    originalTitle : string;
    isAdult : string;
    startYear : number;
    endYear : string;
    runtimeMinutes : number;
    genres : string;
    posterPath : string;
    voteAverage : number;
    voteCount : number;
    originalLanguage : string;
    overview : string;
};

export type SearchResult = {
    movies : Array<Movie>;
    pages : number;
}

//Reducer-funksjonen, initialiserer store med searchResult
export function searchResultReducer(state : SearchResult | null = null, action: SearchResultActions) {
    switch (action.type) {
        case "SET_SEARCH_RESULT":
            return state = action.payload;
        case "APPEND_SEARCH_RESULT":
            if (state != null) {
                state.movies.push(...action.payload.movies);
                state.movies = state.movies.filter((value, index, array) => 
                    array.findIndex(v => v.tconst === value.tconst) === index);
                return state;
            }
        case "CLEAR_SEARCH_RESULT":
            return state = { movies: [], pages: 0 };
        default:
            neverReached(action);
    }
    return state;
}
function neverReached(never: never) {}