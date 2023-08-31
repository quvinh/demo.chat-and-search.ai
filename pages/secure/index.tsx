import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { authentication } from "@/utils/authentication";

export default function Secure() {
  return (
    <>
      <h1>Secure</h1>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return authentication(context, ({ session }: any) => {
    return { props: { session } };
  });
}
