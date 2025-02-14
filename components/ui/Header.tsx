import { Text, SafeAreaView } from 'react-native';

export default function Header(){
    return (
        <SafeAreaView
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
        </SafeAreaView>
    );
}