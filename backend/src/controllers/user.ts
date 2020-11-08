import express, { Router, Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { addFavorite, addUser, findUser, removeFavorite, User } from "../data/user";

const router : Router = express.Router();

// Authentication example is inspired by: https://stackabuse.com/handling-authentication-in-express-js/
router.post("/register", (req : Request, res : Response, next : NextFunction) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    // Check if the password and confirm password fields match
    if (password === confirmPassword && password !== "") {

        // Check if user with the same email is also registered
        
        findUser(req.body.email)
            .then(user => {
                if (user) {
                    res.sendStatus(403);
                    next();
                } else {
                    const hashedPassword : string = getHashedPassword(password);

                    // Store user into the database
                    addUser({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                        favorites: []
                    });

                    res.sendStatus(200);
                }
            });
    } else {
        res.sendStatus(403);
    }
});

router.post('/login', (req : Request, res : Response) => {
    const { email, password } = req.body;
    const hashedPassword : string = getHashedPassword(password);
    
    findUser(email).then(user => {
        if (user != null && user.password == hashedPassword) {
            // Remove tokens already in use
            removeTokens(user);
            
            const authToken = generateAuthToken();
    
            // Store authentication token
            authTokens.set(authToken, user);
    
            // Setting the auth token in cookies
            res.cookie('AuthToken', authToken);
    
            // Sending the auth token in body as well
            res.send({
                authToken: authToken,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                favorites: user.favorites
            });
        } else {
            res.sendStatus(403);
        }
    })
});

// Gets the logged in user
router.get('/', requireAuth, (req : Request, res : Response) => {
    findUser(req.body.user.email)
        .then(user => {
            if (user) 
                res.send({
                    token: req.body.user.authToken,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    favorites: user.favorites
                });
        })
});

// Logs out the user 
router.post('/logout', requireAuth, (req : Request, res : Response) => {
    removeTokens(req.body.user);
    res.sendStatus(200);
});

// Adds a movie to the users favorites
router.post('/favorite', requireAuth, (req : Request, res : Response) => {
    addFavorite(req.body.user.email, req.body.movie).then(_ => {
        res.sendStatus(200);
    });
});

// Deltes a movie from the users favorites
router.delete('/favorite', requireAuth, (req : Request, res : Response) => {
    removeFavorite(req.body.user.email, req.body.movie).then(_ => {
        res.sendStatus(200);
    });
});

// Example function that requires authentication
router.get("/:email", requireAuth, (req : Request, res : Response) => {
    res.send(req.body.user);
});


// This will hold the users and authToken related to users
export const authTokens : Map<String, User> = new Map<String, User>();

function getHashedPassword(password : string) : string {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

function generateAuthToken() : string {
    return crypto.randomBytes(30).toString('hex');
}

function removeTokens(user : User) {
    for (let token in authTokens.keys()) {
        if ((authTokens.get(token) as User).email == user.email) authTokens.delete(token);
    }
}

// Requires a user to be attached to the body (i.e. authenticated) to pass
// else it will return a 403 response.
export function requireAuth(req : Request, res : Response, next : NextFunction) : void {
    if (req.body.user) {
        next();
    } else {
        res.sendStatus(403);
    }
};

// Attaches the logged in user to the request-body based on the token in the request
// The token can either be in the cookies or a part of the HTTP-header
export function attachUser(req : Request, res : Response, next : NextFunction) {
    // Get auth token from the cookies
    let authToken : string = req.cookies['AuthToken'];

    // If token is not in cookie and in header
    if (!authToken) authToken = req.headers["authorization"] as string;

    // Inject the user to the request
    req.body.user = authTokens.get(authToken);
    if (req.body.user) req.body.user.authToken = authToken;

    next();
}

export default router;