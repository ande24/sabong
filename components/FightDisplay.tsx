import { getApp } from '@firebase/app';
import { LinearGradient } from 'expo-linear-gradient';
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { cssInterop } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';

const StyledGradient = cssInterop(LinearGradient, {
  className: 'style',
});

interface FightDisplayProps {
  onPressMeron: () => void;
  onPressWala: () => void;
  onPressDraw: () => void;
}

export const FightDisplay: React.FC<FightDisplayProps> = ({
  onPressMeron,
  onPressWala,
  onPressDraw,
}) => {

  const [fightData, setFightData] = useState({
    current_fight: '',
    draw_open: false,
    meron_open: false,
    wala_open: false,
    meron_odds: 1,
    wala_odds: 1,
    draw_odds: 1,
    meron_total: 0,
    wala_total: 0,
    draw_total: 0,
  });

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
              current_fight: data.current_fight,
              draw_open: data.draw_open,
              meron_open: data.meron_open,
              wala_open: data.wala_open,
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
                fightNumber: data.fight_number || '',
                meron_odds: data.meron_odds || 0,
                wala_odds: data.wala_odds || 0,
                draw_odds: data.draw_odds || 0,
                meron_total: data.meron_total || 0,
                wala_total: data.wala_total || 0,
                draw_total: data.draw_total || 0,
              }));
            } else {
              console.log(`No fight found today with fight_number: ${fightData.current_fight}`);
              setFightData(prevState => ({
                ...prevState,
                meron_odds: 0,
                wala_odds: 0,
                draw_odds: 0,
                meron_total: 0,
                wala_total: 0,
                draw_total: 0,
                fightNumber: '',
              }));
            }
          } else {
            console.log(`No fights found for today`);
            setFightData(prevState => ({
              ...prevState,
              meron_odds: 0,
              wala_odds: 0,
              draw_odds: 0,
              meron_total: 0,
              wala_total: 0,
              draw_total: 0,
              fightNumber: '',
            }));
          }
        }, (error) => {
          console.error("Error fetching fight details:", error);
          setFightData(prevState => ({
            ...prevState,
            meron_odds: 0,
            wala_odds: 0,
            draw_odds: 0,
            meron_total: 0,
            wala_total: 0,
            draw_total: 0,
            fightNumber: '',
          }));
        });
      } catch (error) {
        console.error("Error fetching fight details:", error);
        setFightData(prevState => ({
            ...prevState,
            meron_odds: 0,
            wala_odds: 0,
            draw_odds: 0,
            meron_total: 0,
            wala_total: 0,
            draw_total: 0,
            fightNumber: '',
          }));
      }
    };

    fetchFightDetails();

    return () => {
      if (unsubscribe) {
        unsubscribe(); 
      }
    };
  }, [fightData.current_fight]);

  const formatNumber = (number: number): string => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <View className={styles.container}>
      <View className="w-full flex-1 flex-row items-center justify-center">
        <TouchableOpacity
          onPress={() => {
            onPressMeron();
          }}
          className="elevation-xl mb-2 mt-3 flex-[6] overflow-hidden rounded-md shadow-md shadow-black">
          <StyledGradient
            colors={fightData.meron_open ? ['#b91c1c', '#ef4444'] : ['#27272a', '#52525b']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="h-full items-center justify-center pb-3 pt-5">
            <View className="h-full w-full flex-col items-center justify-between">
              <View className="flex-col items-center justify-center">
                <Text className="text-3xl font-semibold text-white">MERON</Text>
                <Text className="text-lg text-white">────────</Text>
                <Text className="text-lg text-white">ODDS</Text>
                <Text className="mt-[-4] text-lg font-semibold text-white">{fightData.meron_odds}</Text>
              </View>

              <View className="items-center justify-center rounded-full bg-white/30 px-3 py-1">
                <Text className="text-base text-white">₱ {formatNumber(fightData.meron_total)}</Text>
              </View>
            </View>
          </StyledGradient>
        </TouchableOpacity>

        <View className="bg-white-600 h-full flex-[5] flex-col items-center justify-center">
          <TouchableOpacity
            onPress={() => {
              onPressDraw();
            }}
            className="mb-10 mt-3 h-3/4 w-full flex-col items-center justify-center self-center ">
            <View className="elevation-xl relative z-10 mb-[-30] shadow-xl shadow-black">
              <Image
                source={require('../assets/images/hexagon.png')}
                resizeMode="contain"
                style={{ width: 60, height: 60 }}
              />

              <Text className="absolute inset-0 mt-4 text-center text-xs text-yellow-700">
                FIGHT
              </Text>
              <Text className="absolute inset-0 mr-[0.5] mt-[23px] text-center text-2xl font-bold text-yellow-700">
                {fightData.current_fight}
              </Text>
            </View>

            <StyledGradient
              colors={fightData.draw_open ? ['#15803d', '#16a34a'] : ['#27272a', '#52525b']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.5 }}
              className="h-full w-full items-center justify-center pb-3 pt-5">
              <View className="h-full w-full flex-col items-center justify-between">
                <View className="mt-5 flex-col items-center justify-center">
                  <Text className="text-3xl font-semibold text-white">DRAW</Text>
                  <Text className="text-lg text-white">ODDS</Text>
                  <Text className="mt-[-4] text-lg font-semibold text-white">{fightData.draw_odds}</Text>
                </View>

                <View className="items-center justify-center rounded-full bg-white/30 px-3 py-1">
                  <Text className="text-base text-white">₱ {formatNumber(fightData.draw_total)}</Text>
                </View>
              </View>
            </StyledGradient>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            onPressWala();
          }}
          className="elevation-xl mb-2 mt-3 flex-[6] overflow-hidden rounded-md shadow-md shadow-black">
          <StyledGradient
            colors={fightData.wala_open ? ['#1d4ed8', '#3b82f6'] : ['#27272a', '#52525b']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            className="h-full items-center justify-center pb-3 pt-5">
            <View className="h-full w-full flex-col items-center justify-between">
              <View className="flex-col items-center justify-center">
                <Text className="text-3xl font-semibold text-white">WALA</Text>
                <Text className="text-lg text-white">────────</Text>
                <Text className="text-lg text-white">ODDS</Text>
                <Text className="mt-[-4] text-lg font-semibold text-white">{fightData.wala_odds}</Text>
              </View>

              <View className="items-center justify-center rounded-full bg-white/30 px-3 py-1">
                <Text className="text-base text-white">₱ {formatNumber(fightData.wala_total)}</Text>
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
