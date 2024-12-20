import React, { useEffect, useRef, useState } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Alert, FlatList, TextInput, Keyboard } from 'react-native';

import { Button } from '@/components/Button';
import { ButtonIcon } from '@/components/ButtonIcon';
import { Filter } from '@/components/Filter';
import { Input } from '@/components/Input';
import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
import { PlayerCard } from '@/components/PlayerCard';
import { ListEmpty } from '@/components/ListEmpty';
import { Loading } from '@/components/Loading';

import { playerAddByGroup } from '@/storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@/storage/player/playersGetByGroupAndTeam';
import { playerStorageDTO } from '@/storage/player/playerStorageDTO';
import { playerRemoveByGroup } from '@/storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@/storage/group/groupRemoveByName';

import { AppError } from '@/utils/AppError';


import { Container, Form, HeaderList, NumberOfPlayers } from './styles';

type RouteParams = {
  group: string
};

export function Players() {
  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  const [isLoading, setIsLoading] = useState(true);

  const [newPlayerName, setNewPlayerName] = useState('');

  const [team, setTeam] = useState('Time A');

  const [players, setPlayers] = useState<playerStorageDTO[]>([]);

  const newPlayerNameInputRef = useRef<TextInput | null>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0)
      return Alert.alert("Nova Pessoa", "Informe o nome da pessoa para adicionar");

    const newPlayer = { name: newPlayerName, team };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef?.current?.blur();
      Keyboard.dismiss();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if (error instanceof AppError)
        Alert.alert("Nova Pessoa", error.message);
      else
        Alert.alert("Nova Pessoa", "Não foi possível adicionar!");
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const players = await playersGetByGroupAndTeam(group, team);
      setPlayers(players);
    } catch (error) {
      Alert.alert("Pessoas", "Não foi possível carregar as pessoas do time selecionada!");
    }finally {
      setIsLoading(false);
    }
  }

  async function handlePlayerRemove(player: playerStorageDTO) {
    try {
      await playerRemoveByGroup(player.name, group);
      fetchPlayersByTeam();
    } catch (error) {
      Alert.alert("Removendo Pessoa", "Não foi possível remover essa pessoa!");
    }
  }

  async function handleGroupRemove() {
    try {
      Alert.alert(
        "Remover",
        "Deseja remover o grupo?",
        [
          {
            text: "Não",
            style: 'cancel'
          },
          {
            text: "Sim",
            onPress: async () => {
              await groupRemoveByName(group);
              navigation.navigate('groups');
            }
          }
        ])
    } catch (error) {
      Alert.alert("Removendo Pessoa", "Não foi possível remover essa pessoa!");
    }
  }

  useEffect(() => {
    if (!!group && !!team) {
      fetchPlayersByTeam();
    }
  }, [group, team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight
        title={group}
        subTitle="Adicione a galera e separe os times"
      />

      <Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon
          icon='add'
          onPress={handleAddPlayer}
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      {isLoading ?
        <Loading /> :
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item)}
            />
          )}
          contentContainerStyle={[{ paddingBottom: 100 }, players.length === 0 && { flex: 1 }]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmpty
              message='Não há pessoas nesse time'
            />
          )}
        />}

      <Button
        title='Remover turma'
        type='SECONDARY'
        onPress={handleGroupRemove}
      />

    </Container>
  )
}