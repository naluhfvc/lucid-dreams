export interface DreamRegisterDTO {
    title: string;
    description: string;
    date: string;
}

export interface DreamDTO {
    id: string;
    title: string;
    description: string;
    date: string;
    userId: string;
    image?: string;
}
