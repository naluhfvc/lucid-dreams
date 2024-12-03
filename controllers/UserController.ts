import { database } from "../config/firebase";
import { ref, get } from "firebase/database";
import { UserDTO } from "../dtos/UserDTOs";
import { createResponse, ResponseDTO } from "../dtos/ResponseDTOs";

export const getUserByUID = async (uid: string): Promise<ResponseDTO<UserDTO | null>> => {
    try {
        const userRef = ref(database, `users/${uid}`);
        const snapshot = await get(userRef);

        if (!snapshot.exists()) {
            return createResponse(false, null, "Usuário não encontrado.");
        }

        const userData: UserDTO = snapshot.val();

        return createResponse(true, userData, "Usuário encontrado com sucesso.");
    } catch (error) {
        return createResponse(false, null, "Erro ao buscar usuário no banco de dados.");
    }
};