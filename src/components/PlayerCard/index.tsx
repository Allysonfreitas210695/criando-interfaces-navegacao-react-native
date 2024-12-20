import React from 'react';
import { MaterialIcons } from "@expo/vector-icons";

import { Container, Icon, Name } from './styles';
import { ButtonIcon } from '../ButtonIcon';

type Props = {
    icon?: keyof typeof MaterialIcons.glyphMap;
    name: string;
    onRemove: () => void;
};

export function PlayerCard({ icon = "person", name, onRemove }: Props) {
    return (
        <Container>
            <Icon
                name={icon as keyof typeof MaterialIcons.glyphMap}
            />
            <Name>
                {name}
            </Name>

            <ButtonIcon
                icon='close'
                type='SECONDARY'
                onPress={onRemove}
            />
        </Container>
    );
}
