import React, { useEffect, useRef, useState } from "react";
import { DreamHomeCardDTO } from "../../dtos/DreamHomeCardDTO";
import { get, getDatabase, ref } from "firebase/database";
import { useAuth } from "../../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, Card, Text, Tooltip } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import theme from "@/utils/theme";

const defaultImage = "https://via.placeholder.com/150";

export const MyDreamsScreen = () => {
    const titleRef = useRef<HTMLDivElement>(null);
    const [isOverflowed, setIsOverflowed] = useState(false);
    const [chooseFormatting, setChooseFormatting] = useState<number[]>([]);
    const [isSelectedLeft, setIsSelectedLeft] = useState(true);
    const [dreamsData, setDreamsData] = useState<DreamHomeCardDTO[]>([]);
    const { getLoggedId } = useAuth();
    const db = getDatabase();

    useEffect(() => {
        if (titleRef.current) {
            setIsOverflowed(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, []);

    useEffect(() => {
        const fetchDreamsData = async () => {
            const userId = getLoggedId();
            const dreamsRef = ref(db, `dreams/${userId}`);
            const snapshot = await get(dreamsRef);

            if (snapshot.exists()) {
                const data: DreamHomeCardDTO[] = Object.values(snapshot.val());
                const sortedData = data
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 6);
                setDreamsData(sortedData);
                console.log(sortedData);
            } else {
                setDreamsData([]);
            }
        };

        fetchDreamsData();
    }, []);

    const handleLeftButtonClick = () => {
        setIsSelectedLeft(true);
        setChooseFormatting(Array(dreamsData.length).fill(3));
    };

    const handleRightButtonClick = () => {
        setIsSelectedLeft(false);
        setChooseFormatting(Array(dreamsData.length).fill(6));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Meus Sonhos</Text>
                <View style={styles.buttonGroup}>
                    <Button
                        mode={isSelectedLeft ? 'contained' : 'outlined'}
                        onPress={handleLeftButtonClick}
                        style={styles.button}
                    >
                        <MaterialIcons name="view-compact" size={24} color={theme.colors.primary} />
                    </Button>
                    <Button
                        mode={!isSelectedLeft ? 'contained' : 'outlined'}
                        onPress={handleRightButtonClick}
                        style={styles.button}
                    >
                        <MaterialIcons name="dashboard" size={24} color={theme.colors.primary} />
                    </Button>
                </View>
            </View>

            <View style={styles.cardsContainer}>
                {dreamsData.map((dream, index) => (
                    <Card
                        key={dream?.id}
                        style={[
                            styles.card,
                            { width: chooseFormatting[index] === 3 ? '30%' : '45%' }, // Ajusta largura conforme formatação
                        ]}
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
        marginHorizontal: 4,
    },
    cardsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 16,
    },
    card: {
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