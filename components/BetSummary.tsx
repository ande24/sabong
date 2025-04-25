import { SafeAreaView, Text, View, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { getAuth, User } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export const BetSummary = () => {
  const [user, setUser] = useState<User | null>(null);
  const [bets, setBets] = useState<any[]>([]);

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
    const fetchBets = () => {
      if (!user) {
        return;
      }

      try {
        const db = getFirestore();
        const betCollection = collection(db, 'tellers', user.uid, 'bets');
        const unsubscribe = onSnapshot(betCollection, (betSnapshot) => {
          const betList = betSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            address1: doc.data().address1,
            address2: doc.data().address2,
            amount: doc.data().amount,
            fight_number: doc.data().fight_number,
            side: doc.data().side,
            timestamp: doc.data().timestamp,
            venue: doc.data().venue,
          }));

          setBets(betList);
          // console.log('Bets:', betList);
        });

        return unsubscribe;
      } catch (error) {
        console.error('Error fetching bets:', error);
      }
    };

    const unsubscribe = fetchBets();

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [user])

  return (
    <SafeAreaView className={styles.container}>
      <Text className={styles.title}>BET SUMMARY</Text>

      <ScrollView className='pt-4'>
        {bets.map((bet, index) => (
          <View key={bet.id}>
            <View className='flex-1 w-full mb-8'>
              <View className='border border-zinc-600 rounded-md p-2 mb-4 flex items-center justify-center'>
                <Text className='text-lg text-white'>{bet.venue}</Text>
              </View>

              <View className={`flex-row justify-start items-center mb-3`}>
                <View className='w-1/2 flex-row justify-between'>
                  <Text className={`${styles.label}`}>SIDE</Text>
                  <Text className={`${styles.label}`}>:</Text>
                </View>
                
                <View className='pl-3'>
                  <View className={`${bet.side === "MERON" ? "bg-red-600" : bet.side === "WALA" ? "bg-blue-600" : "bg-green-600"} ${styles.sideContainer}`}>
                    <Text className={styles.value}>{bet.side}</Text>
                  </View>
                </View>
              </View>

              <View className={styles.row}>
                <View className='w-1/2 flex-row justify-between'>
                  <Text className={styles.label}>AMOUNT</Text>
                  <Text className={styles.label}>:</Text>
                </View>
                
                <View className='pl-3'>
                  <Text className={styles.value}>₱ {bet.amount}</Text>
                </View>
              </View>

              <View className={styles.row}>
                <View className='w-1/2 flex-row justify-between'>
                  <Text className={styles.label}>FIGHT NUMBER</Text>
                  <Text className={styles.label}>:</Text>
                </View>
                
                <View className='pl-3'>
                  <Text className={styles.value}>{bet.fight_number}</Text>
                </View>
              </View>

              <Text className={styles.footer}>
                {bet.address1}{'\n'}{bet.address2}
              </Text>
            </View>

            {bets.length - 1 !== index && (
              <Text className="text-zinc-600 text-base mb-10 text-center">──────────────────────────────────────────</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  container: "flex-1 flex-col justify-center",
  title: "text-2xl font-semibold text-white text-center mb-4 mt-1",
  row: "flex-row justify-start items-center mb-4",
  label: "text-lg text-zinc-600", 
  sideContainer: "rounded-sm p-1 w-fit",
  value: "text-lg text-white",
  footer: "text-lg text-zinc-600 text-center mt-2",
}
