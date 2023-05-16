import { Form } from "@remix-run/react";


export default function InputForm({ category }: { category: string }) {
    return (
        <>
            <Form method="post" className="flex w-full flex-row gap-1">
                <label className="flex w-full flex-col gap-1">
                    <input
                        name="title"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                       placeholder="what's on your mind?"
                    />
                </label>

                <label className="flex w-full flex-col gap-1 hidden">
                    <input
                        name="category"
                        className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
                        value={category}
                        readOnly
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