import * as React from 'react';
import {Header, Icon} from '@rneui/base';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, View} from 'react-native';
import {BCarefulTheme, style} from './Theme';
import Fonts from '../../assets/fonts/Fonts';
import {BackToHomeBtn} from './ButtonHome';
import Progress from './datLich/Progress';

export function DatLich({title}) {
  return (
    <View style={{alignContent: 'center', justifyContent: 'center'}}>
      <Header
        backgroundColor="white"
        centerComponent={{
          text: title,
          style: styles.header,
        }}
        leftComponent={BackToHomeBtn}
        leftContainerStyle={{marginTop: -5}}
        statusBarProps={{barStyle: 'dark-content'}}
      />
    </View>
  );
}

export function DatLichHeader({title, values}) {
  return (
    <View style={{backgroundColor: '#fff'}}>
      {/* <SafeAreaView style={{flex: 1}}> */}
      <DatLich title={title} />
      <View style={{padding: 30, backgroundColor: '#fff'}}>
        <Progress values={values ? values : 0} />
      </View>
      {/* </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: '#000',
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
});
