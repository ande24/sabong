import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from "expo-status-bar";

export default function Layout() {
  return (
    <>
      <SafeAreaProvider>
        {<Stack screenOptions={{ headerShown: false }}/>}
      </SafeAreaProvider>
      <StatusBar style="light"  translucent={true} />
    </>
  );
}

