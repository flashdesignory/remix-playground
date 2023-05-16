import type { Retro } from "@prisma/client";

import { prisma } from "~/db.server";

export function createRetro(){
    return prisma.retro.create({data: {}});
}

export function getRetro({
    id,
  }: Pick<Retro, "id">) {
    return prisma.retro.findFirst({
      select: { id: true, items: true },
      where: { id },
    });
  }