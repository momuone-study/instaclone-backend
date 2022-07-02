// const { ApolloServer, gql } = require("apollo-server");
// require("dotenv").config();
import schema from "./schema";
import { ApolloServer } from "apollo-server";
import dotdev from "dotenv";
import { getUser, protectResolver } from "./users/users.utils";
dotdev.config();

const server = new ApolloServer({
  schema,
  // context: {
  //   token:
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjU2NzQ2MDY3fQ.rIcYlDiiWP3GAPu4Ml5I9_jUf5bAtL-e3OC3ktA3YJo",
  // },
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

const PORT = process.env.PORT;
server
  .listen(PORT)
  .then(() => console.log(`Server is running on http://localhost:${PORT}/")`));

// babel 설치. javascript compiler. 최신 ecma 코드들을 변환해줌. (node.js 버전에 대한 제약 사라짐)
//  npm install --save-dev @babel/core
// npm install --save-dev @babel/preset-env
// babel.config.json 생성

// npm install prisma -D
// npx prisma init

// https://www.enterprisedb.com/postgresql-tutorial-resources-training?uuid=db55e32d-e9f0-4d7c-9aef-b17d01210704&campaignId=7012J000001NhszQAC
// postgresql pgadmin 설치

// prisma studio
// npx prisma studio.  http://localhost:5555. db 조회 가능

// 도메인별로 나누기.
