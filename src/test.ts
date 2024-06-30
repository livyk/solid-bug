"use server";

type User = { name: string; id: number };

const pwd = "V[`b755FWA54iN4cF8gW\\{_1/!5.K`xq";

import { cache, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";

export const getUsers = cache(async (): Promise<User[]> => {
  const session = await useSession({
    password: pwd,
  });

  if (!session) {
    throw redirect("/");
  }

  return [
    { name: "Alice", id: 1 },
    { name: "Bob", id: 2 },
  ];
}, "users");
