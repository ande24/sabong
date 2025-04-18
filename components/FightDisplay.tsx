import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

interface FightDisplayProps {
  onPressMeron: () => void;
  onPressWala: () => void;
  onPressDraw: () => void;
}


export const FightDisplay: React.FC<FightDisplayProps> = ({ onPressMeron, onPressWala, onPressDraw }) => {
  return (
    <View className={styles.container}>
      
      <View className='flex-row flex-1 w-full items-center justify-center'>
        <TouchableOpacity onPress={() => {onPressMeron()}} className='flex-[6] rounded-md mt-3 mb-2 overflow-hidden shadow-md elevation-xl shadow-black'>
          <StyledGradient
            colors={['#b91c1c', '#ef4444']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="pt-5 pb-3 h-full items-center justify-center"
          >
            <View className='flex-col w-full h-full items-center justify-between'>
              <View className='flex-col items-center justify-center'>
                <Text className="text-white font-semibold text-3xl">MERON</Text>
                <Text className="text-white text-lg">────────</Text>
                <Text className="text-white text-lg">ODDS</Text>
                <Text className="text-white font-semibold text-lg mt-[-4]">1.57</Text>
              </View>

              <View className='bg-white/30 items-center justify-center rounded-full px-3 py-1'>
                <Text className="text-white text-base">0/20,000</Text>
              </View>
            </View>
            
          </StyledGradient>
        </TouchableOpacity>

        <View className='bg-white-600 flex-col h-full flex-[5] items-center justify-center'>
          <TouchableOpacity onPress={() => {onPressDraw()}} className='flex-col items-center justify-center w-full h-3/4 self-center mt-3 mb-10 '>
            <View className='mb-[-30] z-10 relative shadow-xl elevation-xl shadow-black'>
              <Image 
                source={require('../assets/images/hexagon.png')} 
                resizeMode='contain'
                style={{ width: 60, height: 60 }}
              />

              <Text className='absolute inset-0 text-center mt-4 text-xs text-yellow-700'>FIGHT</Text>
              <Text className='absolute inset-0 text-center mt-[23px] mr-[0.5] text-2xl font-bold text-yellow-700'>123</Text>
            </View>

            <StyledGradient
              colors={['#15803d', '#16a34a']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              className="pt-5 pb-3 h-full items-center justify-center w-full"
            >
              
              <View className='flex-col w-full h-full items-center justify-between'>
                <View className='flex-col items-center justify-center mt-5'>
                  <Text className="text-white font-semibold text-3xl">DRAW</Text>
                  <Text className="text-white text-lg">ODDS</Text>
                  <Text className="text-white font-semibold text-lg mt-[-4]">8.00</Text>
                </View>

                <View className='bg-white/30 items-center justify-center rounded-full px-3 py-1'>
                  <Text className="text-white text-base">0/2,000</Text>
                </View>
              </View>
              
            </StyledGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => {onPressWala()}} className='flex-[6] rounded-md mt-3 mb-2 overflow-hidden shadow-md elevation-xl shadow-black'>
          <StyledGradient
            colors={['#1d4ed8', '#3b82f6']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="pt-5 pb-3 h-full items-center justify-center"
          >
            <View className='flex-col w-full h-full items-center justify-between'>
              <View className='flex-col items-center justify-center'>
                <Text className="text-white font-semibold text-3xl">WALA</Text>
                <Text className="text-white text-lg">────────</Text>
                <Text className="text-white text-lg">ODDS</Text>
                <Text className="text-white font-semibold text-lg mt-[-4]">2.09</Text>
              </View>

              <View className='bg-white/30 items-center justify-center rounded-full px-3 py-1'>
                <Text className="text-white text-base">0/20,000</Text>
              </View>
            </View>
            
          </StyledGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-1 bg-white w-1/2`,
};