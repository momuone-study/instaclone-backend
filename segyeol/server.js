// const { ApolloServer, gql } = require("apollo-server");
import { ApolloServer, gql } from "apollo-server"; // type을 module로 바꿔야함. package.json 에 추가
// prisma client
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// graphql 에서는 recuired 일일이 정해줘야함.
const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
    genre: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(id: Int!): Movie
    updateMovie(id: Int!, year: Int!): Movie
  }
`;

// resolvers 들은 ,roog, args, context, info를 기본으로 지니고 있다.
// root 대신 _. _ 하면 첫번째 인자 무시 가능.

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    // movie: (_, { id }) => ({ title: "Hello", year: 2021 }),
    movie: (_, { id }) => client.movie.findUnique({ where: { id } }),
  },
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => console.log("Server is running on http://localhost:4000/"));

// babel 설치. javascript compiler. 최신 ecma 코드들을 변환해줌. (node.js 버전에 대한 제약 사라짐)
//  npm install --save-dev @babel/core
// npm install --save-dev @babel/preset-env
// babel.config.json 생성

// npm install prisma -D
// npx prisma init

// https://www.enterprisedb.com/postgresql-tutorial-resources-training?uuid=db55e32d-e9f0-4d7c-9aef-b17d01210704&campaignId=7012J000001NhszQAC
// postgresql pgadmin 설치
