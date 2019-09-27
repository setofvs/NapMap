import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
// import { MapView} from react-native-MSG

export default function App() {
  const [outputText, setOutputText] = useState("Hello Rory!");
  return (
    <View style={styles.container}>
      <Text>{outputText}</Text>
      <Button
        title="Change Text"
        onPress={() => setOutputText("Hello Bobsti!")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
