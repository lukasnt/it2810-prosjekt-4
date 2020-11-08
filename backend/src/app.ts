import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes";
import cors from "cors";
import { connect } from "./data/database";
import { attachUser } from "./controllers/user";

const app : Application = express();

// Connect to Database
connect();

// To support URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true , type: 'application/x-www-form-urlencoded'}));

// To support JSON-encoded bodies
app.use(bodyParser.json({ type: 'application/json' }))

// To parse cookies from the HTTP Request
app.use(cookieParser());

// Enable cors-headers
app.use(cors());

// Attach User to the body based on the token
app.use(attachUser);

// Use the endpoints from the controllers
app.use("/api", router);

app.listen(8080, () => {
    console.log("App listening at http://localhost:8080");
});
