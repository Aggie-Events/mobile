import { memo } from "react";
import { SafeAreaView, StyleSheet, useWindowDimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface NestedProps {
  children?: React.ReactNode
}

const Header: React.FC<NestedProps> = ({ children }) => {
  const {height, width} = useWindowDimensions();

  const styles = StyleSheet.create({
    background: {
      width: width,
      height: height / 8,
    }
  })

  return (
    <LinearGradient
      colors = {['#763A3A', '#520D0D']}
      start = {{ x: 0, y: 0 }}
      end = {{ x: 1, y: 0 }}
      style = {styles.background}
    >
      <SafeAreaView>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
}

export default memo(Header);
