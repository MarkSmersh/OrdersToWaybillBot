import { Sequelize } from "sequelize";

export = new Sequelize (process.env.DB_URI as string);