import { BlurView } from 'expo-blur';
import { View } from 'react-native';


export default function MenuBlur(){
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: '100%',
          height: 55,
          borderRadius: 90,
          borderTopColor: 'white',
          borderBottomColor: 'white',
          overflow: 'hidden',
        }}
      >
        <BlurView
          intensity={10}
          experimentalBlurMethod='dimezisBlurView' // TODO: is it worth keeping this?
          style={{ flex: 1, backgroundColor: ' rgba(235, 235, 235, 0.4)' }}
        />
      </View>
    </View>
  );
};