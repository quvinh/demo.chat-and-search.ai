import { getSession } from "next-auth/react";

export const authentication = async (context: any, cb: any) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  cb();
};
