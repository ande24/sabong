import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Modal, Text, TouchableOpacity, View, Dimensions, SafeAreaView } from 'react-native';
import { FightDisplay } from 'components/FightDisplay';
import { BetSummary } from 'components/BetSummary';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';
import './global.css';
import { BetWala } from 'components/BetWala';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

export default function App() {
  const { width, height } = Dimensions.get('window');
  console.log(`Phone width: ${width}`); 
  console.log(`Phone height: ${height}`); 

  const [showBetWala, setShowBetWala] = useState(false);
  const [showBetMeron, setShowBetMeron] = useState(false);
  const [showBetDraw, setShowBetDraw] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-zinc-950">
      <Modal animationType='slide' transparent={true} visible={showBetWala}>
        <BetWala onClose={() => {setShowBetWala(false)}} onConfirm={() => {setShowBetWala(false)}}/>
      </Modal>

      <View className="flex-1 flex justify-start items-center flex-col pt-10 px-2 bg-zinc-950">
        <View className={`flex-row justify-between w-full items-start bg-zinc-950 border-0 py-6 pl-10 `}>
          <View className='flex-row items-center'>
            <Text className='text-4xl font-extrabold text-yellow-500'>e</Text>
            <Text className='text-4xl font-extrabold text-white'>Sabong</Text>
          </View>

          <View className=' bg-zinc-800 py-2 px-4 rounded-full border border-zinc-600 flex-row'>
            <FeatherIcon name='bar-chart-2' size={18} color='#eab308'/>
            <Text className='text-xl font-semibold text-white'>     150.00  </Text>
            <MaterialIcon name='reload' size={18} color='#eab308'/>
          </View>
          
        </View>

        <View className={`${styles.container} flex-[35]`}>
          <FightDisplay onPressDraw={() => {setShowBetDraw(true)}} onPressMeron={() => {setShowBetMeron(true)}} onPressWala={() => {setShowBetWala(true)}}/>
        </View> 
        
        <View className={`${styles.container} flex-[50]`}> 
          <BetSummary />
        </View>

        <View className={`flex-[40] w-full flex flex-col gap-y-1`}>
          <View className={`bg-zinc-800 w-full justify-center rounded-md border-zinc-600 border p-0 flex-1 items-center mb-1`}>
            <View className={`flex flex-row gap-x-1 w-fit`}>
              <TouchableOpacity className={`${styles.statusButton}`}>
                <Text className={`${styles.statusButtonText}`}>Current Bets</Text>
              </TouchableOpacity>
              <TouchableOpacity className={`${styles.statusButton}`}>
                <Text className={`${styles.statusButtonText}`}>Today's Report</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          
          <View className='flex-row w-full gap-x-1 flex-1'>
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-blue-600 rounded-md`}>
              <StyledGradient
                colors={['#1d4ed8', '#3b82f6']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className=" h-full w-full flex-row items-center justify-center rounded-md"
              >
                <FeatherIcon name='download' size={18} color='white'/>
                <Text className={styles.buttonText}>  CASH IN</Text>
              </StyledGradient>
              
            </TouchableOpacity>
            
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-red-600 rounded-md`}>
              <StyledGradient
                colors={['#b91c1c', '#ef4444']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className=" h-full w-full flex-row items-center justify-center rounded-md"
              >
                <FeatherIcon name='upload' size={18} color='white'/>
                <Text className={styles.buttonText}>  CASH OUT</Text>
              </StyledGradient>
            </TouchableOpacity>
          </View> 
          
          <View className='flex w-full flex-1'>
            <TouchableOpacity className={`${styles.button} flex-1 flex-row w-full bg-zinc-600 rounded-md`}>
              <StyledGradient
                colors={['#27272a', '#52525b']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className=" h-full w-full flex-row items-center justify-center rounded-md"
              >
                <FeatherIcon name='book' size={18} color='white'/>
                <Text className={styles.buttonText}>  VIEW SUMMARY</Text>
              </StyledGradient>
            </TouchableOpacity> 
          </View>
          

          <View className='flex-row w-full gap-x-1 flex-1'>
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-zinc-950 border border-zinc-600 rounded-md`}>
              <FeatherIcon name='minus-square' size={18} color='white'/>
              <Text className='hidden 3xs:block'> </Text>
              <Text className={styles.buttonText}> PAYOUT SCAN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-zinc-950 border border-zinc-600 rounded-md`}>
              <FeatherIcon name='x-square' size={18} color='white'/>
              <Text className='hidden 3xs:block'> </Text>
              <Text className={styles.buttonText}> CANCEL SCAN</Text>
            </TouchableOpacity>
          </View> 
        </View>
      </View>
      <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = {
  container: "bg-zinc-800 w-full justify-center rounded-md border-zinc-600 border p-4 mb-2",
  statusButton: "bg-zinc-900 rounded-md border-zinc-600 border w-fit justify-center items-center p-2 h-fit",
  button: "flex justify-center items-center",
  buttonText: "text-white text-center font-semibold text-2xl",
  statusButtonText: "text-white text-center font-semibold text-base",
}
