import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Linking
} from 'react-native';
import { getPlayerById } from '../services/playerService';

// Componente temporal para YouTube (abre el video en el navegador)
const YouTubePlayer = ({ videoUrl }) => {
  return (
    <TouchableOpacity
      style={styles.videoButton}
      onPress={() => Linking.openURL(videoUrl)}
    >
      <Text style={styles.videoButtonText}>▶ Ver video en YouTube</Text>
    </TouchableOpacity>
  );
};

const PlayerDetailScreen = ({ route, navigation }) => {
  const { playerId } = route.params;
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPlayer();
  }, [playerId]);

  const loadPlayer = async () => {
    setLoading(true);
    const data = await getPlayerById(playerId);
    setPlayer(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!player) {
    return (
      <View style={styles.centerContainer}>
        <Text>Jugador no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: player.imagen || 'https://via.placeholder.com/400' }}
        style={styles.headerImage}
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{player.nombre} {player.apellidos}</Text>
        <Text style={styles.position}>{player.posicion}</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{player.edad}</Text>
            <Text style={styles.statLabel}>Edad</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{player.altura}cm</Text>
            <Text style={styles.statLabel}>Altura</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>#{player.numero}</Text>
            <Text style={styles.statLabel}>Número</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{player.puntosPorPartido}</Text>
            <Text style={styles.statLabel}>Puntos/Partido</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nacionalidad:</Text>
          <Text style={styles.infoValue}>{player.nacionalidad}</Text>
        </View>

        {player.videoUrl && (
          <View style={styles.videoContainer}>
            <Text style={styles.sectionTitle}>Video destacado</Text>
            <YouTubePlayer videoUrl={player.videoUrl} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  position: {
    fontSize: 18,
    color: '#3498db',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    width: '23%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    width: 100,
  },
  infoValue: {
    fontSize: 16,
    color: '#34495e',
    flex: 1,
  },
  videoContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  videoButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  videoButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlayerDetailScreen;