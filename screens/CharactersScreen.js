import * as React from 'react';
import { Button, View, Text, SafeAreaView, TextInput, Image } from 'react-native';
import { CharacterList } from '../lists/CharacterList';

function CharactersScreen({ }) {

    return (
        <View>
            <CharacterList />
        </View>
    );
}

export default CharactersScreen