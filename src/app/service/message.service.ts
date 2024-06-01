import Axios, { AxiosError } from "axios";
import Zod from "zod";

import { normalizeString } from "../helper/normalizeString";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { MessageCreateRequestSchema, MessageRemoveRequestSchema, MessageSearchRequestSchema, MessageUpdateRequestSchema } from "../schemas/message.schemas";
import { Prisma } from "@prisma/client";

export default class MessageService {
    public async register(message: Zod.infer<typeof MessageCreateRequestSchema>) {
        try {
            const result = await prisma.message.create({
                data: {
                    ...message
                }
            });

            return {
                ...result
            };
        } catch (err) {
            throw err;
        }
    };

    public async search(message: Zod.infer<typeof MessageSearchRequestSchema>) {
        const requestRef = message;

        try {
            const messages = await prisma.message.findMany({
                where: {
                    id: requestRef.id,
                    name: { contains: requestRef.name },
                    email: { contains: requestRef.email },
                    content: { contains: requestRef.content },
                    date: { gte: requestRef.date },
                    answered: requestRef.answered,
                }
            });

            return {
                messages
            };
        } catch (err) {
            throw err;
        }
    };

    public async remove(message: Zod.infer<typeof MessageRemoveRequestSchema>) {
        try {
            const result = await prisma.message.delete({
                where: {
                    id: message.id
                }
            });

            return {
                ...result
            };

        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2025") throw new ValidationExceptionError(404, message.id + " - Message not found");
            }

            throw err;
        }
    };

    public async update(message: Zod.infer<typeof MessageUpdateRequestSchema>) {
        const requestRef : any = { ...message };
        delete requestRef.id;

        try {
            const result = await prisma.message.update({
                where: {
                    id: message.id
                },
                data: {
                    ...requestRef
                },
            })

            return {
                ...result
            };
        } catch (err) {
            if (err instanceof Prisma.PrismaClientKnownRequestError) {
                if (err.code == "P2025") throw new ValidationExceptionError(404, message.id + " - Message not found");
            }

            throw err;
        }
    };
}