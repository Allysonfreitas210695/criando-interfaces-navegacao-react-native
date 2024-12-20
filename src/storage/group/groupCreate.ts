import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "../storageConfig";
import { groupGetAll } from "./groupGetAll";
import { AppError } from "@/utils/AppError";

export async function groupCreate(newGroup: string) {
    try {
        const storedGroups = await groupGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroup);
        if(groupAlreadyExists)
            throw new AppError("Já existe um grupo com esse nome.");

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify([...storedGroups, newGroup]));
    } catch (error) {
        throw error;
    }
}