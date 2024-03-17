import * as React from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { EpisodeList } from '../lists/EpisodeList';
import { CharacterList } from '../lists/CharacterList';
import { useNavigation } from '@react-navigation/native';

function HomeScreen({ }) {

  const nav = useNavigation();

  const handlePress = (screenName) => {
    nav.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/rick_and_morty_logo.png')}
        style={styles.logo}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => handlePress('EpisodesScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Bölümler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('CharactersScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Karakterler</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('FavoriteCharactersScreen')} style={styles.button}>
          <Text style={styles.buttonText}>Favori Karakterler</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: '#f0f0f0',
  },
  logo: {
    width: "100%",
    height: 200,
    marginBottom: 20,
  },
  buttonsContainer: {
    marginBottom: 10,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
    margin: 8,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    opacity: 1,
  },
  buttonText: {
    textAlign: "center",
    color: 'white',
  },
});

export default HomeScreen;
