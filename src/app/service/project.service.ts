import { normalizeString } from "../helper/normalizeString";
import { ValidationExceptionError } from "../exception/validation.exception";
import { prisma } from "../database/prisma";
import { Prisma } from "@prisma/client";
import { ProjectCreateRequestSchema, ProjectRemoveRequestSchema, ProjectSearchRequestSchema, ProjectUpdateRequestSchema } from "../schemas/project.schemas";
import Axios, { AxiosError } from "axios";

export default class ProjectService {
    public async search(project: Zod.infer<typeof ProjectSearchRequestSchema>) {
        const requestRef = project;

        if(project.name) requestRef.name = normalizeString(project.name, "name");

        try {
            const projects = await prisma.project.findMany({
                where: {
                    name: { contains: requestRef.name },
                    subtitle: { contains: requestRef.subtitle },
                    description: { contains: requestRef.description },
                    status: { startsWith: requestRef.status },
                    type: { contains: requestRef.type }
                },
            })

            return {
                projects
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

            if(base64Photo.slice(0, 5) != '/9j/4' && base64Photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");

            const result = await prisma.project.create({
                data : {
                    name: name,
                    type: project.type,
                    subtitle: project.subtitle,
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
                if(err.code == "P2002") throw new ValidationExceptionError(400, "Bad Request: " + name + " - Já Cadastrado")
            } 

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
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

                if(requestRef.photo.slice(0, 5) != '/9j/4' && requestRef.photo.charAt(0) != 'i') throw new ValidationExceptionError(400, "Bad Request: Unsupported image extension, try using .jpg or .png");
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

            if(err instanceof AxiosError) {
                throw new ValidationExceptionError(400, "Bad Request: Axios failed to retrieve photo.")
            }
        
            throw err;
        }
    };

    public async remove(project: Zod.infer<typeof ProjectRemoveRequestSchema>) {
        const requestRef = project;

        requestRef.name = normalizeString(project.name, "name");

        try {
            const project = await prisma.project.delete({
                where : {
                    name: requestRef.name
                }
            });
            
            return {
                ...project
            };
        } catch(err) { 
            if(err instanceof Prisma.PrismaClientKnownRequestError) {
                if(err.code == "P2025") throw new ValidationExceptionError(404, requestRef.name + " - Project not found"); 
            } 
        
            throw err;
        }
    };
}