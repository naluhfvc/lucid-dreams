import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useRouter } from "expo-router";
import { loginUser, signInWithGoogle } from "../../../controllers/AuthController";
import { useAuth } from "../../../context/AuthContext";
import { validateEmail } from "../../../utils/validationsUtils";
import { FontAwesome } from '@expo/vector-icons';

interface LoginForm {
    email: string;
    password: string;
}

export default function LoginPage() {
    const [loginForm, setLoginForm] = useState<LoginForm>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();
    const authContext = useAuth();

    const handleChange = (name: keyof LoginForm, value: string) => {
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setLoading(true);

        let errorMessage = "";
        if (!loginForm.email || !loginForm.password) {
            errorMessage = "Todos os campos são obrigatórios.";
        } else if (!validateEmail(loginForm.email)) {
            errorMessage = "O E-mail fornecido não é válido.";
        }

        if (errorMessage) {
            Alert.alert("Erro", errorMessage);
            setLoading(false);
            return;
        }

        try {
            const response = await loginUser(loginForm);
            if (!response.success) {
                throw new Error(response?.message);
            }

            if(!response?.data)
                return;

            Alert.alert("Sucesso", "Login realizado com sucesso!");
            authContext?.login(response!.data);

            setTimeout(() => {
                router.navigate("/app");
            }, 1500);
        } catch (error: any) {
            Alert.alert("Erro", error?.message || "Erro ao realizar login. Verifique os dados e tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error: any) {
            Alert.alert("Erro", error?.message || "Erro ao realizar login com o Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Faça login em sua conta</Text>
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={loginForm.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={loginForm.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.navigate("/auth/register")}>
                <Text style={styles.createAccount}>Criar conta</Text>
            </TouchableOpacity>
            <View style={{width: "100%", backgroundColor: "#cecece", marginVertical: 30, height: 1}}>

            </View>
            <TouchableOpacity
                style={[styles.googleButton, loading && styles.buttonDisabled]}
                onPress={handleGoogleLogin}
                disabled={loading}
            >
                <FontAwesome name="google" size={24} color="#EA4335" style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Login com Google</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    createAccount: {
        color: "#1976d2",
        fontWeight: 'bold'
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#1976d2",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 15,
    },
    buttonDisabled: {
        backgroundColor: "#a7a7a7",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    link: {
        color: "#6200ea",
        marginBottom: 15,
        textDecorationLine: "underline",
    },
    googleButton: {
        width: "100%",
        height: 50,
        borderColor: "#EA4335",
        borderWidth: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        flexDirection: "row",
        marginTop: 15,
    },
    googleButtonText: {
        color: "#EA4335",
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 10,
    },
    googleIcon: {
        marginRight: 10,
    },
});