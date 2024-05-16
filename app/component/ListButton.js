import React from "react";
import { Button, Text } from "@rneui/themed";
import { View, Image } from "react-native";
import { BCarefulTheme } from "./Theme";
import Fonts from "../../assets/fonts/Fonts";

export function ButtonIcon({ title, name, navigation }) {
  let img = 0;
  if (name == 'DatLich') {
    img = require('../../assets/images/DatLich.png')
  } else if (name == 'TheoDoi') {
    img = require('../../assets/images/TheoDoi.png')
  } else if (name == 'LichThuoc') {
    img = require('../../assets/images/LichThuoc.png')
  } else if (name == 'QuyTrinh') {
    img = require('../../assets/images/QuyTrinh.png')
  }

  return (
    <View style={{ flex: 1 }}>
      <Button
        type="outline"
        onPress={() => navigation.navigate(name)}
        buttonStyle={{
          borderColor: BCarefulTheme.colors.primary,
          borderWidth: 3,
          borderRadius: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: 5,
        }}
      >
        <Image
          source={img}
          style={{
            width: 'auto',
            height: '80%',
            aspectRatio: 1,
            resizeMode: 'contain',
            marginRight: 8,
          }}
        />
        <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
          <Text style={{ fontFamily: Fonts.bold, color: 'black', flexShrink: 1 }}>
            {title}
          </Text>
        </View>
      </Button>
    </View>
  );
}
