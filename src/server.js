import express from "express";
import DB_connet from './config/database/db'
import moduloEnv from './config/env/index';
import bodyParser from "body-parser";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import types from "./graphql/schemas";
import resolvers from './graphql/graphql-resolvers';
import {buildSchema} from 'graphql';

//****************llamadas******************//
moduloEnv.settingEnv();
var app = express();
app.use(cors());
DB_connet.connetDB();
const schema = buildSchema(types);
app.use(bodyParser.json());


//consumir el frontend
app.use("/app", express.static("public"));

app.use("/graphql", (req, res) =>
  graphqlHTTP({
    schema, // types 
    rootValue: resolvers, //resolvers
    graphiql: true,
  })(req, res)
);

const PORT = process.env.PORT || 1500;
app.listen(PORT, () => { console.log(`the server are running at the route http://localhost:${PORT}/graphql`);});
