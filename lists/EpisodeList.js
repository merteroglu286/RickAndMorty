/*import React, { useEffect, useState } from "react";
import { FlatList, View, ActivityIndicator, Text, SafeAreaView, TextInput } from "react-native";
import Episode from "../components/Episode";

export const EpisodeList = () => {
    const [loading, setLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    const [nextPage, setNextPage] = useState("https://rickandmortyapi.com/api/episode");
    const [searchText, setSearchText] = useState("");

    const fetchNextPage = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        const response = await fetch(nextPage);
        const responseJson = await response.json();
        setEpisodes((existingEpisodes) => {
            return [...existingEpisodes, ...responseJson.results];
        });
        setNextPage(responseJson.info.next);
        setLoading(false);
    };

    useEffect(() => {
        fetchNextPage();
    }, []);

    const filterEpisodes = () => {
        return episodes.filter((episode) => {
            const lowerCaseSearchText = searchText.toLowerCase();
            return (
                episode.name.toLowerCase().includes(lowerCaseSearchText) ||
                episode.episode.toLowerCase().includes(lowerCaseSearchText)
            );
        });
    };

    return (
        <View>
            <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                <TextInput
                    style={{ width: "100%", height: 40, marginTop: 40, borderWidth: 1, borderColor: "#2ecc71", borderRadius:8, paddingHorizontal:20}}
                    placeholder="Bölüm Ara"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setSearchText(text)}
                />
            </SafeAreaView>
            <FlatList
                style={{ marginTop: 100 }}
                data={filterEpisodes()}
                renderItem={({ item }) => <Episode episode={item} />}
                contentContainerStyle={{ gap: 10 }}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={5}
                ListFooterComponent={() => loading && <ActivityIndicator />}
            />
        </View>
    );
};
*/

import React, { useEffect, useState } from "react";
import { FlatList, View, SafeAreaView, TextInput } from "react-native";
import Episode from "../components/Episode";
import Pagination from "../components/Pagination";

export const EpisodeList = () => {
    const [loading, setLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);
    const [nextPage, setNextPage] = useState("https://rickandmortyapi.com/api/episode");
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

        setEpisodes((existingEpisodes) => {
            return [...existingEpisodes, ...responseJson.results];
        });
        setNextPage(responseJson.info.next);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchNextPage();
    }, []);

    const filterEpisodes = () => {
        return episodes.filter((episode) => {
            const lowerCaseSearchText = searchText.toLowerCase();
            return (
                episode.name.toLowerCase().includes(lowerCaseSearchText) ||
                episode.episode.toLowerCase().includes(lowerCaseSearchText)
            );
        });
    };

    return (
        <View>
            <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
                <TextInput
                    style={{ width: "100%", height: 40, marginTop: 40, borderWidth: 1, borderColor: "#2ecc71", borderRadius: 8, paddingHorizontal: 20 }}
                    placeholder="Bölüm Ara"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={(text) => setSearchText(text)}
                />
            </SafeAreaView>
            <FlatList
                style={{ marginTop: 100 }}
                data={filterEpisodes()}
                renderItem={({ item }) => <Episode episode={item} />}
                contentContainerStyle={{ gap: 10 }}
                onEndReached={fetchNextPage}
                onEndReachedThreshold={5}
                ListFooterComponent={<Pagination loading={loading} fetchNextPage={fetchNextPage} />}
            />
        </View>
    );
};


