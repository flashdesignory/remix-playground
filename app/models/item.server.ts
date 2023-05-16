import type { Item, Retro, User } from "@prisma/client";
import { prisma } from "~/db.server";

export function createItem({
    title,
    userId,
    retroId,
    category
  }: Pick<Item, "title"> & {
    userId: User["id"];
    retroId: Retro["id"];
    category: string;
  }) {
    return prisma.item.create({
      data: {
        title,
        category,
        user: {
          connect: {
            id: userId,
          },
        },
        retro: {
            connect: {
                id: retroId,
            }
        }
      },
    });
  }