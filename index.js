import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "./resolvers";
import mongoose from "mongoose";

const pubsub = new PubSub();

mongoose.Promise = global.Promise;

mongoose.connect(
  "mongodb://seongho:F3KCagZgZmvLw9Nm@cluster0-shard-00-00.iccc0.mongodb.net:27017,cluster0-shard-00-01.iccc0.mongodb.net:27017,cluster0-shard-00-02.iccc0.mongodb.net:27017/data01?ssl=true&replicaSet=atlas-igk0z3-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB Connected");
});

const server = new GraphQLServer({
  typeDefs: "schema.graphql",
  resolvers,
  context: { pubsub },
});

server.start(() => console.log("Graphql Server Running localhost:4000"));
