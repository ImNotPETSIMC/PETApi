import Zod from "zod";

export const MemberRequestSchema = Zod.object({
    matricula: Zod
        .string({ required_error: "Field matricula must compose request body."})
        .length(11, { message: "Field matricula must be 11 characters long." })
        .regex(/\d\d\d\d\dBSI[0-9]+/i, {message: "Field matricula must match UFU's pattern for Information System students."})
});

export const MembersRequestSchema = Zod.object({
    status: Zod
    .string({ required_error: "Field status must compose request body."})
    .refine((str => (str == "Petiano" || str == "Ex-Petiano" || str ==  "Tutor" || str ==  "Ex-Tutor")), { message: "Status must be Petiano, Ex-Petiano, Tutor or Ex-Tutor" })
});