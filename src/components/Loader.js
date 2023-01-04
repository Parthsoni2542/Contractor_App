import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const Loader = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#ff7f50" >

    </ActivityIndicator>
    <View style={{ justifyContent: "center", AlignItem: 'center', marginLeft: 10, }}>
      <Text style={{ color: '#ff7f50', fontWeight: 'bold' }}>Please Wait</Text>
    </View>

  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",

    padding: 10,

  }
});

export default Loader;