import Axios from "axios";
import Zod  from "zod";

import { normalizeString } from "../helper/normalizeString";
import { Member } from "../classes";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";
import { isValidURL } from "../helper/isValidURL";
import { MemberRequestSchema } from "../schemas";


export default class MemberService {
    public async search(matricula: string) {
        const requestRef = { matricula: normalizeString(matricula, "matricula") }
        
        try {
            const member = await prisma.member.findFirst({
                where : {
                    matricula: requestRef.matricula
                }
            });
            
            if(!member) throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found");
            if(!member.projects.length) member.projects.push("🚫")

            return {
                data: member
            };
        } catch(err: any) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 
            
            throw new ValidationExceptionError(400, err); 
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
                if(data.status == status) {
                    const member = new Member(data.name, data.base64Photo, data.matricula, data.admission_year, data.email, data.github_url, data.instagram_url, data.linkedin_url, data.lattes_url, data.status, data.projects);
                    if(!member.projects.length) member.projects.push("🚫")     
                    return { ...member };
                }
            });

            if(!members.toString().length) throw new ValidationExceptionError(404,"No members with status " + status + " found"); 
            
            return {
                data: members
            };
        } catch(err: any) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 
            
            throw new ValidationExceptionError(400, err); 
        }
    };

    public async remove(matricula: string) {
        const requestRef = { matricula: normalizeString(matricula, "matricula") };

        try {
            
            const member = await prisma.member.delete({
                where : {
                    matricula: requestRef.matricula
                }
            });
        
            return {
                data: member
            };

        } catch(err: any) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.matricula + " - Member not found");
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

            throw new ValidationExceptionError(400, err); 
        }
    };

    public async register(member: Zod.infer<typeof MemberRequestSchema>) {
        try {
            [ { url: member.photo_url, name: "Photo URL"}, { url: member.github_url, name: "Github URL"}, { url: member.instagram_url, name: "Instagram URL"}, { url: member.linkedin_url, name: "LinkedIn URL"}, { url: member.lattes_url, name: "Lattes URL"}].map((params) => {
                if(!isValidURL(params.url)) throw new ValidationExceptionError(400, "Bad Request: Not Valid " + params.name); 
            });
            
            const response = await Axios.get(member.photo_url, {responseType: 'arraybuffer'});
            
            if(response.headers["content-length"] > 943718) {
                throw new ValidationExceptionError(413, "File over 0.9MiB");
            }
            
            const name = normalizeString(member.name, "name");
            const matricula = normalizeString(member.matricula, "matricula");
            const base64Photo = Buffer.from(response.data).toString('base64');

            await prisma.member.create({
                data:{
                    name: name,
                    matricula: matricula,
                    base64Photo: base64Photo,
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
                data: member,
            };
        } catch(err: any) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.code == "P2002") throw new ValidationExceptionError(409, "Bad Request: " + member.matricula + " - Já Cadastrado")
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

            throw new ValidationExceptionError(400, err); 
        }
    };
}