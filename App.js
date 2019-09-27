import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Dimensions,
  Image
} from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import * as Permissions from "expo-permissions";

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null
    // locations: locations
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, () =>
          console.log("State:", this.state)
        )
    );
    error => console.log("Error:", error);
  }

  render() {
    const { latitude, longitude } = this.state;
    if (latitude) {
      return (
        <MapView
          provider="google"
          mapType="mutedStandard"
          showsUserLocation
          // followsUserLocation
          showsMyLocationButton
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 40.712772,
            longitude: -74.006058,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        ></MapView>
      );
    }
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>We need your permission!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
