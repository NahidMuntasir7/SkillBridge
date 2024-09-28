import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js"; 

// admin will post the job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        // Check if all required fields are present
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        // Validate salary
        const salaryNumber = Number(salary);
        if (isNaN(salaryNumber)) {
            return res.status(400).json({
                message: "Invalid salary value.",
                success: false
            });
        }

        // Validate experienceLevel
        const experienceNumber = Number(experience);
        if (isNaN(experienceNumber)) {
            return res.status(400).json({
                message: "Invalid experience level value.",
                success: false
            });
        }

        // Create a new job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: salaryNumber,
            location,
            jobType,
            experienceLevel: experienceNumber,
            position,
            company: companyId,
            created_by: userId
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while creating the job.",
            success: false
        });
    }
}

// for student 
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching jobs.",
            success: false
        });
    }
}

// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching the job.",
            success: false
        });
    }
}

// how many jobs admin created till now
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching admin jobs.",
            success: false
        });
    }
}

export const deleteJob = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find and delete the job
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Optionally, handle related applications
        await Application.deleteMany({ _id: { $in: job.applications } });

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete the job.",
            success: false
        });
    }
};