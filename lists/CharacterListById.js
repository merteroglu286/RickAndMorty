import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const CharacterListById = ({ character }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>Name:{character.name}</Text>
        <Text style={styles.status}>Status: {character.status}</Text>
        <Text style={styles.species}>Species: {character.species}</Text>
        <Text style={styles.gender}>Gender: {character.gender}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  status: {
    fontSize: 14,
    color: "#555",
  },
  species: {
    fontSize: 14,
    color: "#555",
  },
  gender: {
    fontSize: 14,
    color: "#555",
  },
});

export default CharacterListById;
