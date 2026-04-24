import { db } from '../firebaseConfig';
import { ref, get } from 'firebase/database';

export type Jugador = {
  id: string;
  nombre: string;
  apellidos: string;
  edad: number;
  altura: number;
  posicion: string;
  photoUrl: string;
  videoUrl: string;
};

export const getJugadoresOnce = async (): Promise<Jugador[]> => {
  const snapshot = await get(ref(db, 'jugadores/jugadores'));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.keys(data).map((key) => {
    const item = data[key];
    return {
      id: key,
      nombre: item.nombre ?? '',
      apellidos: item.apellidos ?? '',
      edad: item.edad ?? 0,
      altura: item.altura ?? 0,
      posicion: item.posicion ?? '',
      photoUrl: item.photoUrl ?? '',
      videoUrl: item.videoUrl ?? '',
    };
  });
};