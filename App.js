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
    // latitude: null,
    // longitude: null,
    // locations: locations
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }
  }
  render() {
    return <MapView style={{ flex: 1 }}></MapView>;
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
