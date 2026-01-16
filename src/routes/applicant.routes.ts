import express from "express";
import * as applicantController from "../controllers/applicant.controller";
import { validateRequest } from "@/middlewares/requestValidator.middleware";
import { createApplicantSchema } from "@/requests/applicantRequests";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { getAllApplicantSchema } from "@/requests/applicantRequests/getAllApplicants.schema";

const router = express.Router();

router.post(
    "/",
    validateRequest(createApplicantSchema),
    applicantController.createApplicant
);

router.get(
    "/",
    authMiddleware,
    validateRequest(getAllApplicantSchema),
    applicantController.getAllApplicants
);

export default router;
