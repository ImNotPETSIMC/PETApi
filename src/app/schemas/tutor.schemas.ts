import Zod from "zod";

export const TutorCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    photo: Zod
        .string({ required_error: "Field photo must compose request body." })
        .url({ message: "Field photo must be filled with valid url." }),

    admission_year: Zod
        .number({ required_error: "Field admission_year must compose request body." })
        .min(2018, { message: "Field admission_year must be a valid one." }),

    email: Zod
        .string({ required_error: "Field email must compose request body." })
        .email({ message: "Field email must be filled with valid email." })
        .regex(/[A-Za-z]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email." })
        .optional(),

    github_url: Zod
        .string()
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url." })
        .url({ message: "Field github_url must be filled with valid url." })
        .optional(),

    instagram_url: Zod
        .string()
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url." })
        .url({ message: "Field instagram_url must be filled with valid url." })
        .optional(),

    linkedin_url: Zod
        .string()
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url." })
        .url({ message: "Field linkedin_url must be filled with valid url." })
        .optional(),

    lattes_url: Zod
        .string()
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url." })
        .url({ message: "Field lattes_url must be filled with valid url." })
        .optional(),

    status: Zod
        .string({ required_error: "Field status must compose request body." })
        .refine((str => (str == "Tutor" || str == "Ex-Tutor")), { message: "Status must be Membro or Ex-Membro." }),

    place_of_birth: Zod
        .string()
        .optional(),

    disciplines: Zod
        .array(
            Zod
                .string({ required_error: "Field name must compose request body." })
                .min(1, { message: "Field name must not be empty." }),
            { required_error: "Field disciplines must compose body" })
});

export const TutorSearchRequestSchema = Zod.object({
    name: Zod
        .string()
        .min(1, { message: "Field name must not be empty." })
        .optional(),

    photo: Zod
        .string()
        .url({ message: "Field photo must be filled with valid url." })
        .optional(),

    admission_year: Zod
        .number()
        .min(2018, { message: "Field admission_year must be a valid one." })
        .optional(),

    email: Zod
        .string()
        .email({ message: "Field email must be filled with valid email." })
        .regex(/[A-Za-z]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email." })
        .optional(),

    github_url: Zod
        .string()
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url." })
        .url({ message: "Field github_url must be filled with valid url." })
        .optional(),

    instagram_url: Zod
        .string()
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url." })
        .url({ message: "Field instagram_url must be filled with valid url." })
        .optional(),

    linkedin_url: Zod
        .string()
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url." })
        .url({ message: "Field linkedin_url must be filled with valid url." })
        .optional(),

    lattes_url: Zod
        .string()
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url." })
        .url({ message: "Field lattes_url must be filled with valid url." })
        .optional(),

    status: Zod
        .string({ required_error: "Field status must compose request body." })
        .refine((str => (str == "Tutor" || str == "Ex-Tutor")), { message: "Status must be Membro or Ex-Membro." })
        .optional(),

    place_of_birth: Zod
        .string()
        .optional()
});

export const TutorUpdateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body." })
        .min(1, { message: "Field name must not be empty." }),

    photo: Zod
        .string()
        .url({ message: "Field photo must be filled with valid url." })
        .optional(),

    admission_year: Zod
        .number()
        .min(2018, { message: "Field admission_year must be a valid one." })
        .optional(),

    email: Zod
        .string()
        .email({ message: "Field email must be filled with valid email." })
        .regex(/[A-Za-z]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email." })
        .optional(),

    github_url: Zod
        .string()
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url." })
        .url({ message: "Field github_url must be filled with valid url." })
        .optional(),

    instagram_url: Zod
        .string()
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url." })
        .url({ message: "Field instagram_url must be filled with valid url." })
        .optional(),

    linkedin_url: Zod
        .string()
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url." })
        .url({ message: "Field linkedin_url must be filled with valid url." })
        .optional(),

    lattes_url: Zod
        .string()
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url." })
        .url({ message: "Field lattes_url must be filled with valid url." })
        .optional(),

    status: Zod
        .string({ required_error: "Field status must compose request body." })
        .refine((str => (str == "Tutor" || str == "Ex-Tutor")), { message: "Status must be Membro or Ex-Membro." })
        .optional(),

    place_of_birth: Zod
        .string()
        .optional(),

    disciplines: Zod
        .array(
            Zod
                .string({ required_error: "Field name must compose request body." })
                .min(1, { message: "Field name must not be empty." })
            ).optional()
});

export const TutorRemoveRequestSchema = Zod.object({
    name: Zod
        .string()
        .min(1, { message: "Field name must not be empty." })
        .optional()
});