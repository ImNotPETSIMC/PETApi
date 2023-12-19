import Zod from "zod";

export const MemberCreateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body."})
        .min(1, { message: "Field name must not be empty." }),
    
    photo: Zod
        .string({ required_error: "Field photo must compose request body." })
        .url({ message: "Field photo must be filled with valid url."}),

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
    name: Zod
        .string({ required_error: "Field name must compose request body."})
        .optional(),

    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
        .optional(),

    admission_year: Zod
        .number({ required_error: "Field admission_year must compose request body."})
        .min(1, { message: "Field admission_year must not be empty." })
        .optional(),

    email: Zod
        .string({ required_error: "Field email must compose request body."})
        .email({ message: "Field email must be filled with valid email."})
        .regex(/[A-Za-z]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email."})
        .optional(),

    github_url: Zod
        .string({ required_error: "Field github_url must compose request body." })
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url."})
        .url({ message: "Field github_url must be filled with valid url."})
        .optional(),

    instagram_url: Zod
        .string({ required_error: "Field instagram_url must compose request body." })
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url."})
        .url({ message: "Field instagram_url must be filled with valid url."})
        .optional(),

    linkedin_url: Zod
        .string({ required_error: "Field linkedin_url must compose request body." })
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url."})
        .url({ message: "Field linkedin_url must be filled with valid url."})
        .optional(),

    lattes_url: Zod
        .string({ required_error: "Field lattes_url must compose request body." })
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url."})
        .url({ message: "Field lattes_url must be filled with valid url."})
        .optional(),
        
    status: Zod
        .string({ required_error: "Field status must compose request body."})
        .refine((str => (str == "Petiano" || str == "Ex-Petiano" || str ==  "Tutor" || str ==  "Ex-Tutor")), { message: "Status must be Petiano, Ex-Petiano, Tutor or Ex-Tutor" })
        .optional(),

    // projects: Zod
    //     .array(
    //         Zod
    //         .string(),
    //     { required_error: "Field projects must compose body"})
    //     .optional()
});

export const MemberUpdateRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body."})
        .min(1, { message: "Field name must not be empty." })
        .optional(),
    
    photo: Zod
        .string({ required_error: "Field photo must compose request body." })
        .url({ message: "Field photo must be filled with valid url."})
        .optional(),

    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." }),
    
    
    admission_year: Zod
        .number({ required_error: "Field admission_year must compose request body."})
        .min(1, { message: "Field admission_year must not be empty." })
        .optional(),

    email: Zod
        .string({ required_error: "Field email must compose request body."})
        .email({ message: "Field email must be filled with valid email."})
        .regex(/[A-Za-z]+@ufu\.br/i, { message: "Field email must be filled with an UFU institutional email."})
        .optional(),
    
    github_url: Zod
        .string({ required_error: "Field github_url must compose request body." })
        .includes("github.com/", { message: "Field github_url must be filled with valid Github url."})
        .url({ message: "Field github_url must be filled with valid url."})
        .optional(),

    instagram_url: Zod
        .string({ required_error: "Field instagram_url must compose request body." })
        .includes("instagram.com/", { message: "Field instagram_url must be filled with valid Instagram url."})
        .url({ message: "Field instagram_url must be filled with valid url."})
        .optional(),

    linkedin_url: Zod
        .string({ required_error: "Field linkedin_url must compose request body." })
        .includes("linkedin.com/in/", { message: "Field linkedin_url must be filled with valid Linkedin url."})
        .url({ message: "Field linkedin_url must be filled with valid url."})
        .optional(),

    lattes_url: Zod
        .string({ required_error: "Field lattes_url must compose request body." })
        .includes("lattes.cnpq.br/", { message: "Field linkedin_url must be filled with valid Lattes url."})
        .url({ message: "Field lattes_url must be filled with valid url."})
        .optional(),
        
    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Petiano" || str == "Ex-Petiano" || str ==  "Tutor" || str ==  "Ex-Tutor")), { message: "Status must be Petiano, Ex-Petiano, Tutor or Ex-Tutor" })
    .optional(),

    projects: Zod
        .array(
            Zod
            .string({ required_error: "Field name must compose request body."})
            .min(1, { message: "Field name must not be empty." }),
        { required_error: "Field projects must compose body"})
        .optional()
});

export const MemberRemoveRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, { message: "Field matricula must match UFU's pattern for Information System students." })
});

export const ProjectCreateRequestSchema = Zod.object({
    name: Zod
    .string({ required_error: "Field name must compose request body."})
    .min(1, { message: "Field name must not be empty." }),

    description: Zod
    .string({ required_error: "Field description must compose request body."})
    .min(1, { message: "Field description must not be empty." }),

    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Em Andamento" || str == "Concluido")), { message: "Status must be Em Andamento or Concluido" }),

    type: Zod
    .string({ required_error: "Field type must compose request body."})
    .refine((str => (str == "Extensão" || str == "Ensino" || str == "Pesquisa" || str == "Outros")), { message: "Status must be Extensão, Ensino, Pesquisa or Outros." }),

    photo: Zod
    .string({ required_error: "Field photo must compose request body." })
    .url({ message: "Field photo must be filled with valid url."})
});

export const ProjectSearchRequestSchema = Zod.object({
    name: Zod
    .string({ required_error: "Field name must compose request body."})
    .optional(),

    description: Zod
    .string({ required_error: "Field description must compose request body."})
    .optional(),

    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Em Andamento" || str == "Concluido")), { message: "Status must be Em Andamento or Concluido" })
    .optional(),

    type: Zod
    .string({ required_error: "Field type must compose request body."})
    .refine((str => (str == "Extensão" || str == "Ensino" || str == "Pesquisa" || str == "Outros")), { message: "Status must be Extensão, Ensino, Pesquisa or Outros." })
    .optional(),
});

export const ProjectUpdateRequestSchema = Zod.object({
    name: Zod
    .string({ required_error: "Field name must compose request body."})
    .min(1, { message: "Field name must not be empty." }),

    description: Zod
    .string({ required_error: "Field description must compose request body."})
    .min(1, { message: "Field description must not be empty." })
    .optional(),

    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Em Andamento" || str == "Concluido")), { message: "Status must be Em Andamento or Concluido" })
    .optional(),

    type: Zod
    .string({ required_error: "Field type must compose request body."})
    .refine((str => (str == "Extensão" || str == "Ensino" || str == "Pesquisa" || str == "Outros")), { message: "Status must be Extensão, Ensino, Pesquisa or Outros." })
    .optional(),

    photo: Zod
    .string({ required_error: "Field photo must compose request body." })
    .url({ message: "Field photo must be filled with valid url."})
    .optional()
});

export const ProjectRemoveRequestSchema = Zod.object({
    name: Zod
        .string({ required_error: "Field name must compose request body."})
        .min(1, { message: "Field name must not be empty." })
});