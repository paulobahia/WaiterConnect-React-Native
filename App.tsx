import React from "react";
import { Center, Hidden, NativeBaseProvider } from "native-base";

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center bg="primary.400" _text={{
          color: "white",
          fontWeight: "bold"
        }} height={200} width={{
          base: 200,
          lg: 250
        }}>
          Waiter App
        </Center>
      </Center>
    </NativeBaseProvider>
  );
};
