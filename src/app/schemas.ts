import Zod from "zod";

export const MemberRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body."})
        .min(1, { message: "Field name must not be empty." }),
    
    photo_url: Zod
        .string({ required_error: "Field photo_url must compose request body." })
        .url({ message: "Field photo_url must be filled with valid url."}),

    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." }),
    
    
    admission_year: Zod
        .number({ required_error: "Field admission_year must compose request body."})
        .min(1, { message: "Field admission_year must not be empty." }),

    email: Zod
        .string({ required_error: "Field email must compose request body."})
        .email({ message: "Field email must be filled with valid email."})
        .regex(/[A-Za-z]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email."}),

    
    github_url: Zod
        .string({ required_error: "Field github_url must compose request body." })
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url."})
        .url({ message: "Field github_url must be filled with valid url."}),

    instagram_url: Zod
        .string({ required_error: "Field instagram_url must compose request body." })
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url."})
        .url({ message: "Field instagram_url must be filled with valid url."}),

    linkedin_url: Zod
        .string({ required_error: "Field linkedin_url must compose request body." })
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url."})
        .url({ message: "Field linkedin_url must be filled with valid url."}),

    lattes_url: Zod
        .string({ required_error: "Field lattes_url must compose request body." })
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url."})
        .url({ message: "Field lattes_url must be filled with valid url."}),
        
    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Petiano" || str == "Ex-Petiano" || str ==  "Tutor" || str ==  "Ex-Tutor")), { message: "Status must be Petiano, Ex-Petiano, Tutor or Ex-Tutor" }),

    projects: Zod
        .array(
            Zod
                .string({ required_error: "Field name must compose request body."})
                .min(1, { message: "Field name must not be empty." }),
                { required_error: "Field projects must compose body"})
});

export const MemberSearchRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
});

export const MemberRemoveRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." })
});

export const MemberShowRequestSchema = Zod.object({
    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Petiano" || str == "Ex-Petiano" || str ==  "Tutor" || str ==  "Ex-Tutor")), { message: "Status must be Petiano, Ex-Petiano, Tutor or Ex-Tutor" })
});

export const ProjectSearchRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body."})
        .min(1, { message: "Field name must not be empty." })
});

export const ProjectShowRequestSchema = Zod.object({
    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Em Andamento" || str == "Concluido")), { message: "Status must be Em Andamento or Concluido" })
});