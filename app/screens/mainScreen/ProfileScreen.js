import { Button } from "@rneui/themed";
import { Text, View } from "react-native";
import ThongTinScreen from "../profile/ThongTinScreen";


function ProfileScreen({navigation}) {
    return (
        <View>
            <Text>ProfileScreen</Text>
            <Button
                type="solid"
                onPress={() => navigation.navigate('ThongTin')}
                buttonStyle={{
                    padding: 10,
                    borderRadius: 5

                }}
            >ThongTin</Button>
        </View>
    );
}

export default ProfileScreen;