// graphql 파일의 query를 실행할 수 있게 한다
import movie from "./movie";
import { PubSub } from "graphql-yoga";

const pubsub = new PubSub();
const REFRESH_MOVIES = "refreshMovies";
pubsub.publish(REFRESH_MOVIES);

const resolvers = {
  Query: {
    movies: () => {
      return movie.find();
    },
    movie: (_, { id }) => {
      return movie.findOne({ id: id });
    },
  },
  Mutation: {
    addMovie: (
      _,
      {
        id,
        title,
        rating,
        description_intro,
        language,
        medium_cover_image,
        genres,
        postedAt,
        updatedAt,
      }
    ) => {
      movie.insertMany({
        id,
        title,
        rating,
        description_intro,
        language,
        medium_cover_image,
        genres,
        postedAt,
        updatedAt,
      });

      pubsub.publish(REFRESH_MOVIES);

      return {
        id,
        title,
        rating,
        description_intro,
        language,
        medium_cover_image,
        genres,
        postedAt,
        updatedAt,
      };
    },
    deleteMovie: (_, { id }) => {},
  },
  Subscription: {
    refreshMovies: {
      subscribe: async (_, __) => {
        console.log("##", __);
        return pubsub.asyncIterator(REFRESH_MOVIES);
      },
      resolve: () => {
        console.log("subscription >>> ");
        return movie.find();
      },
    },
  },
};

export default resolvers;
