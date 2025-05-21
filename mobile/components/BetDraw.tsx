import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  BackHandler,
  Alert
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

interface BetDrawProps {
    onClose: () => void;
  }

export const BetDraw: React.FC<BetDrawProps> = ({ onClose }) => {
    const [betAmount, setBetAmount] = useState('0');

    useEffect(() => {
        const backAction = () => {
            onClose(); 
            return true; 
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); 
    }, []);

    return (
        <View className="flex-1 bg-black/80 justify-center items-center">
          <View className="w-11/12 bg-zinc-800 rounded-2xl">

            <View className="rounded-t-2xl w-full">
                <StyledGradient
                    colors={['#166534', '#16a34a']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="flex-row justify-center items-center w-full rounded-t-2xl p-4 relative"
                >
                    <Text className="text-white text-4xl font-extrabold">DRAW</Text>
                    <TouchableOpacity className='absolute right-3 bg-black/20 rounded-full p-2' onPress={() => onClose()}>
                        <FeatherIcon name="x" size={24} color="white" />
                    </TouchableOpacity>
                </StyledGradient>
            </View>

            <StyledGradient
                colors={['#022c22', '#14532d']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-col justify-center items-center w-full rounded-b-2xl px-4"
            >
                <View className="flex-row justify-between w-full mb-2 py-4">
                    <View className='flex-row items-center justify-center gap-x-4'>
                        <Text className="text-white text-lg">Min: 20</Text>
                        <Text className="text-white text-lg">Max: 5,000</Text>
                    </View>

                    <View className='flex-row items-center justify-between gap-x-4 px-3 py-1 border border-zinc-600 rounded-md'>
                        <Text className='text-white font-semibold text-lg'>Total</Text>
                        <Text className='text-yellow-500 font-semibold text-lg'>0</Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-center mb-4 h-16">
                    <TouchableOpacity
                        className="bg-blue-600 rounded-l-md flex-[2] h-full flex items-center justify-center"
                        onPress={() =>
                        setBetAmount((prev) =>
                            Math.max(20, parseInt(prev) - 1).toString()
                        )
                        }
                    >
                        <StyledGradient
                            colors={['#166534', '#16a34a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            className="flex justify-center items-center w-full h-full rounded-l-md"
                        >
                            <FeatherIcon name="minus" size={30} color="white" />
                        </StyledGradient>
                    </TouchableOpacity>

                    <TextInput
                        className="bg-white text-center text-4xl font-bold flex-[7] h-full"
                        value={betAmount}
                        keyboardType="numeric"
                        onChangeText={(text) => setBetAmount(text)}
                        textAlignVertical='center'
                    />

                    <TouchableOpacity
                        className="bg-blue-600 rounded-r-md flex-[2] h-full flex items-center justify-center"
                            onPress={() =>
                            setBetAmount((prev) =>
                                Math.min(5000, parseInt(prev) + 1).toString()
                            )
                        }
                    >
                        <StyledGradient
                            colors={['#166534', '#16a34a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            className="flex justify-center items-center w-full h-full rounded-r-md"
                        >
                            <FeatherIcon name="plus" size={30} color="white" />
                        </StyledGradient>
                    </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap gap-1 items-center justify-center mb-4">
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'].map(
                    (item, index) => (
                    <TouchableOpacity
                        key={index}
                        className="w-[32.6%] h-16 bg-white justify-center items-center rounded-md"
                        onPress={() => {
                        if (betAmount === '0') {
                            setBetAmount(item);
                        } else {
                            setBetAmount((prev) => prev + item);
                        }
                        }}
                    >
                        <StyledGradient
                            colors={['#ffffff', '#d4d4d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            className="flex justify-center items-center w-full h-full rounded-md"
                        >
                            <Text className="text-black text-4xl font-bold">{item}</Text>
                        </StyledGradient>
                    </TouchableOpacity>
                    )
                )}

                    <TouchableOpacity
                        className="w-[32.6%] h-16 bg-white justify-center items-center rounded-md"
                        onPress={() => {setBetAmount('0')}}
                    >
                        <StyledGradient
                            colors={['#ffffff', '#d4d4d8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            className="flex justify-center items-center w-full h-full rounded-md"
                        >
                            <Text className="text-black text-3xl font-bold">CLEAR</Text>
                        </StyledGradient>
                    </TouchableOpacity>
                </View>

                <View className="flex-row flex-wrap justify-center gap-2 mb-4 mx-12">
                {[50, 100, 200, 500, 1000].map((amount, index) => (
                    <TouchableOpacity
                    key={index}
                    className="bg-white/30 border border-white px-2 py-1 rounded-md flex-row gap-2 items-center justify-center"
                    onPress={() => setBetAmount(amount.toString())}
                    >
                    <MaterialIcon name="ticket-confirmation-outline" size={24} color="white" />
                    <Text className="text-white text-3xl">{amount}</Text>
                    </TouchableOpacity>
                ))}
                </View>

                <TouchableOpacity 
                    onPress={() => {
                        Alert.alert(
                        "DRAW!", 
                        `Your bet of ₱${betAmount} has been confirmed.`
                        ); 
                    }} 
                    className="bg-green-600 p-[2px] rounded-md mb-4 w-full"
                >
                    <StyledGradient
                        colors={['#166534', '#16a34a']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        className="flex justify-center items-center w-full rounded-md py-3"
                    >
                        <Text className="text-white text-center text-4xl font-extrabold">SUBMIT</Text>
                    </StyledGradient>
                </TouchableOpacity>
            </StyledGradient>
          </View>
        </View>
    )
}