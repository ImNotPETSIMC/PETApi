import Zod from "zod";

export const MemberRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Matricula must compose request body."})
        .length(11, { message: "Matricula must be 11 characters long." })
        .includes("BSI", {message: ""})
        .regex(/^3\d\d\d\d[A-Za-z]+[0-9]+$/gm, {message: "Matricula must match UFU's pattern for Information System students."})
});