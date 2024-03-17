import * as React from 'react';
import { Button, View, Text, SafeAreaView, TextInput, Image } from 'react-native';
import { EpisodeList } from '../lists/EpisodeList';
import { CharacterList } from '../lists/CharacterList';

function EpisodesScreen({ }) {

    return (
        <View>
            <EpisodeList />
        </View>
    );
}

export default EpisodesScreen