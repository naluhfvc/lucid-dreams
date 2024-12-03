import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { UserResponseLoginDTO } from "../dtos/UserDTOs";

interface AuthContextType {
    loginResponse: UserResponseLoginDTO | undefined;
    login: (loginRes: UserResponseLoginDTO) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
    getLoggedId: () => string | null;
}

const AuthContext = createContext<AuthContextType>({
    loginResponse: undefined,
    isLoggedIn: () => false,
    login: () => {},
    logout: () => {},
    getLoggedId: () => null,
});

export const useAuth = (): AuthContextType => {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    
    const [uid, setUid] = useState<string | null>(() => {
        return localStorage.getItem('uid');
    });

    const [loginResponse, setLoginResponse] = useState<UserResponseLoginDTO | undefined>(() => {
        if (uid) {
            return {
                uid,
                displayName: '', 
                email: ''     
            };
        }
        return undefined;
    });

    useEffect(() => {
        if (uid) {
            localStorage.setItem('uid', uid);
        } else {
            localStorage.removeItem('uid');
        }
    }, [uid]);

    const isLoggedIn = (): boolean => {
        return uid != null;
    }

    const login = (loginRes: UserResponseLoginDTO) => {
        if (loginRes && loginRes.uid) {
            setUid(loginRes.uid);
            setLoginResponse(loginRes);
        }
    };

    const logout = () => {
        setLoginResponse(undefined);
        setUid(null);
    }

    const getLoggedId = (): string | null => {
        return uid;
    }

    return (
        <AuthContext.Provider
            value={{
                getLoggedId,
                isLoggedIn,
                loginResponse,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
