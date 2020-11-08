import { Document, model, Schema } from "mongoose";

export interface Movie {
    tconst : string;
    titleType : string;
    primaryTitle : string;
    originalTitle : string;
    isAdult : string;
    startYear : number;
    endYear : string;
    runtimeMinutes : number;
    genres : Array<string>;
    posterPath : string;
    voteAverage : number;
    voteCount : number;
    originalLanguage : string;
    overview : string;
}

export const MovieSchema : Schema = new Schema({
    tconst : String,
    titleType : String,
    primaryTitle : String,
    originalTitle : String,
    isAdult : String,
    startYear : Number,
    endYear : String,
    runtimeMinutes : Number,
    genres : Array,
    posterPath : String,
    voteAverage : Number,
    voteCount : Number,
    originalLanguage : String,
    overview : String
});
// This is code that is run once to create text index on title fields used in search
//MovieSchema.index({primaryTitle: 'text', originalTitle: 'text'}); // Only created once
//MovieSchema.index({"$**": "text"}); // Only created once

export interface MovieDocument extends Movie, Document {};

// This is the MovieModel that is used to make queries
export const MovieModel = model<MovieDocument>("movies", MovieSchema);

// Interface for the result that is returned by a search
export interface SearchResult {
    movies : Array<Movie>;
    pages : number;
}

// Finds a single movie with given tconst (id)
export async function findSingleMovie(tconst : string) : Promise<Movie | null> {
    return MovieModel.findOne({ tconst: tconst });
}

// Searches for movies and returns result based on the parameters
export async function searchMovies(
     query : string,
     page : number = 1,
     pageSize : number = 50,
     orderField : string = "voteCount",
     orderDir : number = -1,
     filters : Array<string> = [],
     language : string = "",
     runtimeMinutes : Array<number> = []) : Promise<SearchResult>
{
    // Initialize the queries
    let mongoQuery : any = { };
    let mongoProjection : any = { };

    // Set the queries based on the parameters
    if (query != "") {
        mongoQuery.$text = { $search: query };
        mongoProjection.score = { $meta: "textScore" };
    } else {
        orderField = orderField == "relevance" ? "voteCount" : orderField;
    }
    if (filters[0] != "") mongoQuery.genres = { $all: filters };
    if (language != "") mongoQuery.originalLanguage = language;
    if (runtimeMinutes.length == 2) mongoQuery.runtimeMinutes = { $gt: runtimeMinutes[0], $lt: runtimeMinutes[1]};

    // Find the movies in the databse based on the queries set
    return MovieModel.find(
        mongoQuery,
        mongoProjection)
    .sort(getSortOrder(orderField, orderDir))   // Sorting / Ranking the result
    .skip((page - 1) * pageSize)    // Used for paging
    .limit(pageSize)                // Used for paging
    .then(movies => {
        // This is a second query to get the amount of pages
        return MovieModel.find(mongoQuery, mongoProjection).countDocuments().then(count => {
            return { movies: movies, pages: Math.ceil(count / pageSize)};
        })
    });
}

// Helper function get the sort order
function getSortOrder(field : string, dir : number) : any {
    if (field.toLocaleLowerCase() == "relevance")
        return { score: { $meta: "textScore" }};
    else
        return JSON.parse("{ \"" + field + "\" : " + dir.toString() + "}");
}

// This is a helper-function that is used if we want AND-ed search instead of OR-ed search
function preprocessQuery(query : string) : string {
    if (query == "") return query;
    return query.split(" ")
        .map(term => "\"" + term + "\"")
        .reduce((prev, current, index, array) => prev + " " + current);   
}

/*
// This function was in use when genres was a single string
function getAllFilterPermutations(filters : Array<string>) : Array<string> {
    let result : Array<string> = [];
    if (filters.length == 1) return filters;
    for (let i = 0; i < filters.length; i++) {
        let perms : Array<string> = getAllFilterPermutations(filters.slice(0, i).concat(filters.slice(i + 1, filters.length)));

        for (let j = 0; j < perms.length; j++) {
            perms[j] = filters[i] + "," + perms[j];
        }
        result = result.concat(perms);
    }
    return result;
}
*/

/*
// Ad hoc query to get all the languages in a text-file, so that I can copy paste it to moviePage in frontend
let fs = require('fs');
    MovieModel.aggregate([{$group: {
        _id: {originalLanguage: "$originalLanguage"},
        count: { $sum: 1 }
    }}]).then(data => data.map(d => "\"" + d._id.originalLanguage + "\" ")).then(data => fs.writeFile("languages.txt", data, (err : Error) => {console.log(err)}));
*/