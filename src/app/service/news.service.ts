import Axios, { AxiosError } from "axios";
import { normalizeString } from "../helper/normalizeString";
import { ValidationExceptionError } from "../exception/validation.exception";
import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";
import { NewsCreateRequestSchema, NewsRemoveRequestSchema, NewsSearchRequestSchema, NewsUpdateRequestSchema } from "../schemas/news.schemas";

export default class NewsService {
    public async search(news: Zod.infer<typeof NewsSearchRequestSchema>) {
        const requestRef = news;

        if(news.name) requestRef.name = normalizeString(news.name, "name");

        try {
            const news = await prisma.news.findMany({
                where: {
                    id: { contains: requestRef.id },
                    name: { contains: requestRef.name },
                    content: { contains: requestRef.content },
                    date: { contains: requestRef.date }
                },
            })

            return {
                news
            };
        } catch(err) { 
            throw err;
        }
    };

    public async register(news: Zod.infer<typeof NewsCreateRequestSchema>) {
        const requestRef = news;
        requestRef.name = normalizeString(news.name, "name");

        try {
            const response = await Axios.get(news.photo, {responseType: 'arraybuffer'});
            const base64Photo = Buffer.from(response.data).toString('base64');

            if(base64Photo.slice(0, 5) != '/9j/4' && base64Photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            requestRef.photo = base64Photo;

            const result = await prisma.news.create({
                data : {
                    ...requestRef
                }
            })

            return {
                ...result
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2002") throw new ValidationExceptionError(400, "Bad Request: " + requestRef.id + " - Já Cadastrado")
            } 

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }
        
            throw err;
        }
    };

    public async update(news: Zod.infer<typeof NewsUpdateRequestSchema>) {
        const requestRef = news;
        
        try {
            if(news.photo) {
                const response = await Axios.get(news.photo, {responseType: 'arraybuffer'});
                requestRef.photo = Buffer.from(response.data).toString('base64');

                if(requestRef.photo.slice(0, 5) != '/9j/4' && requestRef.photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            };

            const result = await prisma.news.update({
                where: {
                    id: requestRef.id
                },
                data: {
                  ...requestRef
                },
            })

            return {
                ...result
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.id + " - News not found"); 
            } 

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }
        
            throw err;
        }
    };

    public async remove(news: Zod.infer<typeof NewsRemoveRequestSchema>) {
        const requestRef = news;

        try {
            const news = await prisma.news.delete({
                where : {
                    id: requestRef.id
                }
            });
            
            return {
                ...news
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.id + " - News not found"); 
            } 
        
            throw err;
        }
    };
}