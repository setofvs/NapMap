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
import Polyline from "@mapbox/polyline";
const stations = require("./stations.json");

export default class App extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    stations: stations
  };

  async componentDidMount() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted") {
      const response = await Permissions.askAsync(Permissions.LOCATION);
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        this.setState({ latitude, longitude }, this.mergeCoords),
      error => console.log("Error:", error)
    );

    const {
      stations: [sampleStation]
    } = this.state;

    this.setState(
      {
        desLatitude: sampleStation.coords.latitude,
        desLongitude: sampleStation.coords.longitude
      },
      console.log(this.state),
      this.mergeCoords
    );
  }
  mergeCoords = () => {
    const { latitude, longitude, desLatitude, desLongitude } = this.state;

    const hasStartAndEnd = latitude !== null && desLatitude !== null;

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`;
      const concatEnd = `${desLatitude},${desLongitude}`;
      this.getDirections(concatStart, concatEnd);
    }
  };

  async getDirections(startLoc, desLoc) {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyDtL-Gqej9DslO6FZU49rSS8PFOwNUmFM4`
      );
      const resJson = await res.json();
      console.log("RESJSON HERE", resJson);
      const response = resJson.routes[0];
      console.log("RESPONSE HERE", response);
      const distanceTime = response.legs[0];
      const distance = distanceTime.distance.text;
      const time = distanceTime.duration.text;
      const points = Polyline.decode(
        resJson.routes[0].overview_polyline.points
      );
      const coords = points.map(point => {
        return {
          latitude: point[0],
          longitude: point[1]
        };
      });
      this.setState({ coords, distance, time });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  render() {
    const { latitude, longitude, coords } = this.state;
    if (latitude) {
      return (
        <MapView
          provider="google"
          mapType="mutedStandard"
          showsUserLocation
          followsUserLocation
          showsMyLocationButton
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 40.705084,
            longitude: -74.009162,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }}
        >
          <MapView.Polyline
            strokeWidth={2}
            strokeColor="purple"
            coordinates={coords}
          />
        </MapView>
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
