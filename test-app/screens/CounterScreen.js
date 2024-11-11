import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CounterScreen() {
  const [count, setCount] = useState(1);

  const handleInputChange = (value) => {
    if (value === '' || !isNaN(value)) {
      setCount(value === '' ? 0 : parseInt(value));
    }
  };

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterLabel}>Counter</Text>
      <View style={styles.counterControls}>
        <TouchableOpacity
          style={[styles.button, styles.buttonMinus]}
          onPress={() => setCount(count - 1)}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.counterInput}
          keyboardType="numeric"
          value={count.toString()}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonPlus]}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  counterLabel: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 200,
  },
  counterInput: {
    width: 80,
    height: 40,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 10,
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonMinus: {
    backgroundColor: '#ff5c5c',
  },
  buttonPlus: {
    backgroundColor: '#5c85ff',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
