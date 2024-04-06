import * as React from 'react';
import { Text, TouchableOpacity, Image, View, FlatList, StyleSheet } from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import API from '../utils/axiosService';
import {useDispatch, useSelector} from 'react-redux';
import LoadImage from '../components/LoadImage';
import Header from '../components/Header';
import {useIsFocused} from '@react-navigation/native';
import LoadingManager from '../utils/LoadingManager';

interface props {
   navigation: StackNavigationProp<RootStackParam, 'Home'>;
   route: RouteProp<RootStackParam, 'Home'>
}

const Home: React.FC<props> = ({navigation}) => {
   const dispatch = useDispatch();
   const isFocused = useIsFocused();
   const data = useSelector((state: any) => state.contact);

   const getData = async () => {
      LoadingManager.show();
      const dataContact = await API.getContact(dispatch);
      LoadingManager.hide();
      console.log('cek dataContact', dataContact);
      // dispatch(getContact());
   }

   React.useEffect(() => {
      getData();
   },[isFocused]);
   console.log('cek data home', data);
   
   return (
      <View style={styles.container}>
         <Header
            title='Contact'
         />
         <FlatList
            data={data.dataContact}
            contentContainerStyle={{paddingBottom: 30}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
               <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.item}
                  onPress={() => navigation.navigate('AddContact', {id: item.id})}
               >
                  <View style={{
                     width: '30%',
                  }}>
                     <LoadImage
                        src={item.photo}
                        style={styles.img}
                     />
                  </View>
                  <View style={{
                     width: '70%',
                  }}>
                     <View style={styles.viewRow}>
                        <Text>First Name: </Text>
                        <Text>{item.firstName}</Text>
                     </View>
                     <View style={styles.viewRow}>
                        <Text>Last Name: </Text>
                        <Text>{item.lastName}</Text>
                     </View>
                     <View style={styles.viewRow}>
                        <Text>Age: </Text>
                        <Text>{item.age}</Text>
                     </View>
                  </View>
               </TouchableOpacity>
            )}
         />
         <TouchableOpacity 
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AddContact', {id: ""})}
            style={styles.floatingBtn}>
            <Image
               source={require('../assets/icons/pen.png')}
               style={{
                  width: 25,
                  height: 25,
                  tintColor: '#fff'
               }}
            />
         </TouchableOpacity>
      </View>
   );
};

export default Home;

const styles = StyleSheet.create({
   floatingBtn: {
      position: 'absolute',
      bottom: 20,
      right: 10,
      backgroundColor: 'red',
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center'
   },
   img: {
      width: 90,
      height: 90,
      resizeMode: 'cover',
      borderRadius: 90/2
   },
   item: {
      width: '90%',
      marginTop: 15,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center'
   },
   viewRow: {
      flexDirection: 'row', 
      alignItems: 'center'
   },
   container: {
      flex: 1
   }
});
