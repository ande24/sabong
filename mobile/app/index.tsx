import { Redirect } from "expo-router";

export default function Index() {
//   const [fontsLoaded] = useFonts({
//     'LEMON MILK Medium': require('../assets/fonts/lemon_milk.otf'),
//     'Poppins': require('../assets/fonts/Poppins-Black.ttf'),
//     'Poppins Light': require('../assets/fonts/Poppins-Light.ttf'),
//     'Red Display': require('../assets/fonts/red_display_bold.ttf'),
//     'Kanit Medium': require('../assets/fonts/Kanit-Medium.ttf'),
//   });

//   if (!fontsLoaded) {
//     return null; // Prevent rendering until fonts are loaded
//   };

  return <Redirect href="/home" />;
}
