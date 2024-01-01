import Zod from "zod";

export const NewsCreateRequestSchema = Zod.object({
    id: Zod
        .string({ required_error: "Field id must compose request body." })
        .min(1, { message: "Field id must not be empty." })
        .transform((str : string) => str.replace(" ", "-")),

    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    date: Zod
        .string({ required_error: "Field date must compose request body." })
        .min(1, { message: "Field date must not be empty." }),

    content: Zod
        .string({ required_error: "Field content must compose request body." })
        .min(1, { message: "Field content must not be empty." }),

    photo: Zod
        .string({ required_error: "Field photo must compose request body." })
        .url({ message: "Field photo must be filled with valid url." })
});

export const NewsSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .optional(),

    date: Zod
        .string()
        .optional(),

    content: Zod
        .string()
        .optional(),
});

export const NewsUpdateRequestSchema = Zod.object({
    id: Zod
        .string()
        .min(1, { message: "Field id must not be empty." })
        .transform((str : string) => str.replace(" ", "-")),

    name: Zod
        .string()
        .min(1, { message: "Field name must not be empty." })
        .optional(),

    date: Zod
        .string()
        .min(1, { message: "Field date must not be empty." })
        .optional(),

    content: Zod
        .string()
        .min(1, { message: "Field content must not be empty." })
        .optional(),

    photo: Zod
        .string()
        .url({ message: "Field photo must be filled with valid url." })
        .optional()
});

export const NewsRemoveRequestSchema = Zod.object({
    id: Zod
        .string()
        .min(1, { message: "Field id must not be empty." })
        .transform((str : string) => str.replace(" ", "-"))
});