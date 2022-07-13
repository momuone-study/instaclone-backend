import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
      // check logic 추가
      const ok = await client.user.findUnique({ where: { username } });

      if (!ok) {
        return {
          ok: false,
          error: "User does not exist",
        };
      }
      await client.user.update({
        where: {
          id: loggedInUser.id,
        },
        data: {
          following: {
            // 다른 user를 연결해주는 역할
            connect: {
              // 특별한 field 값으로만 search가 가능
              // toFollow == username
              //   username: username,
              username,
            },
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
