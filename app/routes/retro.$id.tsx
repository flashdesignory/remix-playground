import type { LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import invariant from "tiny-invariant";
import { getRetro } from "~/models/retro.server";
import { json } from "@remix-run/node";

import RetroColumn from "~/comonents/retro/column";

import {
  useLoaderData,
} from "@remix-run/react";
import type { Retro } from "@prisma/client";

export const loader = async ({ params, request }: LoaderArgs) => {
  await requireUserId(request);
  invariant(params.id, "retro id not found");

  const retro = await getRetro({ id: params.id  });
  if (!retro) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(retro);
};

export default function RetroRoute() {
  // const { retro } = useLoaderData<typeof loader>();
  const retro = useLoaderData() as unknown as Retro;
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
