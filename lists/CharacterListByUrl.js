import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Image, SafeAreaView, TextInput, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native"

const CharacterListByUrl = ({ characters }) => {
  const [characterData, setCharacterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const nav = useNavigation();

  useEffect(() => {
    const fetchCharacters = async () => {
      const promises = characters.map(url => fetch(url).then(response => response.json()));
      const characterDetails = await Promise.all(promises);
      setCharacterData(characterDetails);
    };

    fetchCharacters();
  }, [characters]);

  const searchCharacters = () => {
    const filteredCharacters = characterData.filter(character => {
      return character.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    return filteredCharacters;
  };

  return (
    <View style={styles.container}>
      <Text style={{fontSize:18,textAlign:"center",paddingBottom:8,paddingTop:24,color:"#2ecc71",fontWeight:"bold"}}>Bölüm Karakterleri</Text>
      <SafeAreaView style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Karakter Ara"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </SafeAreaView>
      <FlatList
        style={styles.list}
        data={searchQuery ? searchCharacters() : characterData}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              nav.navigate("CharacterDetailScreen", { dataID: item })
            }}
          >
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.text}>Name: {item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width:"100%"
  },
  searchContainer: {
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#2ecc71",
    paddingHorizontal: 10,
    borderRadius: 8
  },
  list: {
    marginTop: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default CharacterListByUrl;
