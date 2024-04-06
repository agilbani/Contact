import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
   styleContent?: object,
   children?: React.ReactNode,
   onPressCamera?: () => void,
   onPressLibrary?: () => void
}

const ModalTakeImage = forwardRef((props: Props, ref) => {
   const [isVisible, setIsVisible] = useState(false);
   useImperativeHandle(ref, () => {
      return {
         show: () => setIsVisible(true),
         hide: () => setIsVisible(false),
      };
   });
   return (
      <Modal 
         onRequestClose={() => ref.current?.hide()}
         transparent 
         visible={isVisible} 
         animationType="slide">
         <View style={styles.container}>
            <View style={[
               styles.content,
               props.styleContent
            ]}>
               <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                     padding: 15
                  }}
                  onPress={props.onPressCamera}
               >
                  <Text>Take an Image from Camera</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                     padding: 15,
                     marginTop: 15
                  }}
                  onPress={props.onPressLibrary}
               >
                  <Text>Take an Image from Library</Text>
               </TouchableOpacity>
            </View>
         </View>
      </Modal>
   );
});

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.1)',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
   },
   content: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 6,
      borderColor: '#dedede',
      // borderWidth: 1,
   },
});

export default ModalTakeImage;
