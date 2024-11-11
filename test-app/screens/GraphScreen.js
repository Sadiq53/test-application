import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import {fetchApi} from '../service/fetchingApi'

const screenWidth = Dimensions.get('window').width;

export default function GraphScreen() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [noResults, setNoResults] = useState(false); // Added noResults state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchApi();
      setData(response.data);
      setFilteredData(response.data);
      setLoading(false);
      setNoResults(false); // Reset noResults on data fetch
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text === '') {
      setFilteredData(data);
      setNoResults(false);
    } else {
      const results = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(results);
      setNoResults(results.length === 0); // Set noResults to true if no matches
    }
  };

  const handleSort = () => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.current_price - b.current_price;
      } else {
        return b.current_price - a.current_price;
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Check if filteredData has data for the chart and labels
  const labels = filteredData.length > 0 ? filteredData.map((item, index) => 
    index % 2 === 0 ? item.name : ""
  ) : [];
  
  // Ensure datasets is only populated if there is data to show
  const chartData = filteredData.length > 0 ? {
    labels: labels,
    datasets: [
      {
        data: filteredData.map((item) => item.current_price),
      },
    ],
  } : null;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <Button title={`Sort by Price (${sortOrder})`} onPress={handleSort} />

      {filteredData.length > 0 && chartData && (
        <LineChart
          data={chartData}
          width={screenWidth - 20} 
          height={220}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: '#1E2923',
            backgroundGradientFrom: '#1E2923',
            backgroundGradientTo: '#08130D',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForLabels: {
              fontSize: 10, // Reduced font size for labels
            },
          }}
          style={styles.chart}
        />
      )}

      {noResults ? (
        <Text style={styles.noResultsText}>No results found for "{searchTerm}"</Text>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}: ${item.current_price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  noResultsText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
