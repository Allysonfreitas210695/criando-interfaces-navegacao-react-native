import AsyncStorage from "@react-native-async-storage/async-storage";
import { playerStorageDTO } from "./playerStorageDTO";
import { PLAYER_COLLECTION } from "../storageConfig";

export async function playersGetByGroup(group: string) {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);
        const players: playerStorageDTO[] = storage ? JSON.parse(storage) : [];

        return players;
    } catch (error) {
        throw error;
    }
}