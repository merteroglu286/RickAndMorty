import React from 'react';
import {View,StyleSheet,Text, FlatList, TouchableOpacity, SafeAreaView, TextInput} from "react-native";
import {useNavigation} from "@react-navigation/native"

export const Episode = ({episode}) =>{

    const nav = useNavigation()

    return (
      <TouchableOpacity
      onPress={()=>{
        
        nav.navigate("EpisodeDetailScreen",{dataID: episode})

      }}>
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}> 

          <View style={styles.item}>
            <Text style={{fontSize:18}}>Bölüm {episode.id}: {episode.name}</Text>
            <Text>{episode.episode}</Text>
            <Text>{episode.air_date}</Text>
        </View>

      </View>
      </TouchableOpacity>
    )

}

const styles = StyleSheet.create({
    item: {
      width:"90%",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      height: 90,
      padding:5,
      flexDirection: "column",
      justifyContent:"center",
      borderRadius: 8,
      margin:8,
    }
  });

  export default Episode;