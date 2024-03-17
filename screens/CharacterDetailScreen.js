import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const { dataID } = route.params;

    if (dataID) {
      setCharacter(dataID);
    }
  }, []);

  return (
    <View style={styles.container}>
      {character && (
        <View style={styles.item}>
          <Image source={{ uri: character.image }} style={styles.image} />
          <Text style={styles.text}>Name: {character.name}</Text>
          <Text style={styles.text}>Status: {character.status}</Text>
          <Text style={styles.text}>Gender: {character.gender}</Text>
          <Text style={styles.text}>Origin Name: {character.origin.name}</Text>
          <Text style={styles.text}>Location: {character.location.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
  },
  item: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
    aspectRatio: 16/9,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default CharacterDetailScreen;
