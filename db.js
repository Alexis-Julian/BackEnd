import mongoose from 'mongoose';
import chalk from 'chalk';
import env from './config/enviroment.config.js';

export default class MongoSingleton {
  static instance;

  constructor() {
    mongoose.connect(env.MONGO_URL);
  }

  static getInstance() {
    if (this.instance) {
      console.log('Already initialized');
      return this.instance;
    }

    this.instance = new MongoSingleton();
    console.log(chalk.blue('Connected to MongoDB'));
    return this.instance;
  }
}
