import React, { useEffect, useRef, useState } from "react";
import { DreamHomeCardDTO } from "../../dtos/DreamHomeCardDTO";
import { get, getDatabase, ref } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Divider, Text, Tooltip } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import theme from "@/utils/theme";
import { dreamHomeCardData } from "@/context/seedData";

const defaultImage = "https://via.placeholder.com/150";

export const MyDreamsScreen = () => {
    const [dreamsData, setDreamsData]  = useState<DreamHomeCardDTO[]>([]);
    const { getLoggedId } = useAuth();
    const db = getDatabase();

    useEffect(() => {
        setDreamsData(dreamHomeCardData);
    }, []);

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
    //             console.log(sortedData);
    //         } else {
    //             setDreamsData([]);
    //         }
    //     };

    //     fetchDreamsData();
    // }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Sonhos</Text>
            </View>
            <Divider style={styles.divider}/>
            <View style={styles.cardsContainer}>
                {dreamsData.map((dream) => (
                    <Card
                        key={dream?.id}
                        style={styles.card}
                    >
                        <Card.Content>
                            <img
                                src={dream?.imageBase64 || defaultImage}
                                style={styles.image}
                            />
                            {
                                dream?.title?.length > 20 ? (
                                    <Tooltip title={dream?.title}>
                                        <>
                                            <Text style={styles.title} numberOfLines={1}>
                                                {dream?.title}
                                            </Text>
                                        </>
                                    </Tooltip>
                                ) : (
                                    <Text style={styles.title} numberOfLines={1}>
                                        {dream?.title}
                                    </Text>
                                )
                            }
                            <Text style={styles.description}>{dream?.description}</Text>
                            <Text style={styles.date}>Data: {new Date(dream?.date).toLocaleDateString()}</Text>
                        </Card.Content>
                    </Card>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    divider: {
        marginBottom: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 8,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    card: {
        width: "100%",
        padding: 8,
        marginBottom: 16,
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    image: {
        height: 140,
        borderRadius: 8,
        marginBottom: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    description: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 4,
    },
    date: {
        fontSize: 12,
        color: 'gray',
    },
});