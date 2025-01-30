import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView, ScrollView } from "react-native";
import { useSearchArticles, useTopHeadlines } from "@/hooks/useArticles";
import SearchBar from "@/components/SearchBar/searchBar";
import NewsItem from "@/components/NewsItem/newsItem";
import { Article } from "@/services/article/types";

const ITEMS_PER_PAGE = 20;

export default function NewsSearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchTrigger, setSearchTrigger] = useState("");
  const [showArticles, setShowArticles] = useState(false);
  const [page, setPage] = useState(1);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [isEndReached, setIsEndReached] = useState(false);

  const topHeadlines = useTopHeadlines({
    page,
    pageSize: ITEMS_PER_PAGE,
  });

  const searchResults = useSearchArticles({
    q: searchTrigger,
    page,
    pageSize: ITEMS_PER_PAGE,
    sortBy: "publishedAt",
  });

  const { data, isLoading, error, refetch, isFetching } = searchTrigger ? searchResults : topHeadlines;

  useEffect(() => {
    if (data?.articles) {
      if (page === 1) {
        setAllArticles(data.articles);
      } else {
        setAllArticles((prev) => [...prev, ...data.articles]);
      }
    }
  }, [data?.articles]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchTrigger(searchQuery.trim());
      setPage(1);
      setAllArticles([]);
    }
  };

  const hasMore = data?.articles?.length === ITEMS_PER_PAGE;

  const loadMore = async () => {
    if (isFetching || !hasMore || isEndReached) return;

    setIsEndReached(true);
    setPage((prev) => prev + 1);
    await refetch();
    setIsEndReached(false);
  };

  const renderFooter = () => {
    if (!isFetching) return null;

    return (
      <View className="py-4 w-full items-center">
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View className="flex-1 justify-center items-center py-8">
      <Text className="text-gray-500">No articles found</Text>
    </View>
  );

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
            (isLoading && allArticles.length === 0 ? (
              <View className="flex-1 justify-center items-center mt-20">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : error ? (
              <View className="flex-1 justify-center items-center mt-20">
                <Text className="text-red-500">Error loading articles</Text>
              </View>
            ) : (
              <FlatList
                data={allArticles}
                renderItem={({ item }) => <NewsItem item={item} />}
                keyExtractor={(item) => item.url}
                className="mt-4"
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={renderEmpty}
                ListFooterComponent={renderFooter}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
