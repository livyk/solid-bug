import { For } from "solid-js";
import { createAsync, cache, redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";

const pwd = "V[`b755FWA54iN4cF8gW\\{_1/!5.K`xq";

type User = { name: string; id: number };

const getUsers = cache(async (): Promise<User[]> => {
  "use server";

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

export const route = {
  load: () => getUsers(),
};

export default function Page() {
  const users = createAsync(() => getUsers());

  return <For each={users()}>{(user) => <li>{user.name}</li>}</For>;
}
