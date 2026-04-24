import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { router } from 'expo-router';
import { getJugadoresOnce, Jugador } from '../services/jugadoresService';

export default function InicioScreen() {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarJugadores = async () => {
      try {
        const lista = await getJugadoresOnce();
        setJugadores(lista);
      } catch (error) {
        console.log('Error cargando jugadores desde Firebase:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarJugadores();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Cargando jugadores...</Text>
      </View>
    );
  }

  if (jugadores.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          No se han encontrado jugadores en Firebase.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Jugadores disponibles
      </Text>

      <FlatList
        data={jugadores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
              marginBottom: 8,
              borderWidth: 1,
              borderRadius: 8,
            }}
            onPress={() =>
              router.push({
                pathname: '/detalle',
                params: {
                  id: item.id,
                  nombre: item.nombre,
                  apellidos: item.apellidos,
                  edad: String(item.edad),
                  altura: String(item.altura),
                  posicion: item.posicion,
                  photoUrl: item.photoUrl,
                  videoUrl: item.videoUrl,
                },
              })
            }
          >
            {item.photoUrl ? (
              <Image
                source={{ uri: item.photoUrl }}
                style={{ width: 60, height: 60, borderRadius: 30, marginRight: 12 }}
              />
            ) : null}

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, fontWeight: '600' }}>
                {item.nombre} {item.apellidos}
              </Text>
              <Text>{item.posicion}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}