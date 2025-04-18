import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
        {<Stack screenOptions={{ headerShown: false }}/>}
    </SafeAreaProvider>
  );
}

