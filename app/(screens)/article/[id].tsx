import { View, Text, TouchableOpacity, SafeAreaView, Linking, useColorScheme } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Feather } from "@expo/vector-icons";

export default function ArticleScreen() {
  const { id } = useLocalSearchParams();
  const decodedUrl = decodeURIComponent(id as string);
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const textColor = isDark ? "text-white" : "text-black";
  const bgColor = isDark ? "bg-gray-900" : "bg-white";
  const borderColor = isDark ? "border-gray-800" : "border-gray-200";

  const handleOpenArticle = async () => {
    const canOpen = await Linking.canOpenURL(decodedUrl);
    if (canOpen) {
      await Linking.openURL(decodedUrl);
    }
  };

  return (
    <SafeAreaView className={`flex-1 ${bgColor}`}>
      <View className={`flex-row items-center p-4 border-b ${borderColor}`}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-left" size={24} color={isDark ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text className={`flex-1 text-center text-lg font-['SpaceMono'] mr-8 ${textColor}`}>Article Details</Text>
      </View>

      <View className="flex-1 justify-center items-center p-4">
        <Text className={`text-center mb-4 font-['SpaceMono'] ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          This will take you to a new browser tab
        </Text>
        <TouchableOpacity
          onPress={handleOpenArticle}
          className={`bg-blue-500 px-6 py-3 rounded-lg ${isDark ? "opacity-80" : ""}`}
        >
          <Text className={`text-white font-['SpaceMono'] font-semibold`}>Open Article</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
