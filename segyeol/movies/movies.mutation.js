import client from "../client";

export default {
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, { id }) => client.movie.delete({ where: { id } }),
    updateMovie: (_, { id, year }) =>
      client.movie.update({ where: { id }, data: { year } }),
  },
};

// resolvers 들은 ,roog, args, context, info를 기본으로 지니고 있다.
// root 대신 _. _ 하면 첫번째 인자 무시 가능.
