import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';


import { Loading } from '@/components/Loading';

import theme from '@/theme';
import { ThemeProvider } from 'styled-components/native';
import { Routes } from '@/routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  useEffect(() => {
    if (fontsLoaded)
      SplashScreen.hideAsync();
  }, [fontsLoaded]);


  return (
    <ThemeProvider theme={theme}>
      <StatusBar
      barStyle={'light-content'}
      backgroundColor={"transparent"}
      translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
