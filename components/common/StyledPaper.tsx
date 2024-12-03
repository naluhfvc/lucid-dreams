import React from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';

type Props = {
    children: React.ReactNode;
    [key: string]: any;
};

const StyledView: React.FC<Props> = ({ children, style, ...props }) => {
    const colorScheme = useColorScheme(); // Detecta o tema atual (dark ou light)

    return (
        <View
            style={[
                styles.container,
                colorScheme === 'dark' ? styles.dark : styles.light,
                style, // Permite passar estilos adicionais via props
            ]}
            {...props}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16, // Equivale a theme.spacing(3) em Material-UI
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    dark: {
        backgroundColor: '#333', // Ou outra cor apropriada para o tema escuro
    },
    light: {
        backgroundColor: '#fafafa', // Cor clara para o tema claro
    },
});

export default StyledView;
