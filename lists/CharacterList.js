import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, SafeAreaView, TextInput } from "react-native";
import Character from "../components/Character";
import Pagination from "../components/Pagination";

export const CharacterList = () => {
    const [loading, setLoading] = useState(false);
    const [characters, setCharacters] = useState([]);
    const [nextPage, setNextPage] = useState("https://rickandmortyapi.com/api/character");
    const [searchText, setSearchText] = useState("");

    const fetchNextPage = async () => {
        if (loading || !nextPage) {
            return;
        }

        setLoading(true);
        const response = await fetch(nextPage);
        const responseJson = await response.json();

        if (!responseJson.results || responseJson.results.length === 0) {
            setLoading(false);
            return;
        }

        setCharacters((existingCharacters) => {
            return [...existingCharacters, ...responseJson.results];
        });
        setNextPage(responseJson.info.next);
        setLoading(false);
    };



    useEffect(() => {
        fetchNextPage();
    }, []);

    const filterCharacters = () => {
        return characters.filter((character) => {
            const lowerCaseSearchText = searchText.toLowerCase();
            return (
                character.name.toLowerCase().includes(lowerCaseSearchText) ||
                character.status.toLowerCase().includes(lowerCaseSearchText) ||
                character.species.toLowerCase().includes(lowerCaseSearchText) ||
                character.gender.toLowerCase().includes(lowerCaseSearchText)
            );
        });
    };

    return (
        <View>
            <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                <TextInput
                    style={{ width: "100%", height: 40, marginTop: 40, borderWidth: 1, borderColor: "#2ecc71", borderRadius: 8, paddingHorizontal: 20 }}
                    placeholder="Karakter ara (name,status,species,gender...)"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setSearchText(text)}
                />
            </SafeAreaView>
            <FlatList
                style={{ marginTop: 100 }}
                data={filterCharacters()}
                renderItem={({ item }) => <Character character={item} />}
                contentContainerStyle={{ gap: 10 }}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={5}
                ListFooterComponent={() => <Pagination loading={loading} fetchNextPage={fetchNextPage} />}
            />
        </View>
    );
};