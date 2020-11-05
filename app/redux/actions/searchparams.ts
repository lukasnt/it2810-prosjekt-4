
//Funksjoner som returnerer action-objekter
export function setQuery(query : string) {
    return {
        type: "SET_QUERY",
        payload: query
    } as const;
}

export function setGenres(filters : Array<string>) {
    return {
        type: "SET_GENRES",
        payload: filters
    } as const;
}

export function setLanguage(language : string) {
    return {
        type: "SET_LANGUAGE",
        payload: language
    } as const;
}

export function setRuntimeMinutes(runtimeMinutes : Array<number>) {
    return {
        type: "SET_RUNTIME_MINUTES",
        payload: runtimeMinutes
    } as const;
}

export function setOrderField(orderField : string) {
    return {
        type: "SET_ORDER_FIELD",
        payload: orderField
    } as const;
}

export function setOrderDir(orderDir : number) {
    return {
        type: "SET_ORDER_DIR",
        payload: orderDir
    } as const;
}

export function setPage(page : number) {
    return {
        type: "SET_PAGE",
        payload: page
    } as const;
}

export function setPageSize(pageSize : number) {
    return {
        type: "SET_PAGE_SIZE",
        payload: pageSize
    } as const;
}

export function setLoading(loading : boolean) {
    return {
        type: "SET_LOADING",
        payload: loading
    } as const;
}


export type SearchParamsActions = ReturnType<typeof setQuery> |
 ReturnType<typeof setGenres> |
 ReturnType<typeof setLanguage> |
 ReturnType<typeof setRuntimeMinutes> |
 ReturnType<typeof setOrderField> |
 ReturnType<typeof setOrderDir> |
 ReturnType<typeof setPage> |
 ReturnType<typeof setPageSize> |
 ReturnType<typeof setLoading>;
