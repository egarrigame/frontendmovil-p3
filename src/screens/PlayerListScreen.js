import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { getPlayers } from '../services/playerService';

const PlayerListScreen = ({ navigation }) => {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [searchText, players]);

  const loadPlayers = async () => {
    setLoading(true);
    const data = await getPlayers();
    setPlayers(data);
    setFilteredPlayers(data);
    setLoading(false);
  };

  const filterPlayers = () => {
    if (searchText === '') {
      setFilteredPlayers(players);
    } else {
      const filtered = players.filter(player =>
        player.nombre.toLowerCase().includes(searchText.toLowerCase()) ||
        player.apellidos.toLowerCase().includes(searchText.toLowerCase()) ||
        player.posicion.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPlayers(filtered);
    }
  };

  const renderPlayer = ({ item }) => (
    <TouchableOpacity
      style={styles.playerCard}
      onPress={() => navigation.navigate('PlayerDetail', { playerId: item.id })}
    >
      <Image
        source={{ uri: item.imagen || 'https://via.placeholder.com/80' }}
        style={styles.playerImage}
      />
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>
          {item.nombre} {item.apellidos}
        </Text>
        <Text style={styles.playerDetails}>
          {item.posicion} | {item.edad} años | #{item.numero}
        </Text>
        <Text style={styles.playerStats}>
          Puntos: {item.puntosPorPartido} | Altura: {item.altura}cm
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar jugador..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={filteredPlayers}
        renderItem={renderPlayer}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  playerCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  playerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  playerDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 4,
  },
  playerStats: {
    fontSize: 12,
    color: '#3498db',
    marginTop: 4,
  },
});

export default PlayerListScreen;