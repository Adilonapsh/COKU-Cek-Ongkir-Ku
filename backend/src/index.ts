import express, { Application, Express, Request, response, Response } from 'express';
import dotenv from 'dotenv';

import { router } from './router/router'

dotenv.config();

const app: Application = express();

const appName: string = process.env.APP_NAME || 'My Website';

app.use(router)

app.listen(3000, () => {
    console.log(appName + ' listening on port 3000!')
})
