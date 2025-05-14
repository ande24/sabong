import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { cssInterop } from 'nativewind';

import { getAuth, User } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, onSnapshot, where, query, Timestamp, getDoc, updateDoc } from 'firebase/firestore';
import { getApp } from '@firebase/app';

import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const StyledGradient = cssInterop(LinearGradient, {
  className: 'style'
});

interface BetMeronProps {
    onClose: () => void;
  }

export const BetMeron: React.FC<BetMeronProps> = ({ onClose }) => {
    const [user, setUser] = useState<User | null>(null);
    const [showqr, setShowQR] = useState(false);

    const [betAmount, setBetAmount] = useState('0');
    const [fightData, setFightData] = useState({
        fight_id: '',
        current_fight: '',
        meron_max: 0,
        meron_min: 0,
        meron_total: 0,
        meron_odds: 0,
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
                    meron_max: data.meron_max || 0,
                    meron_min: data.meron_min || 0,
                    meron_total: data.meron_total || 0,
                    meron_odds: data.meron_odds || 0,
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
                    current_fight: data.fight_number || '',
                    meron_total: data.meron_total || 0,
                    meron_max: data.meron_max || 0,
                    meron_min: data.meron_min || 0,
                    meron_odds: data.meron_odds || 0,
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
        if (parseInt(betAmount) < fightData.meron_min) {
            Alert.alert('Invalid Bet', `Minimum bet amount is ₱${formatNumber(fightData.meron_min)}.`);
            return;
        }
        if (parseInt(betAmount) > fightData.meron_max) {
            Alert.alert('Invalid Bet', `Maximum bet amount is ₱${formatNumber(fightData.meron_max)}.`);
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
                side: 'MERON',
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

                const updatedMeronTotal = (fightDocData.meron_total || 0) + Number(betAmount);
                await updateDoc(fightDocRef, {
                    meron_total: updatedMeronTotal,
                });
                console.log('Fight document updated with new meron_total:', updatedMeronTotal);
            } else {
                console.log('No fight document found with the given ID.');
            }
             

            // console.log('Bet added successfully!');
            // Alert.alert('MERON!', 'Your bet has been placed successfully!');
            setShowQR(true);
        } catch (error) {
            console.error('Error adding bet:', error);
        }
    }

    const formatNumber = (number: number): string => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <View className="flex-1 bg-black/80 justify-center items-center">
          <View className="w-11/12 bg-zinc-800 rounded-2xl">

            <View>
                {showqr && (
                    <QRCode
                        value={`fight_number=${fightData.fight_id},timestamp=${new Date().toISOString()}`}
                    />
                )}
            </View>

            <View className="rounded-t-2xl w-full">
                <StyledGradient
                    colors={['#7f1d1d', '#d81d1d']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    className="flex-row justify-center items-center w-full rounded-t-2xl p-4 relative"
                >
                    <Text className="text-white text-4xl font-extrabold">MERON</Text>
                    <TouchableOpacity className='absolute right-3 bg-black/20 rounded-full p-2' onPress={() => onClose()}>
                        <FeatherIcon name="x" size={24} color="white" />
                    </TouchableOpacity>
                </StyledGradient>
            </View>

            <StyledGradient
                colors={['#2e0505', '#5a1414']}

                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="flex-col justify-center items-center w-full rounded-b-2xl px-4"
            >
                <View className="flex-row justify-between w-full mb-2 py-4">
                    <View className='flex-row items-center justify-center gap-x-4'>
                        <Text className="text-white text-lg">Min: ₱{formatNumber(fightData.meron_min)}</Text>
                        <Text className="text-white text-lg">Max: ₱{formatNumber(fightData.meron_max)}</Text>
                    </View>

                    <View className='flex-row items-center justify-between gap-x-2 px-3 py-1 border border-zinc-600 rounded-md'>
                        <Text className='text-white font-semibold text-lg'>Total:</Text>
                        <Text className='text-yellow-500 font-semibold text-lg'>₱{formatNumber(fightData.meron_total)}</Text>
                    </View>
                </View>

                <View className="flex-row items-center justify-center mb-4 h-16">
                    <TouchableOpacity
                        className="bg-blue-600 rounded-l-md flex-[2] h-full flex items-center justify-center"
                        onPress={() =>
                        setBetAmount((prev) =>
                            Math.max(fightData.meron_min, parseInt(prev) - 1).toString()
                        )
                        }
                    >
                        <StyledGradient
                            colors={['#7f1d1d', '#d81d1d']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 0, y: 0 }}
                            className="flex justify-center items-center w-full h-full rounded-l-md"
                        >
                            <FeatherIcon name="minus" size={30} color="white" />
                        </StyledGradient>
                    </TouchableOpacity>

                    <TextInput
                        className="bg-white text-center text-4xl font-bold flex-[7] h-full"
                        value={formatNumber(Number(betAmount))}
                        keyboardType="numeric"
                        onChangeText={(text) => setBetAmount(text)}
                        textAlignVertical='center'
                    />

                    <TouchableOpacity
                        className="bg-blue-600 rounded-r-md flex-[2] h-full flex items-center justify-center"
                            onPress={() =>
                            setBetAmount((prev) =>
                                Math.min(fightData.meron_max, parseInt(prev) + 1).toString()
                            )
                        }
                    >
                        <StyledGradient
                            colors={['#7f1d1d', '#d81d1d']}
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
                    <Text className="text-white text-3xl">{formatNumber(amount)}</Text>
                    </TouchableOpacity>
                ))}
                </View>

                <TouchableOpacity 
                    onPress={handleSubmit} 
                    className="bg-red-700 p-[2px] rounded-md mb-4 w-full"
                >
                    <StyledGradient
                        colors={['#7f1d1d', '#d81d1d']}
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