import Axios, { AxiosError } from "axios";
import Zod  from "zod";

import { normalizeString } from "../helper/normalizeString";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { TutorCreateRequestSchema, TutorRemoveRequestSchema, TutorSearchRequestSchema, TutorUpdateRequestSchema } from "../schemas/tutor.schemas";
import { Prisma } from "@prisma/client";

export default class TutorService {
    public async search(member: Zod.infer<typeof TutorSearchRequestSchema>) {
        const requestRef = member;

        if(member.name) requestRef.name = normalizeString(member.name, "name");
        
        try {
            const members = await prisma.tutor.findMany({
                where : {
                    name: { contains: requestRef.name },
                    admission_year: requestRef.admission_year,
                    email: { contains: requestRef.email },
                    github_url: { contains: requestRef.github_url },
                    linkedin_url: { contains: requestRef.linkedin_url },
                    instagram_url: {contains: requestRef.instagram_url },
                    lattes_url: { contains: requestRef.lattes_url },
                    status: { contains: requestRef.status },
                    place_of_birth: { contains: requestRef.place_of_birth }
                }
            });

            return {
                members
            };
        } catch(err) { 
            throw err;
        }
    };
    
    public async remove(member: Zod.infer<typeof TutorRemoveRequestSchema>) {
        const requestRef = { name: normalizeString(member.name, "name") };

        try {
            
            const result = await prisma.tutor.delete({
                where : {
                    name: requestRef.name
                }
            });
        
            return {
                ...result
            };

        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.name + " - Tutor not found"); 
            }

            throw err;
        }
    };

    public async register(member: Zod.infer<typeof TutorCreateRequestSchema>) {
        try {       
            const requestRef = member;
            const response = await Axios.get(member.photo, {responseType: 'arraybuffer'});
            
            requestRef.name = normalizeString(member.name, "name");
            const base64Photo = Buffer.from(response.data).toString('base64');

            if(base64Photo.slice(0, 5) != '/9j/4' && base64Photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            requestRef.photo = base64Photo;

            const result = await prisma.tutor.create({
                data: {
                    ...requestRef
                }
            });
            
            return {
                ...result
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2002") throw new ValidationExceptionError(400, "Bad Request: " + member.name + " - Já Cadastrado")
            } 

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err;
        }
    };

    public async update(member: Zod.infer<typeof TutorUpdateRequestSchema>) {
        const requestRef = member;

        if(member.name) requestRef.name = normalizeString(member.name, "name");

        try {
            if(member.photo) {
                const response = await Axios.get(member.photo, {responseType: 'arraybuffer'});
                requestRef.photo = Buffer.from(response.data).toString('base64');
                
                if(requestRef.photo.slice(0, 5) != '/9j/4' && requestRef.photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            };

            const result = await prisma.tutor.update({
                where: {
                    name: requestRef.name
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
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.name + " - Tutor not found"); 
            }

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err; 
        }
    };
}