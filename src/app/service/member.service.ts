import Axios from "axios";
import Zod  from "zod";

import { normalizeString } from "../helper/normalizeString";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { isValidURL } from "../helper/isValidURL";
import { MemberCreateRequestSchema, MemberUpdateRequestSchema } from "../schemas";
import { Prisma } from "@prisma/client";


export default class MemberService {
    public async search(matricula: string) {
        const requestRef = { matricula: normalizeString(matricula, "matricula") }
        
        try {
            const member = await prisma.member.findMany({
                where : {
                    matricula: {
                        contains: requestRef.matricula
                    }          
                }
            });
            
            if(!member) throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found");

            return {
                ...member
            };
        } catch(err) { 
            throw err;
        }
    };

    public async show(status: string) {
        try {
            const results = await prisma.member.findMany({
                where : {
                    status: status
                }
            });

            const members = results.map((data) => { 
                if(data.status == status) return { ...data };
            });

            if(!members.length) throw new ValidationExceptionError(404,"No members with status " + status + " found"); 
            
            return {
                ...members
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
            throw err;
        }
    };

    public async register(member: Zod.infer<typeof MemberCreateRequestSchema>) {
        try {
            [ { url: member.photo, name: "Photo URL"}, { url: member.github_url, name: "Github URL"}, { url: member.instagram_url, name: "Instagram URL"}, { url: member.linkedin_url, name: "LinkedIn URL"}, { url: member.lattes_url, name: "Lattes URL"}].map((params) => {
                if(!isValidURL(params.url)) throw new ValidationExceptionError(400, "Bad Request: Not Valid " + params.name); 
            });
            
            const response = await Axios.get(member.photo, {responseType: 'arraybuffer'});
            
            if(response.headers["content-length"] > 943718) {
                throw new ValidationExceptionError(413, "File over 0.9MiB");
            }
            
            const name = normalizeString(member.name, "name");
            const matricula = normalizeString(member.matricula, "matricula");
            const photo = Buffer.from(response.data).toString('base64');

            const result = await prisma.member.create({
                data:{
                    name: name,
                    matricula: matricula,
                    photo: photo,
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
                if(err.code == "P2002") throw new ValidationExceptionError(409, "Bad Request: " + member.matricula + " - Já Cadastrado")
            } 

            throw err;
        }
    };

    public async update(member: Zod.infer<typeof MemberUpdateRequestSchema>) {
        const requestRef = member;

        requestRef.matricula = normalizeString(member.matricula, "matricula");

        try {
            if(member.photo) {
                const response = await Axios.get(member.photo, {responseType: 'arraybuffer'});
                
                if(response.headers["content-length"] > 943718) {
                    throw new ValidationExceptionError(413, "File over 0.9MiB");
                }
    
                requestRef.photo = Buffer.from(response.data).toString('base64');
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
            if(err instanceof ValidationExceptionError) throw err;

            throw err; 
        }
    };
}