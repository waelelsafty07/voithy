import express, { Express, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

class App {
    public app: express.Application;
    public port: number;
   
    constructor(controllers: any[], port: number) {
      this.app = express();
      this.port = port;
      this.connectToTheDatabase();
      this.initializeMiddlewares();
      this.initializeControllers(controllers);
    }
   
    private initializeMiddlewares() {
      this.app.use(bodyParser.json());
    }
   
    private initializeControllers(controllers: any[]) {
      controllers.forEach((controller) => {
        this.app.use('/', controller.router);
      });
    }

    private connectToTheDatabase() {
        const {
          MONGO_USER,
          MONGO_PASSWORD,
          MONGO_PORT,
          MONGO_Host
        } = process.env;
        const URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}`
        mongoose.connect(URL)
        .then(()=>console.log('connect to db...'))
        .catch(err=> console.log('failed to connect', err));
    }

    public listen() {
      this.app.listen(this.port, () => {
        console.log(`App listening on the port ${this.port}`);
      });
    }
  }
   
  export default App;