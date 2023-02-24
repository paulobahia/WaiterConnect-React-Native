import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Scanner(props) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);


    const handleBarCodeScanned = (data: string) => {
        setScanned(true);
        props.onCodeScanned(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    return (
        <View
            className="w-full"
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined :
                    handleBarCodeScanned}
                style={{
                    width: height - 188, height: height,
                    alignSelf: "center"
                }}
            />
        </View>
    );
}