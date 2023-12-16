import Zod from "zod";

export const MemberSearchRequestSchema = Zod.object({
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