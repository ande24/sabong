import React, { useState, useEffect } from 'react';
import { Modal, Text, TouchableOpacity, View, Dimensions, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon2 from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

import { getAuth, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import { FightDisplay } from '../components/FightDisplay';
import { BetSummaryDaily } from 'components/BetSummary';
import { BetWala } from '../components/BetWala';
import { BetMeron } from '../components/BetMeron';
import { BetDraw } from '../components/BetDraw';
import { Scanner } from '../components/Scanner';

import '../global.css';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

export default function Home() {
  // const { width, height } = Dimensions.get('window');
  // console.log(`Phone width: ${width}`); 
  // console.log(`Phone height: ${height}`); 

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  const [filterSide, setFilterSide] = useState('all');
  const [filterTime, setFilterTime] = useState('desc');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFight, setFilterFight] = useState('all');
  const [selectedFight, setSelectedFight] = useState('');

  const [showBetWala, setShowBetWala] = useState(false);
  const [showBetMeron, setShowBetMeron] = useState(false);
  const [showBetDraw, setShowBetDraw] = useState(false);
  const [showScan, setShowScan] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        setUser(currentUser);

        if (!currentUser) {
          console.log('No user is currently signed in. Redirecting to login...');
          router.push('/login'); 
          return;
        }

        const db = getFirestore();
        const docRef = doc(db, 'tellers', currentUser.uid);
        const docu = await getDoc(docRef);

        if (docu.exists()) {
          const data = docu.data();
          // console.log('Teller email:', data.email);
        } else {
          console.log('Teller document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user or teller email:', error);
      }
    };

    fetchEmail();
  }, []);

  const changeSide = () =>  {
    if (filterSide === 'all') {
      setFilterSide('meron');
    } else if (filterSide === 'meron') {
      setFilterSide('wala');
    } else if (filterSide === 'wala') {
      setFilterSide('draw');
    } else if (filterSide === 'draw') {
      setFilterSide('all');
    }
  }

  const changeTime = () =>  {
    if (filterTime === 'desc') {
      setFilterTime('asc');
    } else if (filterTime === 'asc') {
      setFilterTime('desc');
    }
  } 

  const changeStatus = () =>  {
    if (filterStatus === 'all') { 
      setFilterStatus('pending');
    }
    else if (filterStatus === 'pending') {  
      setFilterStatus('completed');
    }
    else if (filterStatus === 'completed') {  
      setFilterStatus('all');
    }
  }

  return (
    <View className="flex-1 pb-2 bg-zinc-950">
      <Modal onRequestClose={() => {setShowBetWala(false)}} animationType='slide' transparent={true} visible={showBetWala}>
        <BetWala onClose={() => {setShowBetWala(false)}}/>
      </Modal>

      <Modal onRequestClose={() => {setShowBetMeron(false)}} animationType='slide' transparent={true} visible={showBetMeron}>
        <BetMeron onClose={() => {setShowBetMeron(false)}}/>
      </Modal>

      <Modal onRequestClose={() => {setShowBetDraw(false)}} animationType='slide' transparent={true} visible={showBetDraw}>
        <BetDraw onClose={() => {setShowBetDraw(false)}}/>
      </Modal>

      <View className="flex-1 flex justify-start items-center flex-col pt-10 px-2 bg-zinc-950">
        
        <View className={`flex-row justify-between w-full items-center bg-zinc-950 border-0 py-6 pl-10 `}>
          <View className='flex-row items-center'>
            <Text className='text-4xl font-bold text-yellow-500'>e</Text>
            <Text className='text-4xl font-bold text-white'>Sabong</Text>
          </View>

          {user && (
            <View className='flex-row justify-center px-2 items-center gap-x-1'>
              <FeatherIcon name='user' size={15} color='#eab308'/>
              <Text className='text-white'>{user.email}</Text>
            </View>
          )}

          {/* <View className=' bg-zinc-800 py-2 px-4 rounded-full border border-zinc-600 flex-row'>
            <FeatherIcon name='bar-chart-2' size={18} color='#eab308'/>
            <Text className='text-xl font-semibold text-white'>     150.00  </Text>
            <MaterialIcon name='reload' size={18} color='#eab308'/>
          </View> */}
          
        </View>

        {!showScan && (
        <>
          <View className={`${styles.container} flex-[35]`}>
            <FightDisplay onPressDraw={() => {setShowBetDraw(true)}} onPressMeron={() => {setShowBetMeron(true)}} onPressWala={() => {setShowBetWala(true)}}/>
          </View> 

          <View className={`${styles.container} flex-[50]`}> 
          <BetSummaryDaily
            filterFight={filterFight}
            selectedFight={selectedFight}
            filterTime={filterTime}
            filterStatus={filterStatus}
            filterSide={filterSide}
          />
          </View>
        </>
        )}

        {showScan && (
          <View className='flex-[122] w-full mb-4'>
            <Scanner />
          </View>
        )}

        {!showScan && (
          <View className={`flex-[26] w-full flex flex-col gap-y-1 mb-1`}>
                <View className={`bg-zinc-800 w-full justify-center rounded-md border-zinc-600 border flex-1 items-center`}>
                  <View className={`flex flex-row items-center justify-center gap-x-2 px-4`}>
                    <View className='flex-1 flex-row gap-x-[0.5] items-center justify-center'>
                      {filterFight === 'all' && (
                        <TouchableOpacity onPress={() => setFilterFight('select')} className={`flex-1 ${styles.statusButton} bg-zinc-900`}>
                          <Text className={`${styles.statusButtonText}`}>Fight</Text>
                        </TouchableOpacity>
                      )}
                      {filterFight === 'select' && (
                        <>
                          <View className='flex-1 flex-row justify-center items-center'>
                            <TouchableOpacity onPress={() => {setFilterFight('all'); setSelectedFight('')}} className={`flex-1 rounded-l-md border-zinc-600 border text-center py-2 pl-[6px] bg-zinc-900`}>
                              <MaterialIcon2 name='arrow-back-ios' size={16} color='white'/>
                            </TouchableOpacity>
                          </View>
                          <View className='flex-[3] flex-row justify-center items-center'>
                            <TextInput value={selectedFight} style={{ color: 'white', fontSize: 15.5}} keyboardType='numeric' onChangeText={(text) => setSelectedFight(text)} className={`flex-1 rounded-r-md border-zinc-600 border text-center p-2 bg-zinc-900`} />
                          </View>
                        </>
                      )}
                    </View>

                    <View className='flex-1'>
                      <TouchableOpacity onPress={changeTime} className={`${styles.statusButton} bg-zinc-900 flex-row justify-center`}>
                        <Text className={`${styles.statusButtonText} ml-2`}>Time</Text>
                        <View className={`${filterTime === 'asc' ? "block" : "hidden"}`}>
                          <MaterialIcon name='arrow-up-thin' size={16} color='white'/>
                        </View>
                        <View className={`${filterTime === 'desc' ? "block" : "hidden"}`}>
                          <MaterialIcon name='arrow-down-thin' size={16} color='white'/>
                        </View>
                      </TouchableOpacity>
                    </View>
                    
                    <View className='flex-1'>
                      <TouchableOpacity onPress={changeSide} className={`${styles.statusButton} ${filterSide === "meron" ? "bg-red-600" : filterSide === "wala" ? "bg-blue-600" : filterSide === "draw" ? "bg-green-600" : "bg-zinc-900"}`}>
                        <Text className={`${styles.statusButtonText} ${filterSide === "all" ? "block" : "hidden"}`}>Side</Text>
                        <Text className={`${styles.statusButtonText} ${filterSide === "meron" ? "block" : "hidden"}`}>MERON</Text>
                        <Text className={`${styles.statusButtonText} ${filterSide === "wala" ? "block" : "hidden"}`}>WALA</Text>
                        <Text className={`${styles.statusButtonText} ${filterSide === "draw" ? "block" : "hidden"}`}>DRAW</Text>
                      </TouchableOpacity>
                    </View>

                    <View className='flex-1'>
                      <TouchableOpacity onPress={changeStatus} className={`${styles.statusButton} ${filterStatus === "completed" ? "bg-green-600" : filterStatus === "pending" ? "bg-yellow-600"  : "bg-zinc-900"}`}>
                        <Text className={`${styles.statusButtonText} ${filterStatus === "all" ? "block" : "hidden"}`}>Status</Text>
                        <Text className={`${styles.statusButtonText} ${filterStatus === "completed" ? "block" : "hidden"}`}>Completed</Text>
                        <Text className={`${styles.statusButtonText} ${filterStatus === "pending" ? "block" : "hidden"}`}>Pending</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                
                <View className='flex w-full flex-1'>
                  <TouchableOpacity className={`${styles.button} flex-1 flex-row w-full bg-zinc-600 rounded-md`}>
                    <StyledGradient
                      colors={['#27272a', '#52525b']}
                      start={{ x: 0, y: 1 }}
                      end={{ x: 0, y: 0 }}
                      className=" h-full w-full flex-row items-center justify-center rounded-md"
                    >
                      <MaterialIcon name='calendar-today' size={22} color='white'/>
                      <Text className={styles.buttonText}> TODAY'S REPORT</Text>
                    </StyledGradient>
                  </TouchableOpacity> 
                </View>

            {/* <View className='flex-row w-full gap-x-1 flex-1'>
                <TouchableOpacity className={`${styles.button} flex-1 flex-row bg-blue-600 rounded-md`}>
                  <StyledGradient
                    colors={['#1d4ed8', '#3b82f6']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                    className=" h-full w-full flex-row items-center justify-center rounded-md"
                  >
                    <MaterialIcon name='cash-plus' size={26} color='white'/>
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
                    <MaterialIcon name='cash-minus' size={26} color='white'/>
                    <Text className={styles.buttonText}>  CASH OUT</Text>
                  </StyledGradient>
                </TouchableOpacity>
              </View>  */}
          </View>
        )}

        <View className='flex-row w-full gap-x-1 flex-[13]'>
          <TouchableOpacity onPress={() => {setShowScan(true)}} className={`${styles.button} flex-1 flex-row bg-zinc-950 border border-zinc-600 rounded-md`}>
            <MaterialIcon name='qrcode-scan' size={18} color='white'/>
            <Text className='hidden 3xs:block'> </Text>
            <Text className={styles.buttonText}>  PAYOUT SCAN</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => setShowScan(false)} className={`flex justify-center items-center flex-1 flex-row bg-zinc-950 border border-zinc-600 rounded-md`}>
            <MaterialIcon name='scan-helper' size={18} color='white'/>
            <Text className='hidden 3xs:block'> </Text>
            <Text className="text-white text-center font-semibold text-2xl">  CANCEL SCAN</Text>
          </TouchableOpacity>
        </View> 
      </View>
    </View>
  );
}

const styles = {
  container: "bg-zinc-800 w-full justify-center rounded-md border-zinc-600 border p-4 mb-1",
  statusButton: "rounded-md border-zinc-600 border text-center p-2",
  button: "flex justify-center items-center",
  buttonText: "text-white text-center font-semibold text-2xl",
  statusButtonText: "text-white text-center font-semibold text-base",
}

