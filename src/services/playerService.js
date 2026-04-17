import { db } from '../config/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc } from 'firebase/firestore';

// Obtener todos los jugadores
export const getPlayers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "players"));
    const players = [];
    querySnapshot.forEach((doc) => {
      players.push({ id: doc.id, ...doc.data() });
    });
    return players;
  } catch (error) {
    console.error("Error obteniendo jugadores:", error);
    return [];
  }
};

// Obtener un jugador por su ID
export const getPlayerById = async (id) => {
  try {
    const docRef = doc(db, "players", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error obteniendo jugador:", error);
    return null;
  }
};

// Añadir un nuevo jugador (opcional)
export const addPlayer = async (playerData) => {
  try {
    const docRef = await addDoc(collection(db, "players"), playerData);
    return { id: docRef.id, ...playerData };
  } catch (error) {
    console.error("Error añadiendo jugador:", error);
    return null;
  }
};

// Actualizar un jugador existente (opcional)
export const updatePlayer = async (id, playerData) => {
  try {
    const docRef = doc(db, "players", id);
    await updateDoc(docRef, playerData);
    return { id, ...playerData };
  } catch (error) {
    console.error("Error actualizando jugador:", error);
    return null;
  }
};