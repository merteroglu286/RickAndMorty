import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';

const Character = ({ character }) => {
  const nav = useNavigation();

  const handleAddToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favorites = [];
      if (existingFavorites) {
        favorites = JSON.parse(existingFavorites);
      }

      if (favorites.find(favorite => favorite.id === character.id)) {
        showAlert('Favori karakter zaten ekli', 'Bu karakter zaten favorilere eklenmiş.');
        return;
      }

      if (favorites.length >= 10) {
        showMaxFavoritesNotification();
        showAlert('Favori karakter ekleme sınırı aşıldı', 'Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.');
        return;
      }

      favorites.push(character);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.log('Error saving to favorites:', error);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(
      title,
      message,
      [{ text: 'Tamam' }],
      { cancelable: false }
    );
  };

  const showMaxFavoritesNotification = () => {

    const channelId = "test_channel";

    if (!PushNotification.isPushNotificationInitialized()) {
      console.log("Hata: PushNotification kütüphanesi başlatılmadı!");
      return;
    }

    PushNotification.localNotification({
      title: "Favori karakter ekleme sınırı aşıldı",
      message: "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.",
      channelId,
    });
  };

  return (
    <TouchableOpacity onPress={() => nav.navigate("CharacterDetailScreen", { dataID: character })}>
      <View style={styles.container}>
        <Image source={{ uri: character.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{character.name}</Text>
          <Text style={styles.id}>{character.id}</Text>
        </View>
        <Button title="Favorilere Ekle" onPress={handleAddToFavorites} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  id: {
    color: "#888",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  }
});

export default Character;