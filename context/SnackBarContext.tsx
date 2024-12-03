import React, { createContext, useContext, ReactNode, FC } from 'react';
import Toast from 'react-native-toast-message';

interface SnackbarContextType {
    showSnackbar: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = (): SnackbarContextType => {
    const context = useContext(SnackbarContext);
    if (!context) {
        throw new Error('useSnackbar must be used within a SnackbarProvider');
    }
    return context;
};

interface SnackbarProviderProps {
    children: ReactNode;
}

export const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
    const showSnackbar = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
        Toast.show({
            type,
            text1: message,
        });
    };

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <Toast />
        </SnackbarContext.Provider>
    );
};
