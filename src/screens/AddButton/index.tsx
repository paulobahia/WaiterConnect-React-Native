import React from 'react';
import { View, StyleSheet, TouchableHighlight, Animated } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";

export function AddButton() {

    let mode = new Animated.Value(0);
    let buttonSize = new Animated.Value(1);

    const billX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, 24]
    });

    const billY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -110]
    });

    const orderX = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-24, -72]
    });

    const orderY = mode.interpolate({
        inputRange: [0, 1],
        outputRange: [-50, -110]
    });

    const rotation = mode.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "45deg"]
    });

    const sizeStyle = {
        transform: [{ scale: buttonSize }]
    };

    function handlePress() {
        Animated.sequence([
            Animated.timing(buttonSize, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(buttonSize, {
                toValue: 1,
                useNativeDriver: true
            }),
            Animated.timing(mode, {
                useNativeDriver: false ? true : false,
                /* @ts-ignore */
                toValue: mode._value === 0 ? 1 : 0
            })
        ]).start();
    };

    return (
        <View style={{ position: "absolute", alignItems: "center" }}>
            <Animated.View style={{ position: "absolute", left: billX, top: billY }}>
                <View style={styles.secondaryButton}>
                    <Feather name="plus" size={24} color="#FFF" />
                </View>
            </Animated.View>
            <Animated.View style={{ position: "absolute", left: orderX, top: orderY }}>
                <View style={styles.secondaryButton}>
                    <Feather name="plus" size={24} color="#FFF" />
                </View>
            </Animated.View>
            <Animated.View style={[styles.button, sizeStyle]}>
                <TouchableHighlight onPress={handlePress}>
                    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                        <FontAwesome5 name="plus" size={24} color="#FFF" />
                    </Animated.View>
                </TouchableHighlight>
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 60,
        height: 60,
        borderRadius: 36,
        backgroundColor: "#0c192b",
        position: "absolute",
        marginTop: -60,
        shadowColor: "#0c192b",
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#0c192b"
    }
});