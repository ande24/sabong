import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, StyleSheet } from 'react-native';
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
          const betList = betSnapshot.docs.map((doc) => ({
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
  }, [user]);

  const BetItem = React.memo(({ bet, index, isLastItem }: any) => (
    <View>
      <View style={styles.betContainer}>
        <View style={styles.venueContainer}>
          <Text style={styles.venueText}>{bet.venue}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>SIDE</Text>
            <Text style={styles.label}>:</Text>
          </View>
          <View style={styles.valueContainer}>
            <View
              style={[
                styles.sideContainer,
                bet.side === 'MERON'
                  ? styles.sideMeron
                  : bet.side === 'WALA'
                  ? styles.sideWala
                  : styles.sideDraw,
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
            <Text style={styles.label}>FIGHT NUMBER</Text>
            <Text style={styles.label}>:</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>{bet.fight_number}</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          {bet.address1}
          {'\n'}
          {bet.address2}
        </Text>
      </View>

      {!isLastItem && (
        <Text style={styles.divider}>────────────────────────────────────────</Text>
      )}
    </View>
  ));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>BET SUMMARY</Text>

      <FlatList
        style={{ paddingTop: 8 }}
        data={bets}
        keyExtractor={(item) => item.id}
        renderItem={({ item: bet, index }) => (
          <BetItem 
            bet={bet} 
            index={index} 
            isLastItem={bets.length - 1 === index} 
          />
        )}
        initialNumToRender={10}        
        showsVerticalScrollIndicator={false}
        maxToRenderPerBatch={10}
        getItemLayout={(data, index) => ({
          length: 150,
          offset: 150 * index,
          index,
        })}
      />
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
    flex: 1,
    marginBottom: 8,
    width: '100%',
  },
  venueContainer: {
    borderWidth: 1,
    borderColor: '#52525b',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  venueText: {
    fontSize: 18,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 16,
  },
  labelContainer: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    color: '#52525b',
  },
  valueContainer: {
    paddingLeft: 12,
  },
  sideContainer: {
    borderRadius: 4,
    padding: 4,
    alignSelf: 'flex-start',
  },
  sideMeron: {
    backgroundColor: '#dc2626',
  },
  sideWala: {
    backgroundColor: '#2563eb',
  },
  sideDraw: {
    backgroundColor: '#16a34a',
  },
  value: {
    fontSize: 18,
    color: 'white',
  },
  footer: {
    fontSize: 18,
    color: '#52525b',
    textAlign: 'center',
    marginTop: 8,
  },
  divider: {
    color: '#52525b',
    fontSize: 16,
    marginBottom: 40,
    marginTop: 24,
    textAlign: 'center',
  },
});


