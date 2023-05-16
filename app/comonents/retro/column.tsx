import type { Item } from "@prisma/client"
import InputForm from "./input-form"
import ItemList from "./item-list"

export default function RetroColumn({ category, items } : { category: string, items: Item[] }) {
    return (
        <div className="retro-column h-screen">
            <h3>{category}</h3>
            <InputForm category={category} />
            <ItemList items={items} />
        </div>
    )
}