import React from "react";
import {
   View,
   TouchableOpacity,
   Text,
   StyleSheet,
   Image
} from 'react-native';

interface Props {
   title: string,
   onLeftPress?: () => void;
}

const Header = ({
   title,
   onLeftPress
}: Props) => {
   return(
      <View style={styles.container}>
         {
            onLeftPress ?
               <TouchableOpacity
                  onPress={onLeftPress}
                  activeOpacity={0.8}
                  style={[styles.width20, {
                     justifyContent: 'center',
                     alignItems: 'flex-start',
                     paddingLeft: 10
                  }]}
               >
                  <Image
                     source={require('../assets/icons/arrow_left.png')}
                     style={{
                        width: 20,
                        height: 20
                     }}
                  />
               </TouchableOpacity>
            :
               <View style={styles.width20} />
         }
         <View style={styles.width60}>
            <Text style={{
               fontSize: 18,
               fontWeight: '600'
            }}>{title}</Text>
         </View>
         <View style={styles.width20} />
      </View>
   )
}

const styles = StyleSheet.create({
   width60: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
   },
   container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 15,
      borderBottomColor: '#a5a5a5',
      borderBottomWidth: 0.7
   },
   width20: {
      width: '20%'
   }
})

export default Header;