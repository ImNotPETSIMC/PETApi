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
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found"); 
            }

            throw err; 
        }
    };
}