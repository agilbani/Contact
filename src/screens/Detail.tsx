import React, {useState, useEffect} from 'react';
import { 
   Text, 
   View, 
   StyleSheet,
   TextInput,
   ScrollView,
   KeyboardAvoidingView,
   Image,
   PermissionsAndroid,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import API from '../utils/axiosService';

interface props {
   navigation: StackNavigationProp<RootStackParam, 'Detail'>;
   route: RouteProp<RootStackParam, 'Detail'>
}

interface DataContact {
   "id": string,
   "firstName": string,
   "lastName": string,
   "age": number,
   "photo": string
}

const Detail: React.FC<props> = ({navigation, route}) => {
   const dispatch = useDispatch();
   const data = useSelector((state: any) => state.contact);
   const [dataDetail, setDataDetail] = useState<DataContact>();

   console.log('state data detail', data);
   console.log('props data detail', route);
   
   const getDetail = async () => {
      const id = `${route.params.id}`;
      const detailContact = await API.getContactById(dispatch, id);
   }

   useEffect(() => {
      getDetail();
   },[])
   
   return (
      <View style={styles.container}>
         <Text>detail screen</Text>
      </View>
   );
};

export default Detail;

const styles = StyleSheet.create({
   container: {}
});
