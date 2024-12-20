import { View } from 'react-native';
import React from 'react'
import { useTheme } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';

// Rotas
import { AppRoutes } from './app.routes';

export function Routes() {
  const { COLORS } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.GRAY_600 }}>
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}