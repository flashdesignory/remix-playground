import { Form } from "@remix-run/react";

export default function InputForm({ category }: { category: string }) {
    return (
        <>
            <Form method="post">
                <label className="flex w-full flex-col gap-1">
                    <span>Title: </span>
                    <input
                        name="title"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                       
                    />
                </label>

                <label className="flex w-full flex-col gap-1">
                    <span>Category: </span>
                    <input
                        name="category"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        value={category}
                       
                    />
                </label>

                <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                >
                    Save
                </button>
            </Form>
        </>
    )
}