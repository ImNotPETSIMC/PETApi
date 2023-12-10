import { normalizeString } from "../helper/normalizeString";
import { Member } from "../classes";
import { prisma } from "../database/prisma";
import { ValidationExceptionError } from "../exception/validation.exception";

export default class MemberService {
    public async search(matricula: string) {
        const requestRef = {matricula: normalizeString(matricula, "matricula")}
        
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
}