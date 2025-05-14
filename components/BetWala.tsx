import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

import { getAuth, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, onSnapshot, where, query, Timestamp, getDoc, updateDoc } from 'firebase/firestore';
import { getApp } from '@firebase/app';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

interface BetWalaProps {
    onClose: () => void;
  }

export const BetWala: React.FC<BetWalaProps> = ({ onClose }) => {
    const [user, setUser] = useState<User | null>(null);

    const [betAmount, setBetAmount] = useState('0');
    const [fightData, setFightData] = useState({
        fight_id: '',
        current_fight: '',
        wala_max: 0,
        wala_min: 0,
        wala_total: 0,
        wala_odds: 0,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const auth = getAuth();
            const currentUser = auth.currentUser;

            if (!currentUser) {
                return;
            }

            setUser(currentUser);
            } catch (error) {
            console.error('Error fetching user:', error);
            }
        };
    
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchFightData = async () => {
            try {
            const app = getApp();
            const db = getFirestore(app);
            const configRef = doc(db, 'admin', 'config'); 

            const unsubscribe = onSnapshot(configRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                setFightData({
                    ...fightData,
                    current_fight: data.current_fight || '',
                    wala_max: data.wala_max || 0,
                    wala_min: data.wala_min || 0,
                    wala_total: data.wala_total || 0,
                    wala_odds: data.wala_odds || 0,
                });
                } else {
                console.log('Config not found!');
                }
            });

            return () => unsubscribe();
            } catch (error) {
            console.error('Error fetching config:', error);
            }
        };

        fetchFightData();
    }, []);

    useEffect(() => {
        let unsubscribe: () => void; 
    
        const fetchFightDetails = async () => {
          if (!fightData.current_fight) return;
    
          try {
            const app = getApp();
            const db = getFirestore(app);
    
            const now = new Date();
            const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    
            const year = utc8.getFullYear();
            const month = String(utc8.getMonth() + 1).padStart(2, '0');
    
            const startOfDay = new Date(utc8.getFullYear(), utc8.getMonth(), utc8.getDate());
            const endOfDay = new Date(utc8.getFullYear(), utc8.getMonth(), utc8.getDate() + 1);
    
            const startTimestamp = Timestamp.fromDate(startOfDay);
            const endTimestamp = Timestamp.fromDate(endOfDay);
    
            const collectionName = `fights_${year}_${month}`;
    
            const fightsCollection = collection(db, collectionName);
            const q = query(
              fightsCollection,
              where("timestamp", ">=", startTimestamp),
              where("timestamp", "<", endTimestamp)
            );
    
            unsubscribe = onSnapshot(q, (querySnapshot) => { 
              if (!querySnapshot.empty) {
                
                const filteredDocs = querySnapshot.docs.filter(doc => doc.data().fight_number === fightData.current_fight);
    
                if (filteredDocs.length > 0) {
                  const data = filteredDocs[0].data();
                  setFightData(prevState => ({
                    ...prevState,
                    fight_id: filteredDocs[0].id || '',
                    fightNumber: data.fight_number || '',
                    wala_total: data.wala_total || 0,
                    wala_max: data.wala_max || 0,
                    wala_min: data.wala_min || 0,
                    wala_odds: data.wala_odds || 0,
                  }));
                } else {
                  console.log(`No fight found today with fight_number: ${fightData.current_fight}`);
                  
                }
              } else {
                console.log(`No fights found for today`);
              }
            }, (error) => {
              console.error("Error fetching fight details:", error);
            });
          } catch (error) {
            console.error("Error fetching fight details:", error);
          }
        };
    
        fetchFightDetails();
    
        return () => {
          if (unsubscribe) {
            unsubscribe(); 
          }
        };
    }, [fightData.current_fight]);

    const handleSubmit = async () => {
        if (parseInt(betAmount) < fightData.wala_min) {
            Alert.alert('Invalid Bet', `Minimum bet amount is ₱${formatNumber(fightData.wala_min)}.`);
            return;
        }
        if (parseInt(betAmount) > fightData.wala_max) {
            Alert.alert('Invalid Bet', `Maximum bet amount is ₱${formatNumber(fightData.wala_max)}.`);
            return;
        }
        try {
            if (!user) {
                return;
            }

            const db = getFirestore();

            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const collectionName = `bets_${year}_${month}`;

            const betCollection = collection(db, 'tellers', user.uid, collectionName);
            await addDoc(betCollection, {
                amount: Number(betAmount),
                fight_number: fightData.current_fight,
                side: 'WALA',
                timestamp: new Date(now.getTime() + 8 * 60 * 60 * 1000),
                outcome: 'PENDING',
                odds: 0, 
                fight_id: fightData.fight_id,
            });

            const fightsCollectionName = `fights_${year}_${month}`;

            const fightDocRef = doc(db, fightsCollectionName, fightData.fight_id);
            const fightDocSnapshot = await getDoc(fightDocRef);

            if (fightDocSnapshot.exists()) {
                const fightDocData = fightDocSnapshot.data();
                console.log('Fight Document Data:', fightDocData);

                const updatedWalaTotal = (fightDocData.wala_total || 0) + Number(betAmount);
                await updateDoc(fightDocRef, {
                    wala_total: updatedWalaTotal,
                });
                console.log('Fight document updated with new wala_total:', updatedWalaTotal);
            } else {
                console.log('No fight document found with the given ID.');
            }

            console.log('Bet added successfully!');
            Alert.alert('WALA!', 'Your bet has been placed successfully!');
            onClose();
        } catch (error) {
            console.error('Error adding bet:', error);
        }
    }

    const formatNumber = (number: number): string => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

  return (
    <View className="flex-1 items-center justify-center bg-black/80">
      <View className="w-11/12 rounded-2xl bg-zinc-800">
        <View className="w-full rounded-t-2xl">
          <StyledGradient
            colors={['#1e3a8a', '#1d4ed8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="relative w-full flex-row items-center justify-center rounded-t-2xl p-4">
            <Text className="text-4xl font-extrabold text-white">WALA</Text>
            <TouchableOpacity
              className="absolute right-3 rounded-full bg-black/20 p-2"
              onPress={() => onClose()}>
              <FeatherIcon name="x" size={24} color="white" />
            </TouchableOpacity>
          </StyledGradient>
        </View>

        <StyledGradient
          colors={['#0f172a', '#172554']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="w-full flex-col items-center justify-center rounded-b-2xl px-4">
          <View className="mb-2 w-full flex-row justify-between py-4">
            <View className="flex-row items-center justify-center gap-x-4">
               <View className='flex-row items-center justify-center gap-x-4'>
                    <Text className="text-white text-lg">Min: ₱{formatNumber(fightData.wala_min)}</Text>
                    <Text className="text-white text-lg">Max: ₱{formatNumber(fightData.wala_max)}</Text>
                </View>
            </View>

            <View className="flex-row items-center justify-between gap-x-4 rounded-md border border-zinc-600 px-3 py-1">
                <Text className='text-white font-semibold text-lg'>Total:</Text>
                <Text className='text-yellow-500 font-semibold text-lg'>₱{formatNumber(fightData.wala_total)}</Text>
            </View>
          </View>

          <View className="mb-4 h-16 flex-row items-center justify-center">
            <TouchableOpacity
              className="flex h-full flex-[2] items-center justify-center rounded-l-md bg-blue-600"
              onPress={() => setBetAmount((prev) => Math.max(fightData.wala_min, parseInt(prev) - 1).toString())}>
              <StyledGradient
                colors={['#1e40af', '#2563eb']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="flex h-full w-full items-center justify-center rounded-l-md">
                <FeatherIcon name="minus" size={30} color="white" />
              </StyledGradient>
            </TouchableOpacity>

            <TextInput
              className="h-full flex-[7] bg-white text-center text-4xl font-bold"
              value={formatNumber(Number(betAmount))}
              keyboardType="numeric"
              onChangeText={(text) => setBetAmount(text)}
              textAlignVertical="center"
            />

            <TouchableOpacity
              className="flex h-full flex-[2] items-center justify-center rounded-r-md bg-blue-600"
              onPress={() => setBetAmount((prev) => Math.min(fightData.wala_max, parseInt(prev) + 1).toString())}>
              <StyledGradient
                colors={['#1e40af', '#2563eb']}
                start={{ x: 0, y: 1 }}
                end={{ x: 0, y: 0 }}
                className="flex h-full w-full items-center justify-center rounded-r-md">
                <FeatherIcon name="plus" size={30} color="white" />
              </StyledGradient>
            </TouchableOpacity>
          </View>

          <View className="mb-4 flex-row flex-wrap items-center justify-center gap-1">
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0'].map((item, index) => (
              <TouchableOpacity
                key={index}
                className="h-16 w-[32.6%] items-center justify-center rounded-md bg-white"
                onPress={() => {
                  if (betAmount === '0') {
                    setBetAmount(item);
                  } else {
                    setBetAmount((prev) => prev + item);
                  }
                }}>
                <StyledGradient
                  colors={['#ffffff', '#d4d4d8']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  className="flex h-full w-full items-center justify-center rounded-md">
                  <Text className="text-4xl font-bold text-black">{item}</Text>
                </StyledGradient>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="h-16 w-[32.6%] items-center justify-center rounded-md bg-white"
              onPress={() => {
                setBetAmount('0');
              }}>
              <StyledGradient
                colors={['#ffffff', '#d4d4d8']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex h-full w-full items-center justify-center rounded-md">
                <Text className="text-3xl font-bold text-black">CLEAR</Text>
              </StyledGradient>
            </TouchableOpacity>
          </View>

          <View className="mx-12 mb-4 flex-row flex-wrap justify-center gap-2">
            {[50, 100, 200, 500, 1000].map((amount, index) => (
              <TouchableOpacity
                key={index}
                className="flex-row items-center justify-center gap-2 rounded-md border border-white bg-white/30 px-2 py-1"
                onPress={() => setBetAmount(amount.toString())}>
                <MaterialIcon name="ticket-confirmation-outline" size={24} color="white" />
                <Text className="text-3xl text-white">{formatNumber(amount)}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={handleSubmit}
            className="mb-4 w-full rounded-md bg-blue-500 p-[2px]">
            <StyledGradient
              colors={['#1e40af', '#2563eb']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className="flex w-full items-center justify-center rounded-md py-3">
              <Text className="text-center text-4xl font-extrabold text-white">SUBMIT</Text>
            </StyledGradient>
          </TouchableOpacity>
        </StyledGradient>
      </View>
    </View>
  );
};
