import Axios, { AxiosError } from "axios";
import Zod  from "zod";

import { normalizeString } from "../helper/normalizeString";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { MemberCreateRequestSchema, MemberSearchRequestSchema, MemberUpdateRequestSchema } from "../schemas";
import { Prisma } from "@prisma/client";


export default class MemberService {
    public async search(member: Zod.infer<typeof MemberSearchRequestSchema>) {
        const requestRef = member;

        if(member.matricula) requestRef.matricula = normalizeString(member.matricula, "matricula");
        if(member.name) requestRef.name = normalizeString(member.name, "name");
        
        try {
            const members = await prisma.member.findMany({
                where : {
                    matricula: { contains: requestRef.matricula },
                    name: { contains: requestRef.name },
                    admission_year: requestRef.admission_year,
                    email: { contains: requestRef.email },
                    github_url: { contains: requestRef.github_url },
                    linkedin_url: { contains: requestRef.linkedin_url },
                    instagram_url: {contains: requestRef.instagram_url },
                    lattes_url: { contains: requestRef.lattes_url },
                    status: { contains: requestRef.status }
                }
            });
            
            if(!members.length) throw new ValidationExceptionError(404, "Member not found");

            return {
                members
            };
        } catch(err) { 
            throw err;
        }
    };
    
    public async remove(matricula: string) {
        const requestRef = { matricula: normalizeString(matricula, "matricula") };

        try {
            
            const result = await prisma.member.delete({
                where : {
                    matricula: requestRef.matricula
                }
            });
        
            return {
                ...result
            };

        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found"); 
            }

            throw err;
        }
    };

    public async register(member: Zod.infer<typeof MemberCreateRequestSchema>) {
        try {       
            const response = await Axios.get(member.photo, {responseType: 'arraybuffer'});
            
            const name = normalizeString(member.name, "name");
            const matricula = normalizeString(member.matricula, "matricula");
            const base64Photo = Buffer.from(response.data).toString('base64');

            if(base64Photo.slice(0, 5) != '/9j/4' && base64Photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");

            const result = await prisma.member.create({
                data:{
                    name: name,
                    matricula: matricula,
                    photo: base64Photo,
                    status: member.status,
                    email: member.email,
                    github_url: member.github_url,
                    instagram_url: member.instagram_url,
                    linkedin_url: member.linkedin_url,
                    lattes_url: member.lattes_url, 
                    admission_year: member.admission_year,
                    projects: member.projects
                }
            });
            
            return {
                ...result
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2002") throw new ValidationExceptionError(400, "Bad Request: " + member.matricula + " - Já Cadastrado")
            } 

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err;
        }
    };

    public async update(member: Zod.infer<typeof MemberUpdateRequestSchema>) {
        const requestRef = member;

        requestRef.matricula = normalizeString(member.matricula, "matricula");
        if(member.name) requestRef.name = normalizeString(member.name, "name");

        try {
            if(member.photo) {
                const response = await Axios.get(member.photo, {responseType: 'arraybuffer'});
                requestRef.photo = Buffer.from(response.data).toString('base64');
                
                if(requestRef.photo.slice(0, 5) != '/9j/4' && requestRef.photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
            };

            const result = await prisma.member.update({
                where: {
                    matricula: requestRef.matricula
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
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found"); 
            }

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }

            throw err; 
        }
    };
}