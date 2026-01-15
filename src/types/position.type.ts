type PositionType = "FULL_TIME" | "PART_TIME" | "CONTRACT";

export type createPositionBodyRequest = {
    title: string;
    location: string;
    type: PositionType;
    description: string;
    salary: string;
    companyId: string;
    createdBy: string;
};

export type getAllPositionResponse = {
    id: string;
    title: string;
    description: string;
    type: PositionType;
    salary: string;
    isActive: boolean;
};

export type getDetailPositionResponse = {
    id: string;
    title: string;
    description: string;
    type: PositionType;
    salary: string;
    isActive: boolean;
    location: string;
    company: {
        id: string;
        name: string;
    };
    creator: {
        id: string;
        fullName: string;
    };
};

export type updatePositionBodyRequest = createPositionBodyRequest;

export type updatePositionResponse = {
    id: string;
    title: string;
    location: string;
    type: PositionType;
    description: string;
    salary: string;
    isActive: boolean;
    companyId: string;
    creator: {
        fullName: string;
    };
};

export type deletePositionResponse = {
    id: string;
    title: string;
    description: string;
};
