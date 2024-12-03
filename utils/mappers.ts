import { User } from "firebase/auth";
import { UserDTO } from "../dtos/UserDTOs";
import { DreamDTO } from "../dtos/DreamDTOs";

export const mapUserToDTO = (user: User): UserDTO => ({
    uid: user.uid,
    name: user.displayName || "",
    email: user.email || "",
    dateOfBirth: null,
    emailVerified: user.emailVerified,
});


export const mapDreamToDTO = (
    id: string,
    title: string,
    description: string,
    date: string,
    userId: string
): DreamDTO => ({
    id,
    title,
    description,
    date,
    userId,
});
