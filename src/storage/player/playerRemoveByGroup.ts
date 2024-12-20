import AsyncStorage from "@react-native-async-storage/async-storage";

import { PLAYER_COLLECTION } from "../storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerRemoveByGroup(playerName: string, group: string) {
    try {
        const storage = await playersGetByGroup(group);
        const filtered = storage.filter(player => player.name !== playerName);

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(filtered));
    } catch (error) {
        throw error;
    }
}

