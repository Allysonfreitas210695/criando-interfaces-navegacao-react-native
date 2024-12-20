import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "@/utils/AppError";
import { playerStorageDTO } from "./playerStorageDTO";
import { PLAYER_COLLECTION } from "../storageConfig";
import { playersGetByGroup } from "./playersGetByGroup";

export async function playerAddByGroup(newPlayer: playerStorageDTO, group: string) {
    try {
        const storedPlayers = await playersGetByGroup(group);

        const playersAlreadyExists = storedPlayers.filter(player => player.name == newPlayer.name);
        if (playersAlreadyExists.length > 0)
            throw new AppError("Essa pessoa já está adicionada em um time aqui.");

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify([...storedPlayers, newPlayer]));
    } catch (error) {
        throw error;
    }
}