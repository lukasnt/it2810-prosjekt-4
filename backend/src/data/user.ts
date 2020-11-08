import { Document, model, Model, Schema } from "mongoose";
import { Movie } from "./movie";

export interface User {
    firstName : string;
    lastName : string;
    email : string;
    password : string;
    favorites : Array<Movie>;
}

export const UserSchema : Schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    favorites: Array
});

export interface UserDocument extends User, Document {};

// This is the UserModel that is used to make queries
export const UserModel = model<UserDocument>("user", UserSchema);

export function addUser(user : User) : void {
    UserModel.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        favorites: []
    }).catch(error => {
        if (error.code == 11000) console.log("Unable to add duplicate email.");
    });
};

export async function addFavorite(email : string, favorite : Movie) : Promise<void> {
    return UserModel.updateOne({ email: email }, { $push: { favorites: favorite } });
}

export async function removeFavorite(email : string, favorite : Movie) : Promise<void> {
    return UserModel.updateOne({ email: email }, { $pull: { favorites: { tconst: favorite.tconst } } });
}

export async function findUser(email : string) : Promise<User | null> {
    return UserModel.findOne({ "email": email }, (err, doc) => {
        return (doc == null ? null : doc as User);
    });
}

export async function getAllUsers() : Promise<Array<User>> {
    return UserModel.find({}, (err, docs) => {
        return docs;
    });
}

// This is just used for testing
// UserSchema.index({"$**": "text"}); // Only created once
export async function searchUsers(query : string) : Promise<Array<User>> {
    return UserModel.find(
        { $text: { $search: query} },
        { score: { $meta: "textScore" }})
    .sort({score: {$meta: 'textScore'}});
}