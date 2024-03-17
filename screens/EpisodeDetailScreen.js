import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CharacterList from '../lists/CharacterList';
import CharacterListByUrl from "../lists/CharacterListByUrl"

const EpisodeDetailScreen = ({ route }) => {
  const [episode, setEpisode] = useState(null);

  useEffect(() => {
    const { dataID } = route.params;

    if (dataID) {
      setEpisode(dataID);
    }
  }, []);

  

  return (
    <View style={styles.container}>
      {episode && (
        <View style={styles.title}>
            <Text style={styles.text}>{episode.name}</Text>
            <Text style={{textAlign:"center"}}>{episode.episode}</Text>
            <Text style={{textAlign:"center"}}>{episode.air_date}</Text>
            <CharacterListByUrl style={{flex:1,width:"100%"}} characters={episode.characters}/>
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: 'center',
    backgroundColor: "white"
  },
  title: {
    flex: 1,
    width: "100%",
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold"
  }
});

export default EpisodeDetailScreen;
