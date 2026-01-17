import { prisma } from "@/lib/prisma";
import { Role, PositionType, ApplicantStatus } from "generated/prisma/enums";
import bcrypt from "bcrypt";

async function main() {
    const company = await prisma.company.create({
        data: {
            name: "PT Maju Jaya",
            email: "contact@majujaya.com",
            phone: "08123456789",
            address: "Jakarta",
        },
    });

    const password = await bcrypt.hash("Password123!", 10);

    const admin = await prisma.user.create({
        data: {
            companyId: company.id,
            email: "admin@majujaya.com",
            password,
            fullName: "Admin Maju Jaya",
            role: Role.ADMIN,
        },
    });

    const recruiter = await prisma.user.create({
        data: {
            companyId: company.id,
            email: "recruiter@majujaya.com",
            password,
            fullName: "Recruiter Maju Jaya",
            role: Role.RECRUITER,
        },
    });

    const frontendPosition = await prisma.position.create({
        data: {
            companyId: company.id,
            title: "Frontend Developer",
            location: "Remote",
            type: PositionType.FULL_TIME,
            description: "Build and maintain web UI using React",
            salary: "8 - 12 juta",
            createdBy: admin.id,
        },
    });

    const backendPosition = await prisma.position.create({
        data: {
            companyId: company.id,
            title: "Backend Developer",
            location: "Jakarta",
            type: PositionType.CONTRACT,
            description: "Build REST API using Node.js",
            salary: "10 - 15 juta",
            createdBy: admin.id,
        },
    });

    await prisma.applicant.createMany({
        data: [
            {
                positionId: frontendPosition.id,
                fullName: "Ahmad Rizki",
                email: "ahmad@email.com",
                phone: "0811111111",
                education: "S1 Informatika",
                experience: 2,
                resumeUrl: "https://example.com/resume/ahmad.pdf",
                status: ApplicantStatus.APPLIED,
            },
            {
                positionId: backendPosition.id,
                fullName: "Budi Santoso",
                email: "budi@email.com",
                phone: "0822222222",
                education: "D3 Informatika",
                experience: 3,
                resumeUrl: "https://example.com/resume/budi.pdf",
                status: ApplicantStatus.INTERVIEW,
            },
        ],
    });

    console.log("🌱 Seed data inserted successfully");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
