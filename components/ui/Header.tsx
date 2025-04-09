import { memo } from "react";
import { SafeAreaView, StyleSheet, Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

interface NestedProps {
  children?: React.ReactNode
}

const Header: React.FC<NestedProps> = memo(({ children }) => {

  return (
    <LinearGradient
      colors = {['#763A3A', '#520D0D']}
      start = {{ x: 0, y: 0 }}
      end = {{ x: 1, y: 0 }}
      style = {styles.background}
    >
      <SafeAreaView style = {styles.container}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style = {{ width: 40, height: 40, marginLeft: 20 }}
        />
        <MaskedView maskElement={<Text style = {{ fontSize: 25, fontFamily: 'inter', fontWeight: 'bold', textAlign: 'center' }}>AggieEvents</Text>}>
          <LinearGradient
            colors={["white", "#c2c2c2"]} // Gradient colors
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: 200, height: 30 }}
          />
        </MaskedView>
        <View style = {styles.rightContent}>
          {children}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 110,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  rightContent: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    marginRight: 20
  }
})

export default memo(Header);
