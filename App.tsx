import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, TouchableOpacity, View, Dimensions, SafeAreaView } from 'react-native';
import { FightDisplay } from 'components/FightDisplay';
import { BetSummary } from 'components/BetSummary';
import Icon from 'react-native-vector-icons/Feather';
import './global.css';

export default function App() {
  const { width, height } = Dimensions.get('window'); // Get the phone width
  console.log(`Phone width: ${width}`); // Log the phone width
  console.log(`Phone height: ${height}`); // Log the phone width

  return (
    <SafeAreaView className="flex-1 bg-gray-950">
      <View className="flex-1 flex justify-start items-center flex-col pt-10 px-2 bg-gray-950">
        <View className={`${styles.container} bg-gray-950 border-0 items-start py-4 px-6`}>
          <Text className='text-xl font-bold text-white'>Sabong</Text>
        </View>

        <View className={`${styles.container} flex-[40]`}></View> 
        
        <View className={`${styles.container} flex-[45]`}>
          <BetSummary />
        </View>

        <View className={`flex-[40] w-full flex flex-col gap-y-1`}>
          <View className={`${styles.container} items-center flex-1`}>
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
              <Icon name='download' size={18} color='white'/>
              <Text className={styles.buttonText}>  CASH IN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-red-600 rounded-md`}>
              <Icon name='upload' size={18} color='white'/>
              <Text className={styles.buttonText}>  CASH OUT</Text>
            </TouchableOpacity>
          </View> 
          
          <TouchableOpacity className={`${styles.button} flex-row flex-1 w-full bg-gray-600 rounded-md`}>
            <Icon name='book' size={18} color='white'/>
            <Text className={styles.buttonText}>  VIEW SUMMARY</Text>
          </TouchableOpacity> 

          <View className='flex-row w-full gap-x-1 flex-1'>
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-gray-950 border border-gray-600 rounded-md`}>
              <Icon name='minus-square' size={18} color='white'/>
              <Text className='hidden 3xs:block'> </Text>
              <Text className={styles.buttonText}> PAYOUT SCAN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-gray-950 border border-gray-600 rounded-md`}>
              <Icon name='x-square' size={18} color='white'/>
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
  container: "bg-gray-800 w-full justify-center rounded-md border-gray-600 border p-4 mb-2",
  statusButton: "bg-gray-900 rounded-md border-gray-600 border w-fit justify-center items-center p-2",
  button: "flex justify-center items-center py-2",
  buttonText: "text-white text-center font-semibold text-md",
  statusButtonText: "text-white text-center font-semibold text-xs",
}
