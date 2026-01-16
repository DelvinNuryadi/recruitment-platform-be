import express from "express";
import * as applicantController from "../controllers/applicant.controller";
import { validateRequest } from "@/middlewares/requestValidator.middleware";
import {
    createApplicantSchema,
    deleteApplicantSchema,
    getApplicantDetailSchema,
    updateApplicantStatusSchema,
} from "@/requests/applicantRequests";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { getAllApplicantSchema } from "@/requests/applicantRequests";
import { updateApplicantNotesSchema } from "@/requests/applicantRequests";

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

router.get(
    "/:id",
    authMiddleware,
    validateRequest(getApplicantDetailSchema),
    applicantController.getApplicantDetail
);

router.patch(
    "/:id/status",
    authMiddleware,
    validateRequest(updateApplicantStatusSchema),
    applicantController.updateApplicantUpdateStatus
);

router.patch(
    "/:id/notes",
    authMiddleware,
    validateRequest(updateApplicantNotesSchema),
    applicantController.updateApplicantUpdateNotes
);

router.delete(
    "/:id",
    authMiddleware,
    validateRequest(deleteApplicantSchema),
    applicantController.deleteApplicant
);

export default router;
