import { Text, View } from 'react-native';

export default function Header(){
    return (
        <View
            style={{
                backgroundColor: 'purple',
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
          <Text>
              Logo
          </Text>
          <Text>
            Search
          </Text>
        </View>
    );
}