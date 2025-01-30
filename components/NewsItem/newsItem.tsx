import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";
import type { Article } from "@/services/article/types";

interface NewsItemProps {
  item: Article;
}

const NewsItem = ({ item }: NewsItemProps) => (
  <TouchableOpacity
    className="bg-white p-4 mb-4 rounded-lg shadow"
    onPress={() => router.push(`/article/${encodeURIComponent(item.url)}`)}
  >
    {item.urlToImage && (
      <Image source={{ uri: item.urlToImage }} className="w-full h-48 rounded-lg mb-3" resizeMode="cover" />
    )}
    <Text className="text-lg font-bold mb-2">{item.title}</Text>
    <Text className="text-gray-600 mb-2" numberOfLines={2}>
      {item.description}
    </Text>
    <View className="flex-row justify-between items-center">
      <Text className="text-gray-500 text-sm">{item.source.name}</Text>
      <Text className="text-gray-500 text-sm">{new Date(item.publishedAt).toLocaleDateString()}</Text>
    </View>
  </TouchableOpacity>
);

export default NewsItem;
