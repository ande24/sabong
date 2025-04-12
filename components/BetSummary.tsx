import { SafeAreaView, Text, View } from 'react-native';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';

export const BetSummary = () => {

  return (
    <SafeAreaView className={styles.container}>
      <Text className={styles.title}>BET SUMMARY</Text>

      <ScrollView>
        <View className='flex-1 w-full mb-10'>
          <View className='border border-zinc-600 rounded-md p-2 mb-4 mt-4 flex items-center justify-center'>
            <Text className='text-lg text-white'>Royal Octadome - B</Text>
          </View>

          <View className={`flex-row justify-start items-center mb-3`}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={`${styles.label}`}>SIDE</Text>
              <Text className={`${styles.label}`}>:</Text>
            </View>
            
            <View className='pl-3'>
              <View className={styles.sideContainer}>
                <Text className={styles.value}>MERON</Text>
              </View>
            </View>
          </View>

          <View className={styles.row}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={styles.label}>AMOUNT</Text>
              <Text className={styles.label}>:</Text>
            </View>
            
            <View className='pl-3'>
              <Text className={styles.value}>₱ 100</Text>
            </View>
          </View>

          <View className={styles.row}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={styles.label}>FIGHT NUMBER</Text>
              <Text className={styles.label}>:</Text>
            </View>
            
            <View className='pl-3'>
              <Text className={styles.value}>114</Text>
            </View>
          </View>

          <Text className={styles.footer}>
          BK11 JJB Aces Online Gaming Place{'\n'}P4 Poblacion Valencia City
          </Text>
        </View>

        <Text className="text-zinc-600 text-base mb-10 text-center">──────────────────────────────────────────</Text>


        <View className='flex-1 w-full mb-10'>
          <View className='border border-zinc-600 rounded-md p-2 mb-4 flex items-center justify-center'>
            <Text className='text-lg text-white'>Royal Octadome - B</Text>
          </View>

          <View className={`flex-row justify-start items-center mb-3`}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={`${styles.label}`}>SIDE</Text>
              <Text className={`${styles.label}`}>:</Text>
            </View>
            
            <View className='pl-3'>
              <View className={`rounded-sm p-1 w-fit bg-blue-600`}>
                <Text className={styles.value}>WALA</Text>
              </View>
            </View>
          </View>

          <View className={styles.row}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={styles.label}>AMOUNT</Text>
              <Text className={styles.label}>:</Text>
            </View>
            
            <View className='pl-3'>
              <Text className={styles.value}>₱ 10,000</Text>
            </View>
          </View>

          <View className={styles.row}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={styles.label}>FIGHT NUMBER</Text>
              <Text className={styles.label}>:</Text>
            </View>
            
            <View className='pl-3'>
              <Text className={styles.value}>105</Text>
            </View>
          </View>

          <Text className={styles.footer}>
            BK11 JJB Aces Online Gaming Place{'\n'}P4 Poblacion Valencia City
          </Text>
        </View>


        <Text className="text-zinc-600 text-base mb-10 text-center">──────────────────────────────────────────</Text>


        <View className='flex-1 w-full mb-4'>
          <View className='border border-zinc-600 rounded-md p-2 mb-4 flex items-center justify-center'>
            <Text className='text-lg text-white'>Royal Octadome - B</Text>
          </View>

          <View className={`flex-row justify-start items-center mb-3`}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={`${styles.label}`}>SIDE</Text>
              <Text className={`${styles.label}`}>:</Text>
            </View>
            
            <View className='pl-3'>
              <View className='rounded-sm p-1 w-fit bg-green-600'>
                <Text className={styles.value}>DRAW</Text>
              </View>
            </View>
          </View>

          <View className={styles.row}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={styles.label}>AMOUNT</Text>
              <Text className={styles.label}>:</Text>
            </View>
            
            <View className='pl-3'>
              <Text className={styles.value}>₱ 200</Text>
            </View>
          </View>

          <View className={styles.row}>
            <View className='w-1/2 flex-row justify-between'>
              <Text className={styles.label}>FIGHT NUMBER</Text>
              <Text className={styles.label}>:</Text>
            </View>
            
            <View className='pl-3'>
              <Text className={styles.value}>98</Text>
            </View>
          </View>

          <Text className={styles.footer}>
            BK11 JJB Aces Online Gaming Place{'\n'}P4 Poblacion Valencia City
          </Text>
        </View>
      </ScrollView>

      

      
    </SafeAreaView>
  );
};

const styles = {
  container: "flex-1 flex-col justify-center",
  title: "text-2xl font-semibold text-white text-center mb-4 mt-1",
  row: "flex-row justify-start items-center mb-4",
  label: "text-lg text-zinc-600", 
  sideContainer: "bg-red-600 rounded-sm p-1 w-fit",
  value: "text-lg text-white",
  footer: "text-lg text-zinc-600 text-center mt-2",
}
