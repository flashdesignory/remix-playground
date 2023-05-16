import type { Item } from "@prisma/client";

export default function ItemList({ items }: {items: Item[]}) {
    return (
        <>
            <ul>
                {items.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </>
    )
}