import React from 'react';
import { View, Text, StyleSheet, Image, useColorScheme, TouchableOpacity, ScrollView } from 'react-native';

const Copyright = () => {
    const colorScheme = useColorScheme(); // Detecta o tema do sistema

    return (
        <View style={[styles.copyrightContainer, colorScheme === 'dark' && styles.darkBackground]}>
            <Text style={styles.copyrightText}>
                {'Copyright © '}
                <TouchableOpacity onPress={() => console.log('Navigating to Lucid Dreams')}>
                    <Text style={styles.linkText}>Lucid Dreams</Text>
                </TouchableOpacity>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Text>
        </View>
    );
};

const FormLogo = () => {
    return (
        <View style={styles.logoContainer}>
            <Image
                source={{ uri: 'https://example.com/7f3f20b58ae010ac38b20ff44ab03ae7.png' }} // Adapte a URL conforme necessário
                style={styles.logoImage}
                resizeMode="contain"
            />
        </View>
    );
};

const LoginLayout = ({ children } : any) => {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.formContainer}>
                    <View style={styles.paper}>
                        {children}
                    </View>
                </View>
            </ScrollView>
            <Copyright />
        </View>
    );
};

export default LoginLayout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#f5f5f5', // Ajuste conforme necessário para cores claras ou use dynamic themes
        justifyContent: 'space-between',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    formContainer: {
        alignSelf: 'center',
        width: '90%',
        maxWidth: 400,
        marginBottom: 20,
    },
    paper: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logoImage: {
        width: '50%',
        height: 100,
    },
    copyrightContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#333', // Cor de fundo padrão
    },
    darkBackground: {
        backgroundColor: '#000',
    },
    copyrightText: {
        color: 'white',
        fontSize: 14,
    },
    linkText: {
        color: '#1e90ff', // Azul para links
        textDecorationLine: 'underline',
    },
});
