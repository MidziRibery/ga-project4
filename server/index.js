import express from "express";
import bodyParser from 'body-parser';
import mongoose from "mongoose";
import cors from "cors";
import dotevn from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";//properly set the path when we configure directory later

/* Middleware Configurations */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename); //something to do with module
dotevn.config(); // invoke dotenv
const app = express(); // to use express
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public.assets"))); //set the directory of where we keep our assets aka images,locally.

/* FILE STORAGE */

//this is how someone saves a file. Eveytime someone uploads a file onto the website,
//it is gonna be saved into public/assets.
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// these configurations and information can be found in GitHuB repo of Multer.

const upload = multer({ storage }); // this will help to save the file

/*Setup Mongoose*/
const PORT = process.env.port || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Listening on Server Port ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
