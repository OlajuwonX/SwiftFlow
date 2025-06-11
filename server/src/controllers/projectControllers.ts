import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProjects = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
       const projects = await prisma.project.findMany(); 
       res.json(projects);
    } catch (error: any) {
        res
        .status(500)
        .json({ message: `Error retrieving projects: ${error.message} `});
    }
};

export const createProject = async(
    req: Request,
    res: Response
): Promise<void> => {
    const { 
        name, 
        description, 
        startDate, 
        endDate 
    } = req.body;

    console.log('Received project data:', { name, description, startDate, endDate });

    // trying to validate the required fields
    if (!name) {
        console.warn('Validation failed: Missing project name');
        res.status(400).json({ error: 'Project name is required' });
        return;
    }

    // trying to validate the date fields
    if (startDate && isNaN(Date.parse(startDate))) {
        console.warn('Invalid startDate format:', startDate);
        res.status(400).json({ error: 'Invalid startDate format. Use ISO string' });
        return;
    }

    try {
       const newProject = await prisma.project.create({
        data: {
            name,
            description: description || null, //to handle optional field
            startDate: startDate? new Date(startDate) : null,
            endDate: endDate ? new Date(endDate) : null
        }
       }); 

       console.log('Successfully created project:', newProject);

       res
       .status(201)
       .json(newProject);
    } catch (error: any) {
         console.error('Project creation failed:', {
            error: error.message,
            stack: error.stack,
            prismaErrorCode: error.code,
            meta: error.meta
        });

        res.status(500).json({ 
            error: 'Failed to create project',
            ...(process.env.NODE_ENV !== 'production' && {
                details: error.message
            })
        });
    }
};