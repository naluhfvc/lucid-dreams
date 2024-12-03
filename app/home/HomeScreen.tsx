import React, { useEffect, useState } from 'react';
import { ref, get, getDatabase } from "firebase/database";
import { useAuth } from "@/context/AuthContext";
import { DreamHomeCardDTO } from "@/dtos/DreamHomeCardDTO";
import { Divider, Text } from "react-native-paper";
import { ScrollView, View } from "react-native";
import { DreamsHomeCard } from "./DreamsHomeCard";
import { dreamHomeCardData } from "@/context/seedData";

export function HomeScreen () {
    const [dreamsData, setDreamsData] = useState<DreamHomeCardDTO[]>([]);
    const { getLoggedId } = useAuth();
    const db = getDatabase();
    
    useEffect(() => {
        setDreamsData(dreamHomeCardData);
    }, [])

    // useEffect(() => {
    //     const fetchDreamsData = async () => {
    //         const userId = getLoggedId();
    //         const dreamsRef = ref(db, `dreams/${userId}`);
    //         const snapshot = await get(dreamsRef);

    //         if (snapshot.exists()) {
    //             const data: DreamHomeCardDTO[] = Object.values(snapshot.val());
    //             const sortedData = data
    //                 .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    //                 .slice(0, 6);
    //             setDreamsData(sortedData);
    //         } else {
    //             console.log("Nenhum sonho encontrado para este usuário.");
    //             setDreamsData([]);
    //         }
    //     };

    //     fetchDreamsData();
    // }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={{ marginBottom: 16 }}>
                <Text style={{ fontWeight: "bold" }}>
                    Meus últimos registros
                </Text>
                <Divider style={{ marginVertical: 8 }} />
            </View>
            <View style={{display: 'flex', gap: 10}}>
                {dreamsData.map((item) => (
                    <DreamsHomeCard item={item} key={item.id} />
                ))}
            </View>
        </ScrollView>
    );
};