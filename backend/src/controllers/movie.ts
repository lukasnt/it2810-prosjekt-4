import express, { Router, Request, Response } from "express";
import { findSingleMovie, searchMovies } from "../data/movie";

const router : Router = express.Router();

// Endpoint for a single movie
router.get("/single/:tconst", (req : Request, res : Response) => {
    const tconst : string = req.params.tconst as string;

    findSingleMovie(tconst).then(result => {
        res.send(result);
    })
});

// Endpoint for search
router.get("/search", (req : Request, res : Response) => {
    // Format all the query-params
    let query : string = req.query.query as string;
    let filters : Array<string> = req.query.filters == undefined ? [] : parseStringArray(req.query.filters as string);
    let language : string = req.query.language == undefined ? "" : req.query.language as string;
    let runtimeMinutes : Array<number> = req.query.runtimeMinutes == undefined ? [] : parseNumberArray(req.query.runtimeMinutes as string);
    let orderField : string = req.query.orderField == undefined ? "voteCount" : req.query.orderField as string;
    let orderDir : number = req.query.orderDir == undefined ? -1 : parseInt(req.query.orderDir as string);
    let page : number = req.query.page == undefined ? 1 : parseInt(req.query.page as string);
    let pageSize : number = req.query.pageSize == undefined ? 25 : parseInt(req.query.pageSize as string);
    let callID : number = req.query.callID == undefined ? 0 : parseInt(req.query.callID as string);

    searchMovies(query, page, pageSize, orderField, orderDir, filters, language, runtimeMinutes).then(result => {
        res.send({ result: result, callID: callID });
    })
});


function parseStringArray(text : string) : Array<string> {
    return text.split(",");
}

function parseNumberArray(text : string) : Array<number> {
    return text.split(",").map(value => parseInt(value));
}


export default router;

