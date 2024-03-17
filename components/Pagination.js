import React from "react";
import { View, ActivityIndicator,Button } from "react-native";

const Pagination = ({ loading, fetchNextPage }) => {
    return (
        <View>
            {loading && <ActivityIndicator />}
            {!loading}
        </View>
    );
};

export default Pagination;
