import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    User,
    UserCredential,
} from "firebase/auth";
import { auth, googleProvider, database } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { ref, set } from "firebase/database";
import { UserDTO, UserLoginDTO, UserRegisterDTO, UserResponseLoginDTO } from "../dtos/UserDTOs";
import { createResponse, ResponseDTO } from "../dtos/ResponseDTOs";
import { mapUserToDTO } from "../utils/mappers";

export const loginUser = async (credential: UserLoginDTO): Promise<ResponseDTO<UserResponseLoginDTO | null>> => {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, credential.email, credential.password);
        
        if(!userCredential.user.emailVerified) {
            return createResponse(false, null, "Não foi possível realizar login. Email não confirmado.");
        }

        const userResponseDTO: UserResponseLoginDTO = {
            uid: userCredential.user.uid,
            email: userCredential.user.email
        };
        
        return createResponse(true, userResponseDTO, "Login realizado com sucesso.");
    } catch (error:any) {
        if (error.code === 'auth/invalid-credential')
            return createResponse(false, null, "Credenciais inválidas.");

        return createResponse(false, null, "Falha ao realizar login.");
    }
};

export const registerUser = async (newUser : UserRegisterDTO): Promise<ResponseDTO<UserDTO | null>> => {
    let user: User | null = null;

    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password);
        user = userCredential.user;
        
        if(!user.emailVerified)
            await sendEmailVerification(user);

        const response = await saveUserData(user.uid, newUser);
        if(!response.success)
            throw new Error(response.message)

        const userDTO = mapUserToDTO(user);

        return createResponse(true, userDTO, "Registro realizado com sucesso.");
    } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
            return createResponse(false, null, "Credenciais inválidas.");
        }
        return createResponse(false, null, error?.message ?? "Erro ao cadastrar.");
    }
};

export const signInWithGoogle = async (): Promise<User | undefined> => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user: User = result.user;

        if (!user.emailVerified)
            await sendEmailVerification(user);

        // await saveUserData(user.uid);

        return user;
    } catch (error) {
        console.error("Erro ao fazer login com Google:", error);
    }
};

export const saveUserData = async (
    uid: string,
    userData : UserRegisterDTO
): Promise<ResponseDTO<UserDTO | null>> => {
    try {
        await set(ref(database, `users/${uid}`), {
            name: userData.name,
            email: userData.email,
            dateOfBirth: userData.dateOfBirth,
        });

        return createResponse(true, null, "Salvo com sucesso no banco de dados.");
    } catch (error) {
        return createResponse(false, null, "Erro ao salvar no banco de dados.");
    }
};
