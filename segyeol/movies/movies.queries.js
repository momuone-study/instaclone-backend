import client from "../client";
export default {
  Query: {
    movies: () => client.movie.findMany(),
    // movie: (_, { id }) => ({ title: "Hello", year: 2021 }),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
};
