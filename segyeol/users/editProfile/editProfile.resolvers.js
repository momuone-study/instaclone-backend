import bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        { loggedInUser }
      ) => {
        if (!loggedInUser) {
          return {
            ok: false,
            error: "You need to login",
          };
        }
        // protectResolver(loggedInUser);
        let uglyPassword = null;
        if (newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }
        const updateUser = await client.user.update({
          where: {
            id: loggedInUser.id,
          },
          data: {
            firstName,
            lastName,
            username,
            email,
            ...(uglyPassword && { password: uglyPassword }),
          },
        });

        if (updateUser.id) {
          return {
            ok: true,
          };
        } else {
          return {
            ok: false,
            error: "Can't update Profile!",
          };
        }
      }
    ),
  },
};
