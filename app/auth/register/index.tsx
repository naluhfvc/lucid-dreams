import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Button } from "react-native";
import { useRouter } from "expo-router";
import { validateDateOfBirth, validateEmail } from "@/utils/validationsUtils";
import { registerUser, signInWithGoogle } from "@/controllers/AuthController";
import { UserRegisterDTO } from "@/dtos/UserDTOs";

export default function RegisterScreen () {
    const [registerForm, setRegisterForm] = useState<UserRegisterDTO>({
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
    });

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setLoading(true);

        let errorMessage = "";

        if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.dateOfBirth)
            errorMessage = "Todos os campos são obrigatórios.";

        if (errorMessage === "" && !validateEmail(registerForm.email))
            errorMessage = "O E-mail fornecido não é válido.";

        if (errorMessage === "" && !validateDateOfBirth(registerForm.dateOfBirth))
            errorMessage = "A data de nascimento deve ser uma data válida.";

        if (errorMessage === "" && registerForm.password.length < 6)
            errorMessage = "A senha deve ter no mínimo 6 caracteres.";

        if (errorMessage) {
            Alert.alert("error", errorMessage);
            setLoading(false);
            return;
        }

        try {
            const response = await registerUser(registerForm);
            if (!response.success)
                throw new Error(response?.message?.toString());

            Alert.alert("success", "Cadastro realizado com sucesso!");

            setTimeout(() => {
                router.push("/auth/login");
            }, 1500);
        } catch (error: any) {
            const errorMessage = error?.message || "Erro ao realizar registro. Verifique os dados e tente novamente.";
            Alert.alert("error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (name: keyof UserRegisterDTO, value: string) => {
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithGoogle();
        } catch (error) {
            Alert.alert("error", "Erro ao fazer login com Google.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Crie uma nova conta</Text>

            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={registerForm.name}
                onChangeText={(value) => handleChange("name", value)}
            />

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={registerForm.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={registerForm.password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry
            />

            <TextInput
                style={styles.input}
                placeholder="Data de Nascimento"
                value={registerForm.dateOfBirth}
                onChangeText={(value) => handleChange("dateOfBirth", value)}
                keyboardType="default"
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Criar conta</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/auth/login")}>
                <Text style={styles.link}>Já tenho conta</Text>
            </TouchableOpacity>
        </View>
    );
};

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
        color: "#1976d2",
        marginBottom: 15,
        textDecorationLine: "underline",
    }
});