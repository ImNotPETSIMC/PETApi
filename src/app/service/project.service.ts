import { normalizeString } from "../helper/normalizeString";
import { ValidationExceptionError } from "../exception/validation.exception";
import { prisma } from "../database/prisma";

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
                data: project
            };
        } catch(err: any) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 
            
            throw new ValidationExceptionError(400, err); 
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
                data: projects
            };
        } catch(err: any) { 
            if(err instanceof ValidationExceptionError) throw err;
            if(err.toString()) throw new ValidationExceptionError(400, err.toString()); 
            
            throw new ValidationExceptionError(400, err); 
        }
    };
}