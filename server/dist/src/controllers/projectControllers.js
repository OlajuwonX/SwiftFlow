"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProject = exports.getProjects = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield prisma.project.findMany();
        res.json(projects);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: `Error retrieving projects: ${error.message} ` });
    }
});
exports.getProjects = getProjects;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, startDate, endDate } = req.body;
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
        const newProject = yield prisma.project.create({
            data: {
                name,
                description: description || null, //to handle optional field
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null
            }
        });
        console.log('Successfully created project:', newProject);
        res
            .status(201)
            .json(newProject);
    }
    catch (error) {
        console.error('Project creation failed:', {
            error: error.message,
            stack: error.stack,
            prismaErrorCode: error.code,
            meta: error.meta
        });
        res.status(500).json(Object.assign({ error: 'Failed to create project' }, (process.env.NODE_ENV !== 'production' && {
            details: error.message
        })));
    }
});
exports.createProject = createProject;
