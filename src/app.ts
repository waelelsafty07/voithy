import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
const swaggerUi = require('swagger-ui-express');
import specs from './swaggerConfig';
import errorMiddleware from './middleware/error.middleware'; 
import OnRedis from './OnRedis';

dotenv.config();

class App {
    public app: express.Application;
    public port: number;
   
    constructor(controllers: any[], port: number) {
      this.app = express();
      this.port = port;
      this.connectToTheDatabase();
      this.initializeMiddlewares();
      this.connectToTheRedis()
      this.initializeControllers(controllers);
      this.initializeErrorHandling()
    }
   
    private initializeMiddlewares() {
      this.app.use(bodyParser.json());
      this.app.use(cookieParser());
    }
   
    private initializeControllers(controllers: any[]) {
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
      controllers.forEach((controller) => {
        this.app.use('/', controller.router);
      });
    }

    private initializeErrorHandling() {
      this.app.use(errorMiddleware);
    }

    private connectToTheRedis() {
      new OnRedis()
    }

    private connectToTheDatabase() {
        const {
          MONGO_USER,
          MONGO_PASSWORD,
          MONGO_PORT,
          MONGO_Host
        } = process.env;
        const URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:${MONGO_PORT}`
        const live_data = `mongodb+srv://waelelsafty07:dQMYdYodwgJWveFN@cluster0.oso4wk9.mongodb.net/`
        mongoose.connect(live_data)
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