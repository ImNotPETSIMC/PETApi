import { normalizeString } from "../helper/normalizeString";
import { ValidationExceptionError } from "../exception/validation.exception";
import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";
import { ProjectCreateRequestSchema, ProjectUpdateRequestSchema } from "../schemas";
import Axios from "axios";

export default class ProjectService {
    public async search(name: string) {
        const requestRef = { name: normalizeString(name, "name") }

        try {
            const project = await prisma.project.findFirst({
                where: {
                    name: requestRef.name
                }
            })

            if(!project) throw new ValidationExceptionError(404, requestRef.name + " - Project not found"); 

            return {
                ...project
            };
        } catch(err) { 
            throw err;
        }
    };

    public async show(status: string) {
        try {
            const projects = await prisma.project.findMany({
                where : {
                    status: status
                }
            });

            if(!projects.length) throw new ValidationExceptionError(404,"No projects with status " + status + " found"); 
            
            return {
                ...projects
            };
        } catch(err) {         
            throw err; 
        }
    };

    public async register(project: Zod.infer<typeof ProjectCreateRequestSchema>) {
        const name = normalizeString(project.name, "name");

        try {
            const response = await Axios.get(project.photo, {responseType: 'arraybuffer'});
            const base64Photo = Buffer.from(response.data).toString('base64');

            const result = await prisma.project.create({
                data : {
                    name: name,
                    type: project.type,
                    photo: base64Photo,
                    description: project.description,
                    status: project.status
                }
            })

            return {
                ...result
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2002") throw new ValidationExceptionError(409, "Bad Request: " + name + " - Já Cadastrado")
            } 
        
            throw err;
        }
    };

    public async update(project: Zod.infer<typeof ProjectUpdateRequestSchema>) {
        const requestRef = project;
        
        try {
            if(project.photo) {
                const response = await Axios.get(project.photo, {responseType: 'arraybuffer'});
                requestRef.photo = Buffer.from(response.data).toString('base64');
            };

            const result = await prisma.project.update({
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
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.name + " - Project not found"); 
            } 
        
            throw err;
        }
    };

    // public async add_member(project: string, member: string) {
    //     const requestRef = { project: normalizeString(project, "name"), member: normalizeString(member, "matricula") };

    //     try {   
    //         const project = await prisma.project.findFirst({
    //             where: {
    //                 name: requestRef.project
    //             }
    //         })

    //         const member = await prisma.member.findFirst({
    //             where : {
    //                 matricula: requestRef.member
    //             }
    //         });

            
    //         if(!project) throw new ValidationExceptionError(404, requestRef.project + " - Project not found"); 
    //         if(!member) throw new ValidationExceptionError(404, requestRef.member + " - Member not found");
    //         if(member.projects.includes(project.name)) throw new ValidationExceptionError(400, "Bad Request: " + requestRef.member + " - Membro Já Cadastrado no Projeto " + requestRef.project);  
            
    //         const projectRef = member.projects;
    //         projectRef.push(requestRef.project);

    //         await prisma.member.update({
    //             where: {
    //                 matricula: requestRef.member
    //             },

    //             data: {
    //                 projects: projectRef
    //             }
    //         });

    //         return {
    //             data: {
    //                 member: member, 
    //                 project: project, 
    //             }
    //         };
    //     } catch(err) { 
    //         if(err instanceof ValidationExceptionError) throw err;
    //         if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

    //         throw new ValidationExceptionError(400, err); 
    //     }
    // };

    // public async remove_member(project: string, member: string) {
    //     const requestRef = { project: normalizeString(project, "name"), member: normalizeString(member, "matricula") };
    //     try {   
    //         const project = await prisma.project.findFirst({
    //             where: {
    //                 name: requestRef.project
    //             }
    //         })

    //         const member = await prisma.member.findFirst({
    //             where : {
    //                 matricula: requestRef.member
    //             }
    //         });

    //         if(!project) throw new ValidationExceptionError(404, requestRef.project + " - Project not found"); 
    //         if(!member) throw new ValidationExceptionError(404, requestRef.member + " - Member not found");
    //         if(!member.projects.includes(project.name)) throw new ValidationExceptionError(400, "Bad Request: " + requestRef.member + " - Membro Não Cadastrado no Projeto " + requestRef.project);  
        
    //         const projectRef = member.projects;
    //         const index = projectRef.indexOf(project.name);
    //         projectRef.splice(index, 1);

    //         await prisma.member.update({
    //             where: {
    //                 matricula: requestRef.member
    //             },

    //             data: {
    //                 projects: projectRef
    //             }
    //         });

    //         return {
    //             data: {
    //                 member: member.matricula,
    //                 member_name: member.name,
    //                 project: project.name, 
    //             }
    //         };
    //     } catch(err) {     
    //         throw err; 
    //     }
    // };

    // public async remove(name: string) {
    //     const requestRef = { name: normalizeString(name, "name") };

    //     try {
    //         const project = await prisma.project.delete({
    //             where : {
    //                 name: requestRef.name
    //             }
    //         });
            
    //         return {
    //             name: project.name
    //         };
    //     } catch(err) { 
    //         if(err instanceof ValidationExceptionError) throw err;
    //         if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.name + " - Project not found"); 
    //         if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 

    //         throw new ValidationExceptionError(400, err); 
    //     }
    // };
}