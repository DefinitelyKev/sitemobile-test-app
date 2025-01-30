import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: () => void;
}

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }: SearchBarProps) => (
  <View className="flex-row gap-2">
    <View className="flex-1 bg-white rounded-lg flex-row items-center px-4 h-12 border border-gray-200">
      <Feather name="search" size={20} color="#666" />
      <TextInput
        className="flex-1 ml-2"
        placeholder="Search news..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={() => setSearchQuery("")}>
          <Feather name="x" size={20} color="#666" />
        </TouchableOpacity>
      )}
    </View>
    <TouchableOpacity className="bg-blue-500 rounded-lg px-6 items-center justify-center h-12" onPress={handleSearch}>
      <Text className="text-white font-semibold">Search</Text>
    </TouchableOpacity>
  </View>
);

export default SearchBar;
