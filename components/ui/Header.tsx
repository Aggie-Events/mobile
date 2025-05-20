import { memo, useCallback } from "react";
import { StyleSheet, Image, Text, View, Platform, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { logo } from "../../app/_layout";
import { STATUSBAR_HEIGHT } from "@/constants/constants";

interface NestedProps {
  children?: React.ReactNode
}

const backgroundGradient: [string, string] = ['#763A3A', '#520D0D'];
const textGradient: [string, string] = ['white', '#c2c2c2'];
const start: { x: number, y: number } = { x: 0, y: 0 };
const end: { x: number, y: number } = { x: 1, y: 0 };

const Header: React.FC<NestedProps> = ({ children }) => {
  const renderLogo = useCallback(() => {
    return (
      <Image 
        defaultSource={logo}
        fadeDuration={0}
        source={logo} 
        style = {styles.logo}
      />
    );
  }, []);

  return (
    <LinearGradient
      colors = {backgroundGradient}
      start = {start}
      end = {end}
      style = {styles.background}
    >
      <View style = {styles.container}>
        {renderLogo()}
        <View style = {{flex: 1, alignItems: 'center', paddingTop: Platform.OS == "ios" ? 0 : 10}}>
          <MaskedView maskElement={<Text style = {styles.titleMask}>AggieEvents</Text>}>
            <LinearGradient
              colors={textGradient} // Gradient colors
              start={start}
              end={end}
              style={styles.title}
            />
          </MaskedView>
        </View>
        <View style = {styles.rightContent}>
          {children}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: Platform.OS == "ios" ? 110 : 80,
  },
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center', 
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: STATUSBAR_HEIGHT,
  },
  rightContent: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    marginRight: 20
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 20,
    resizeMode: 'contain',
    backgroundColor: 'transparent'
  },
  title: {
    width: 200,
    height: Platform.OS == 'ios' ? 30 : 40,
  },
  titleMask: {
    fontSize: 25,
    fontFamily: 'inter',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default memo(Header);
