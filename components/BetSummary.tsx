import { SafeAreaView, Text, View } from 'react-native';
import { useEffect } from 'react';

export const BetSummary = () => {
  useEffect(() => {
    console.log('BetSummary mounted');
  }, []);

  return (
    <SafeAreaView className={styles.container}>
      <Text className={styles.title}>BET SUMMARY</Text>

      <View className={`${styles.row} mb-1`}>
        <View className='flex-1 flex-row justify-between'>
          <Text className={`${styles.label}`}>SIDE</Text>
          <Text className={`${styles.label}`}>:</Text>
        </View>
        
        <View className='flex-1 pl-3'>
          <View className={styles.sideContainer}>
            <Text className={styles.value}>MERON</Text>
          </View>
        </View>
      </View>

      <View className={styles.row}>
        <View className='flex-1 flex-row justify-between'>
          <Text className={styles.label}>AMOUNT</Text>
          <Text className={styles.label}>:</Text>
        </View>
        
        <View className='flex-1 pl-3'>
          <Text className={styles.value}>₱ 100</Text>
        </View>
      </View>

      <View className={styles.row}>
        <View className='flex-1 flex-row justify-between'>
          <Text className={styles.label}>FIGHT NUMBER</Text>
          <Text className={styles.label}>:</Text>
        </View>
        
        <View className='flex-1 pl-3'>
          <Text className={styles.value}>114</Text>
        </View>
      </View>

      <Text className={styles.footer}>
        Sabong App{'\n'}Apexel Development
      </Text>
    </SafeAreaView>
  );
};

const styles = {
  container: "flex-1 flex-col justify-center",
  title: "text-md font-semibold text-white text-center mb-2",
  row: "flex-row justify-start items-center mb-2",
  label: "text-xs text-gray-600", 
  sideContainer: "bg-red-600 rounded-sm p-1 w-1/2",
  value: "text-xs text-white",
  footer: "text-xs text-gray-600 text-center",
}
