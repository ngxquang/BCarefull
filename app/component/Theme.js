import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createTheme } from '@rneui/themed';

export const BCarefulTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(120,100,234)',
    secondary: 'rgb(234,121,58)',
  },
 
};

export const BCarefulTheme2 = createTheme(BCarefulTheme);