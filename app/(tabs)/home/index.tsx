import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { useSearchArticles, useTopHeadlines } from "@/hooks/useArticles";
import SearchBar from "@/components/SearchBar/searchBar";
import NewsItem from "@/components/NewsItem/newsItem";

export default function NewsSearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const [showArticles, setShowArticles] = useState(false);

  const topHeadlines = useTopHeadlines({
    page: 1,
    pageSize: 20,
  });

  const searchResults = useSearchArticles({
    q: searchTrigger,
    page: 1,
    pageSize: 20,
    sortBy: "publishedAt",
  });

  const { data, isLoading, error } = searchTrigger ? searchResults : topHeadlines;

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchTrigger(searchQuery.trim());
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
        <View className="p-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
          <Text className="text-xl font-bold mt-4 mb-2">{searchTrigger ? "Search Results" : "Top Headlines"}</Text>
          {!showArticles && (
            <TouchableOpacity
              className="bg-blue-500 rounded-lg w-[33%] px-6 py-3 mt-4 items-center self-center"
              onPress={() => setShowArticles(true)}
            >
              <Text className="text-white font-semibold">Show Articles</Text>
            </TouchableOpacity>
          )}
          {showArticles &&
            (isLoading ? (
              <View className="flex-1 justify-center items-center mt-20">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : error ? (
              <View className="flex-1 justify-center items-center mt-20">
                <Text className="text-red-500">Error loading articles</Text>
              </View>
            ) : data?.articles ? (
              <FlatList
                data={data.articles}
                renderItem={({ item }) => <NewsItem item={item} />}
                keyExtractor={(item) => item.url}
                className="mt-4"
                contentContainerStyle={{ paddingBottom: 20 }}
                scrollEnabled={false}
              />
            ) : null)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
