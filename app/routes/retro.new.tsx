import type { LoaderArgs } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { createRetro } from "~/models/retro.server";
import { Form } from "@remix-run/react";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader = async ({ params, request }: LoaderArgs) => {
    const userId = await requireUserId(request);
    console.log("userId", userId);
    return null;
};

export const action = async ({ request }: ActionArgs) => {
    const retro = await createRetro();
    return redirect(`/retro/${retro.id}`);
  };

export default function RetroRoute() {
    return (
        <Form method="post">
         <button type="submit">create new Retro</button>
       </Form>
    )
}