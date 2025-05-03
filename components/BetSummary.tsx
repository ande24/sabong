import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { getAuth, User } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

export const BetSummaryDaily = ({
  filterFight,
  selectedFight,
  filterTime,
  filterStatus,
  filterSide,
}: {
  filterFight: string;
  selectedFight: string;
  filterTime: string;
  filterStatus: string;
  filterSide: string;
}) => {
  const { height: screenHeight } = Dimensions.get('window');
  const itemHeight = screenHeight * 0.26;

  const [user, setUser] = useState<User | null>(null);
  const [bets, setBets] = useState<any[]>([]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const auth = getAuth();
  //       const currentUser = auth.currentUser;

  //       if (!currentUser) {
  //         return;
  //       }

  //       setUser(currentUser);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // useEffect(() => {
  //   const fetchBets = () => {
  //     if (!user) {
  //       return;
  //     }

  //     try {
  //       const db = getFirestore();
        
  //       const now = new Date();

  //       const year = now.getFullYear();
  //       const month = String(now.getMonth() + 1).padStart(2, '0');
  //       const collectionName = `bets_${year}_${month}`;
        
  //       const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  //       const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        
  //       const betCollection = collection(db, 'tellers', user.uid, collectionName);
  //       const unsubscribe = onSnapshot(betCollection, (betSnapshot) => {
  //         let betList = betSnapshot.docs.map((doc) => {
  //           const timestamp = doc.data().timestamp.toDate();

  //           return {
  //             id: doc.id,
  //             address1: doc.data().address1,
  //             address2: doc.data().address2,
  //             amount: doc.data().amount,
  //             fight_number: doc.data().fight_number,
  //             side: doc.data().side,
  //             timestamp: timestamp,
  //             formattedDate: timestamp.toLocaleDateString('en-US', {
  //               year: 'numeric',
  //               month: 'long',
  //               day: 'numeric',
  //             }),
  //             formattedTime: timestamp.toLocaleTimeString('en-US', {
  //                 hour: 'numeric',
  //                 minute: '2-digit',
  //                 hour12: true,
  //             }),
  //             outcome: doc.data().outcome,
  //             odds: doc.data().odds,
  //           };
  //         })
  //         .filter((bet) => {
  //           return bet.timestamp >= startOfDay && bet.timestamp < endOfDay;
  //         });

  //         if (filterTime === 'desc') {
  //           betList.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  //         }
  //         else {
  //           betList.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  //         }

  //         if (filterFight === 'select') {
  //           betList = betList.filter((bet) => bet.fight_number === selectedFight);
  //         }

  //         if (filterSide !== 'all') {
  //           betList = betList.filter((bet) => bet.side === filterSide.toUpperCase());
  //         }

  //         if (filterStatus !== 'all') {
  //           betList = betList.filter(
  //             (bet) =>
  //               (filterStatus === 'pending' && bet.outcome === 'PENDING') ||
  //               (filterStatus === 'completed' && bet.outcome.toUpperCase() !== 'PENDING')
  //           );
  //         }

  //         setBets(betList);
  //       });

  //       return unsubscribe;
  //     } catch (error) {
  //       console.error('Error fetching bets:', error);
  //     }
  //   };

  //   const unsubscribe = fetchBets();

  //   return () => {
  //     if (typeof unsubscribe === 'function') {
  //       unsubscribe();
  //     }
  //   };
  // }, [user, filterFight, selectedFight, filterTime, filterStatus, filterSide]);

  const BetItem = React.memo(({ bet }: any) => (
    <View style={{ height: itemHeight }}>
      <View style={styles.betContainer}>
        <View style={styles.idContainer}>
          <Text style={styles.idText}>{bet.id}</Text>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>FIGHT NUMBER</Text>
              <Text style={styles.label}>:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{bet.fight_number}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>SIDE</Text>
              <Text style={styles.label}>:</Text>
            </View>
            <View style={styles.valueContainer}>
              <View
                style={[
                  styles.colorContainer,
                  bet.side === 'MERON'
                    ? styles.colorMeron
                    : bet.side === 'WALA'
                    ? styles.colorWala
                    : styles.colorDraw,
              ]}
              >
                <Text style={styles.value}>{bet.side}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>AMOUNT</Text>
              <Text style={styles.label}>:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>₱ {bet.amount}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>OUTCOME</Text>
              <Text style={styles.label}>:</Text>
            </View>
            <View style={styles.valueContainer}>
              <View
                style={[
                  styles.colorContainer,
                  bet.outcome === 'PENDING'
                    ? styles.colorPending
                    : bet.outcome === 'WALA'
                    ? styles.colorWala
                    : bet.outcome === 'MERON'
                    ? styles.colorMeron
                    : styles.colorDraw,
              ]}
              >
                <Text style={styles.value}>{bet.outcome}</Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>ODDS</Text>
              <Text style={styles.label}>:</Text>
            </View>
            <View style={styles.valueContainer}>
              <Text style={styles.value}>{bet.odds}</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footer}>
            {bet.formattedDate}
            {'\n'}
            {bet.formattedTime}
          </Text>
        </View>
      </View>
    </View>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>BET SUMMARY</Text>

      <View style={{ flex: 1}}>
        <FlatList
          ItemSeparatorComponent={() => (<Text style={styles.divider}>────────────────────────────────────────</Text>)}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No bets to display</Text>
            </View>
          }
          style={{ flex: 1 }}
          data={bets}
          keyExtractor={(item) => item.id}
          renderItem={({ item: bet }) => (
            <BetItem 
              bet={bet} 
            />
          )}
          initialNumToRender={10}        
          showsVerticalScrollIndicator={false}
          maxToRenderPerBatch={10}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  betContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  idContainer: {
    borderWidth: 1,
    borderColor: '#52525b',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  idText: {
    fontSize: 18,
    color: 'white',
  },
  detailsContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  labelContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    color: '#52525b',
  },
  valueContainer: {
    paddingLeft: 12,
  },
  colorContainer: {
    borderRadius: 4,
    padding: 4,
    alignSelf: 'flex-start',
  },
  colorMeron: {
    backgroundColor: '#dc2626',
  },
  colorWala: {
    backgroundColor: '#2563eb',
  },
  colorDraw: {
    backgroundColor: '#16a34a',
  },
  colorPending : {
    backgroundColor: '#fbbf24',
  },
  value: {
    fontSize: 16,
    color: 'white',
  },
  footerContainer: {
    flex: 2,
  },
  footer: {
    fontSize: 18,
    color: '#52525b',
    textAlign: 'center',
  },
  divider: {
    color: '#52525b',
    fontSize: 16,
    marginBottom: 16,
    marginTop: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#9ca3af', 
    textAlign: 'center',
  },
});


