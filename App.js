import * as React from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import EpisodeDetailScreen from "./screens/EpisodeDetailScreen"
import CharacterDetailScreen from "./screens/CharacterDetailScreen";
import EpisodesScreen from "./screens/EpisodesScreen"
import CharactersScreen from "./screens/CharactersScreen"
import FavoriteCharactersScreen from "./screens/FavoriteCharactersScreen"

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{headerShown:false}}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="EpisodesScreen" component={EpisodesScreen} />
        <Stack.Screen name="CharactersScreen" component={CharactersScreen} />
        <Stack.Screen name="FavoriteCharactersScreen" component={FavoriteCharactersScreen} />
        <Stack.Screen name="EpisodeDetailScreen" component={EpisodeDetailScreen} />
        <Stack.Screen name="CharacterDetailScreen" component={CharacterDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  
}

export default App;
