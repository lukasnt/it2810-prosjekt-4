import { store } from "../redux/store";
import { setLoading } from "../redux/actions/searchparams";
import { appendSearchResult, setSearchResult } from "../redux/actions/searchresult";
import { SearchParams } from "../redux/reducers/searchparams";


export const backendURL : string = "http://it2810-24.idi.ntnu.no:3000";

// Taken from MDN
// Example POST method implementation:
export async function postData(url = '', data = {}, token = "", method = "POST") : Promise<Response> {
  // Default options are marked with *
  return fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
}

// callID is a incremented value that is used to check if the recieved result is from the latest call
// (so that it doesn't have to update the state multiple times if there were sent multiple calls (f.ex somone spamming some buttons))
let callID : number = 0;

// Here is the function that makes api call to backend for search
// It takes the state of searchParams in redux and sends with the appropriate params in the call
// Then it takes the result and sets the SearchResult state (which will be reflected in SearchPage)
export async function executeSearch(state : SearchParams) : Promise<void> {
    if (!state.loading) store.dispatch(setLoading(true));
    
    const currentPage : number = state.page;
    callID++;
    return fetch(backendURL + "/api/movie/search?" + 
        "query=" + state.query + "&" +
        "filters=" + state.genres + "&" +
        "language=" + state.language + "&" +
        "runtimeMinutes=" + state.runtimeMinutes + "&" +
        "orderField=" + state.orderField + "&" +
        "orderDir=" + state.orderDir + "&" +
        "page=" + state.page + "&" +
        "pageSize=" + state.pageSize + "&" +
        "callID=" + callID)
        .then(res => res.json())
        .then(data => {
            if (data.callID === callID) {
                if (currentPage > 1)
                  store.dispatch(appendSearchResult(data.result));
                else
                  store.dispatch(setSearchResult(data.result));
                
                store.dispatch(setLoading(false));
            }
        });
}