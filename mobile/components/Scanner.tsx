import { CameraView, useCameraPermissions, BarcodeScanningResult } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Scanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleScan = ({ type, data }: BarcodeScanningResult) => {
    setScanned(true);
    console.log('type: ', type);
    console.log('data: ', data);
    alert(`Scanned type: ${type}\nData: ${data}`);
  };

  return (
    <View style={styles.container}>
      <View className="absolute bottom-0 left-0 right-0 top-0 z-10 flex items-center justify-center bg-transparent">
        <View className="flex-1 items-center justify-center opacity-30">
          <Icon name="scan-outline" size={350} color="white" />
        </View>
      </View>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleScan}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        style={styles.camera}
        facing="back"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
