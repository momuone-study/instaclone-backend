import {
  loadFilesSync,
  // makeExecutableSchema,
  mergeResolvers,
  mergeTypeDefs,
} from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers);

// const schema = makeExecutableSchema({ typeDefs, resolvers });
// export default schema;

// apollo server는 resolver 와 typedef를 주면 스키마를 생성
// 전에는 스키마를 직접 만들었었지만, upload scalar를 사용할 수 있게 됐음
