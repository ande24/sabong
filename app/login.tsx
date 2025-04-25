import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import SignIn from "firebase/auth/signin";

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

export default function Login () {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const autoLogin = async () => {
            setEmail("andeellenes@gmail.com")
            setPassword("password");

            await SignIn({ email, password });
            router.push("/home");
        }
        
        autoLogin();
    }, []);

    const handleLogin = async () => {
        if (email === "" || password === "") {
            Alert.alert("Error", "Please fill in all fields.");
            return;
        }

        const res = await SignIn({ email, password });
        if (res.err) {
            Alert.alert("Error", "Login failed. Please check your credentials.");
            return;
        }
        Alert.alert("Success", "Login successful!");
        router.push("/home");
    }

    return (
        <View className="bg-zinc-950 flex-1 justify-center items-center">
            <View className="bg-zinc-800 w-4/5 justify-center items-center rounded-2xl border-zinc-600 border p-4">
                <View className='flex-row items-center justify-center mb-4'>
                    <Text className='text-4xl font-extrabold text-yellow-500'>e</Text>
                    <Text className='text-4xl font-extrabold text-white'>Sabong</Text>
                </View>

                <TextInput
                value={email || ""}
                onChangeText={setEmail}
                className="bg-zinc-700 text-white p-3 w-full mb-4 rounded-lg border border-zinc-600"
                placeholder="Enter your email"
                placeholderTextColor="#B0B0B0"
                keyboardType="email-address"
                />

                <TextInput
                value={password || ""}
                onChangeText={setPassword}
                className="bg-zinc-700 text-white p-3 w-full mb-6 rounded-lg border border-zinc-600"
                placeholder="Enter your password"
                placeholderTextColor="#B0B0B0"
                secureTextEntry
                />

                <TouchableOpacity
                onPress={handleLogin}
                className="bg-yellow-500 w-1/3 rounded-lg flex items-center justify-center"
                >
                    <StyledGradient
                        colors={['#eab308', '#facc15']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        className="w-full flex items-center justify-center rounded-lg p-2"
                    >
                        <Text className="text-white font-semibold text-lg">Login</Text>
                    </StyledGradient>
                </TouchableOpacity>
            </View>
        </View>
    )
}