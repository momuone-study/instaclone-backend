import bcrypt from "bcrypt";
import client from "../../client";
import { protectResolver } from "../users.utils";
import { createWriteStream } from "fs";

export default {
  Mutation: {
    editProfile: protectResolver(
      async (
        _,
        {
          firstName,
          lastName,
          username,
          email,
          password: newPassword,
          bio,
          avatar,
        },
        { loggedInUser }
      ) => {
        let avatarUrl = null;
        if (avatar) {
          // console.log(avatar); // aws 에 업로드함. 그리고, aws는 url을 반환함.
          const { filename, createReadStream } = await avatar;
          const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
          const readStream = createReadStream();

          // upload 경로. current 경로를 알아야함.
          const writeStream = createWriteStream(
            process.cwd() + "/upload/" + newFilename
          );

          // pipe 연결하기
          readStream.pipe(writeStream);
          avatarUrl = `http://localhost:4000/static/${newFilename}`;
        }

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
            bio,
            ...(uglyPassword && { password: uglyPassword }),
            ...(avatarUrl && { avatar: avatarUrl }),
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
