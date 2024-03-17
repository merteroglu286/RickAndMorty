import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const FavoriteCharactersScreen = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const nav = useNavigation()

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favoritesJson = await AsyncStorage.getItem('favorites');
        if (favoritesJson !== null) {
          const favorites = JSON.parse(favoritesJson);
          setFavoriteCharacters(favorites);
        }
      } catch (error) {
        console.log('Error retrieving favorites:', error);
      }
    };

    getFavorites();
  }, []);

  const removeFromFavorites = async (characterId, characterName) => {
    try {
      Alert.alert(
        `Favorilerden Kaldır`,
        `“${characterName}” isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
        [
          {
            text: 'Hayır',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Evet',
            onPress: async () => {
              const updatedFavorites = favoriteCharacters.filter(character => character.id !== characterId);
              await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
              setFavoriteCharacters(updatedFavorites);
            }
          }
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log('Error removing from favorites:', error);
    }
  };

  const renderCharacterItem = (character) => (
    <TouchableOpacity onPress={() => nav.navigate("CharacterDetailScreen", { dataID: character })}>
      <View style={styles.item}>
        <Text style={{fontSize:18, marginBottom:12}}>{character.name}</Text>
        <Image source={{ uri: character.image }} style={styles.image} />
        <Text key={character.id} onPress={() => removeFromFavorites(character.id, character.name)} style={styles.removeButton}>Kaldır</Text>
      </View>
    </TouchableOpacity>
  );

  const renderCharacters = () => {
    const items = favoriteCharacters.map((character, index) => {
      if (index % 2 === 0) {
        return (
          <View style={styles.rowContainer} key={index}>
            {renderCharacterItem(character)}
            {index + 1 < favoriteCharacters.length && renderCharacterItem(favoriteCharacters[index + 1])}
          </View>
        );
      }
    });
    return items;
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderCharacters()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal:10,
    paddingTop:40
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 25,
    marginBottom: 5,
  },
  removeButton: {
    color: 'red',
    fontSize:16,
    marginTop: 8,
    opacity:1
  },
});

export default FavoriteCharactersScreen;
