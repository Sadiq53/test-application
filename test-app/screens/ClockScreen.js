import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatTime = (time) => {
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(time.getMilliseconds() / 10).toString().padStart(2, '0');
  
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export default function ClockScreen() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 100); // updates every 100 ms
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.clockFace}>
        <Text style={styles.clockText}>{formatTime(time)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282C34',
  },
  clockFace: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 10,
    borderColor: '#61DAFB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#20232A',
    shadowColor: '#61DAFB',
    shadowOpacity: 0.8,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
  },
  clockText: {
    color: '#61DAFB',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
