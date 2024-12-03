import React, { useState, useRef, useEffect } from 'react';
import { DreamHomeCardDTO } from "../../dtos/DreamHomeCardDTO";
import { View, ScrollView, StyleSheet } from "react-native";
import { Tooltip, Divider, Text, Button } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
    item: DreamHomeCardDTO;
};

export function DreamsHomeCard({ item }: Props) {

    const titleRef = useRef<HTMLDivElement>(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    useEffect(() => {
        if (titleRef.current) {
            setIsOverflowed(titleRef.current.scrollWidth > titleRef.current.clientWidth);
        }
    }, [item.title]);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Tooltip title={item?.title}>
                    <Text style={styles.title} numberOfLines={1}>
                        {item?.title}
                    </Text>
                </Tooltip>

                <View style={styles.dateContainer}>
                    <FontAwesome name="clock-o" size={16} color="gray" />
                    <Text style={styles.dateText}>
                        {new Date(item.date).toLocaleDateString()}
                    </Text>
                </View>
            </View>

            <Divider style={styles.divider} />

            <ScrollView style={styles.descriptionContainer}>
                <Text style={styles.description}>
                    {item?.description}
                </Text>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                {/* <Button style={styles.button} mode="contained">
                    ESCONDER
                </Button> */}
                <Button style={styles.button} mode="contained">
                    VER MAIS
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        padding: 16,
        marginBottom: 12,
        borderRadius: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderColor: "#cecece",
        borderWidth: 1,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: 200,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    dateText: {
        fontSize: 12,
        color: 'gray',
    },
    divider: {
        marginVertical: 8,
    },
    descriptionContainer: {
        maxHeight: 200,
        overflowY: 'auto',
        paddingTop: 8,
    },
    description: {
        fontSize: 14,
        color: 'gray',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 16,
    },
    button: {
        marginLeft: 8,
    },
});