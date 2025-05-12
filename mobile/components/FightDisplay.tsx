import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

interface FightDisplayProps {
  onPressMeron: () => void;
  onPressWala: () => void;
  onPressDraw: () => void;
}


export const FightDisplay = ({ onPressMeron, onPressWala, onPressDraw }: FightDisplayProps) => {
  const [meronOpen, setMeronOpen] = useState(true);
  const [walaOpen, setWalaOpen] = useState(true);
  const [drawOpen, setDrawOpen] = useState(true);
  const [fightNumber, setFightNumber] = useState(0);

  const [meronOdds, setMeronOdds] = useState(0);
  const [walaOdds, setWalaOdds] = useState(0);
  const [drawOdds, setDrawOdds] = useState(0);
  const [meronCount, setMeronCount] = useState(0);
  const [walaCount, setWalaCount] = useState(0);
  const [drawCount, setDrawCount] = useState(0);
  const [meronLimit, setMeronLimit] = useState(0);
  const [walaLimit, setWalaLimit] = useState(0);
  const [drawLimit, setDrawLimit] = useState(0);

  useEffect(() => {
    const db = getFirestore();
    const configRef = doc(db, 'admin', 'config');

    const unsubscribe = onSnapshot(configRef, (doc) => {
      if (doc.exists()) {
        setMeronOpen(doc.data().meron_open);
        setWalaOpen(doc.data().wala_open); 
        setDrawOpen(doc.data().draw_open);
        setFightNumber(doc.data().current_fight); 
      } else {
        console.error('Config document does not exist.');
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <View className={styles.container}>
      
      <View className='flex-row flex-1 w-full items-center justify-center'>
        <TouchableOpacity 
          onPress={() => {
            if (meronOpen) {
              onPressMeron()
          } 
          else {
            Alert.alert("Error", "Betting for MERON is now closed"); 
            console.log("Error", "Betting for MERON is closed")
          }}} 
          className='flex-[6] rounded-md mt-3 mb-2 overflow-hidden shadow-md elevation-xl shadow-black'
        >
          <StyledGradient
            colors={meronOpen ? ['#b91c1c', '#ef4444'] : ['#27272a', '#52525b']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="pt-5 pb-3 h-full items-center justify-center"
          >
            <View className='flex-col w-full h-full items-center justify-between'>
              <View className='flex-col items-center justify-center'>
                <Text className="text-white font-semibold text-3xl">MERON</Text>
                <Text className="text-white text-lg">────────</Text>
                <Text className="text-white text-lg">ODDS</Text>
                <Text className="text-white font-semibold text-lg mt-[-4]">{meronOdds.toFixed(2)}</Text>
              </View>

              <View className='bg-white/30 items-center justify-center rounded-full px-3 py-1'>
                <Text className="text-white text-base">{meronCount}/{meronLimit}</Text>
              </View>
            </View>
            
          </StyledGradient>
        </TouchableOpacity>

        <View className='bg-white-600 flex-col h-full flex-[5] items-center justify-center'>
          <TouchableOpacity 
            onPress={() => {
              if (drawOpen) {
                onPressDraw()
            } 
            else {
              Alert.alert("Error", "Betting for DRAW is now closed"); 
              console.log("Error", "Betting for DRAW is closed")
            }}} 
            className='flex-col items-center justify-center w-full h-3/4 self-center mt-3 mb-10 '
          >
            <View className='mb-[-30] z-10 relative shadow-xl elevation-xl shadow-black'>
              <Image 
                source={require('../assets/images/hexagon.png')} 
                  resizeMode='contain'
                style={{ width: 60, height: 60 }}
              />

              <Text className='absolute inset-0 text-center mt-4 text-xs text-yellow-700'>FIGHT</Text>
              <Text className='absolute inset-0 text-center mt-[23px] mr-[0.5] text-2xl font-bold text-yellow-700'>{fightNumber}</Text>
            </View>

            <StyledGradient
              colors={drawOpen ? ['#15803d', '#16a34a'] : ['#27272a', '#52525b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              className="pt-5 pb-3 h-full items-center justify-center w-full"
            >
              
              <View className='flex-col w-full h-full items-center justify-between'>
                <View className='flex-col items-center justify-center mt-5'>
                  <Text className="text-white font-semibold text-3xl">DRAW</Text>
                  <Text className="text-white text-lg">ODDS</Text>
                    <Text className="text-white font-semibold text-lg mt-[-4]">{drawOdds.toFixed(2)}</Text>
                </View>

                <View className='bg-white/30 items-center justify-center rounded-full px-3 py-1'>
                  <Text className="text-white text-base">{drawCount}/{drawLimit}</Text>
                </View>
              </View>
              
            </StyledGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => {
            if (walaOpen) {
              onPressWala()
          } 
          else {
            Alert.alert("Error", "Betting for WALA is now closed"); 
            console.log("Error", "Betting for WALA is closed")
          }}} 
          className='flex-[6] rounded-md mt-3 mb-2 overflow-hidden shadow-md elevation-xl shadow-black'
        >
          <StyledGradient
            colors={walaOpen ? ['#1d4ed8', '#3b82f6'] : ['#27272a', '#52525b']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="pt-5 pb-3 h-full items-center justify-center"
          >
            <View className='flex-col w-full h-full items-center justify-between'>
              <View className='flex-col items-center justify-center'>
                <Text className="text-white font-semibold text-3xl">WALA</Text>
                <Text className="text-white text-lg">────────</Text>
                <Text className="text-white text-lg">ODDS</Text>
                <Text className="text-white font-semibold text-lg mt-[-4]">{walaOdds.toFixed(2)}</Text>
              </View>

              <View className='bg-white/30 items-center justify-center rounded-full px-3 py-1'>
                <Text className="text-white text-base">{walaCount}/{walaLimit}</Text>
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