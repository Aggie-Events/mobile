import React, {memo} from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { View, Text, Pressable, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

interface BaseBottomSheetProps {
  title: string;
  subtitle?: string;
  iconName: React.ComponentProps<typeof Ionicons>['name'];
  snapPoints: number[] | string[];
  index: number;
  onChange: (index: number) => void;
  backdropComponent: (props: BottomSheetBackdropProps) => React.JSX.Element;
  withoutFeedbackPress?: () => void;
  handleDismiss: () => void;
  children?: React.ReactNode;
}

const BaseBottomSheet = React.forwardRef<BottomSheetModal, BaseBottomSheetProps>((props, ref) => {
  const { title, subtitle, iconName, snapPoints, index, onChange, backdropComponent, withoutFeedbackPress, handleDismiss, children } = props
  const styles = StyleSheet.create({
    centerAlignItems: {
      alignItems: 'center'
    },
    iconHeader: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 16
    },
    iconBackground: {
      backgroundColor: '#800000',
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100
    },
    modalTitle: {
      fontSize: 20,
      color: 'black',
      fontWeight: 'bold',
      marginBottom: 16,
      alignSelf: 'flex-start', 
      marginLeft: 16
    },
    modalSubtitle: {
      fontSize: 16,
      color: '#333',
      fontWeight: '300',
      marginBottom: 16,
      alignSelf: 'flex-start',
      marginLeft: 16
    },
  });

  return (
   <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      index={index}
      enablePanDownToClose={true}
      enableDismissOnClose={true}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      onChange={onChange}
      backdropComponent={backdropComponent}
    >
      <TouchableWithoutFeedback onPress={withoutFeedbackPress}>
        <View style = {{ flex: 1 }}>
          <BottomSheetView style = {styles.centerAlignItems}>
            <View style = {styles.iconHeader}>
              <View style = {styles.iconBackground}>
                <Ionicons name={iconName} size={24} color="white" />
              </View>
              <Pressable onPress={handleDismiss}>
                <Ionicons name="close-circle" size={28} color='gray' />
              </Pressable>
            </View>
            <Text style = {styles.modalTitle}>{title}</Text>
            <Text style = {styles.modalSubtitle}>{subtitle ?? ""}</Text>
          </BottomSheetView>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
});

export default memo(BaseBottomSheet);