import type { ActionArgs } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { getRetro } from "~/models/retro.server";
import { json } from "@remix-run/node";

import RetroColumn from "~/comonents/retro/column";
import { createItem } from "~/models/item.server";

import {
  useLoaderData,
} from "@remix-run/react";
import type { Item, Retro } from "@prisma/client";

export type RetroWithItems = Retro & { items: Item[] };

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request);
  invariant(params.id, "retro id not found");

  const retro = await getRetro({ id: params.id  });
  if (!retro) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(retro);
};

export const action = async ({ params, request }: ActionArgs) => {
  const userId = await requireUserId(request);
  const retroId = params.id ?? "";
  invariant(params.id, "retro id not found");

  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { body: null, title: "Title is required" } },
      { status: 400 }
    );
  }

  const category = formData.get("category");

  if (typeof category !== "string" || category.length === 0) {
    return json(
      { errors: { body: null, category: "Category is required" } },
      { status: 400 }
    );
  }

  const item = await createItem({ title, userId, retroId, category });
  console.log(item);
  // return redirect(`/notes/${note.id}`);
  return null;
};

export default function RetroRoute() {
  // const { retro } = useLoaderData<typeof loader>();
  const retro = useLoaderData() as unknown as RetroWithItems;
  console.log(retro);
  const items = retro.items ?? [];

  const positiveItems = items.filter(item => item.category === "positive");
  const negativeItems = items.filter(item => item.category === "negative");
  const neutralItems = items.filter(item => item.category === "neutral");

  return (
    <main className="mx-auto max-w-4xl">
      <div className="columns-3">
        <RetroColumn category="positive" items={positiveItems} />
        <RetroColumn category="negative" items={negativeItems} />
        <RetroColumn category="neutral" items={neutralItems} />        
      </div>
    </main>
  );
}
