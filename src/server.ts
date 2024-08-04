import mongoose, { skipMiddlewareFunction } from "mongoose";
import app from "./app"
import config from "./app/configs";

(
    async function () {

        try {

            // await mongoose.connect(config.mongodb_uri as string);
            // console.log("Pinged your deployment. You successfully connected to MongoDB!")

            app.listen(config.port, () => {
                console.log(`LocalLoop listening on port ${config.port}`)
            })

        } catch (error) {
            console.log('There was a problem starting the server', error);
        }

    })()