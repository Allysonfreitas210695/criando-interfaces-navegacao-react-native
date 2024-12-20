import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Header } from '@/components/Header';
import { Highlight } from '@/components/Highlight';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { Container, Content, Icon } from './styles';
import { groupCreate } from '@/storage/group/groupCreate';
import { AppError } from '@/utils/AppError';
import { Alert } from 'react-native';

export function NewGroup() {
    const navigation = useNavigation();

    const [group, setGroup] = useState('');

    async function handleNew() {
        try {
            if (group.trim().length === 0)
                return Alert.alert("Novo Group", "Informe o nome da turma.");

            await groupCreate(group);
            navigation.navigate('players', { group })
        } catch (error) {
            if (error instanceof AppError)
                Alert.alert("Novo Group", error.message);
            else
                Alert.alert("Novo Group", "Não foi possível criar um novo grupo.");
        }
    }

    return (
        <Container>
            <Header
                showBackButton
            />

            <Content>
                <Icon />

                <Highlight
                    title='Nova turma'
                    subTitle='crie a turma para adiciona as pessoas'
                />

                <Input
                    placeholder="Nome da turma"
                    onChangeText={setGroup}
                    value={group}
                />

                <Button
                    title='Criar'
                    style={{ marginTop: 20 }}
                    onPress={handleNew}
                />
            </Content>
        </Container>
    );
}