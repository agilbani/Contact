import React, {useState, useEffect, useRef} from 'react';
import { 
   Text, 
   TouchableOpacity,
   ScrollView,
   KeyboardAvoidingView,
   Image, 
   View, 
   ToastAndroid,
   PermissionsAndroid,
   StyleSheet,
   TextInput
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import API from '../utils/axiosService';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../components/Header';
import ModalTakeImage from '../components/modal/ModalTakeImage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LoadingManager from '../utils/LoadingManager';

interface props {
   navigation: StackNavigationProp<RootStackParam, 'AddContact'>;
   route: RouteProp<RootStackParam, 'AddContact'>
}

const options = {
   storageOptions: {
      skipBackup: true,
      path: 'images',
   },
   includeBase64: true,
   mediaType: 'photo',
   quality: 0.6,
};

const AddContact: React.FC<props> = ({navigation, route}) => {
   const refModal = useRef();
   const dispatch = useDispatch();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [age, setAge] = useState('');
   const [photo, setPhoto] = useState('');

   const checkPermissionCamera = async () => {
      try {
         const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
               title: 'App Camera Permission',
               message: 'App needs access to your camera ',
               buttonNeutral: 'Ask Me Later',
               buttonNegative: 'Cancel',
               buttonPositive: 'OK',
            },
         );
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {            
            return true;
         }
         return false;
      } catch (err) {
         return false;
      }
   }

   const toLaunchCamera = async () => {
      if (await checkPermissionCamera()) {
         LaunchCamera();
      } else {
         checkPermissionCamera();
      }
   };

   const toLaunchImageGallery = async () => {
      console.log('galery');
      getFromLibrary();
   };

   const LaunchCamera = () => {
      launchCamera(options, (response) => {
         if (response.didCancel) {
            // console.log('User cancelled image picker');
         } else if (response.error) {
            //   console.log('ImagePicker Error: ', response.error);
         } else {
            console.log('response img camera', response);
            setPhoto(`data:image/png;base64,${response.assets[0].base64}`)
         }
      });
   };
   const getFromLibrary = () => {
      launchImageLibrary(options, (response) => {
         if (response.didCancel) {
            //   console.log('User cancelled image picker');
            console.log('cancel', response);
            
         } else if (response.error) {
            //   console.log('ImagePicker Error: ', response.error);
            console.log('err', response);
         } else {
            console.log('response img camera', response);
            setPhoto(`data:image/png;base64,${response.assets[0].base64}`)
         }
      });
   };

   const postData = async () => {
      LoadingManager.show();
      const body = {
         firstName,
         lastName,
         age,
         photo
      }
      const postContact = await API.postContact(dispatch, body);
      LoadingManager.hide();
      console.log('cek postContact', postContact);
      
   }

   const validation = () => {
      let disable = false;
      const dataval = {
         firstName,
         lastName,
         age,
         photo
      }
      const dataEmpty = Object.keys(dataval).filter(val => dataval[val] === '');
      if (dataEmpty.length > 0) {
         disable = true
      }
      return disable;
   }

   const getDetailContact = async () => {
      LoadingManager.show();
      const id = `${route.params.id}`;
      const detailContact = await API.getContactById(dispatch, id);
      LoadingManager.hide();
      console.log('cek detail kontak', detailContact);
      if (detailContact) {
         if (detailContact.payload?.data) {
            const contact = detailContact.payload.data;
            setFirstName(contact.firstName);
            setLastName(contact.lastName);
            setAge(`${contact.age}`);
            setPhoto(contact.photo);
         }
      }
      
   }

   const editData = async () => {
      LoadingManager.show();
      const id = `${route.params.id}`;
      const body = {
         firstName,
         lastName,
         age,
         photo
      }
      const res = await API.editContact(dispatch, body, id);
      LoadingManager.hide();
      console.log('res edit contact', res);
      if (res === 200 || res === 201) {
         ToastAndroid.showWithGravityAndOffset(
            "Edit data success",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
         );
      } else {
         ToastAndroid.showWithGravityAndOffset(
            'Server error, trya again later',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
         );
      }
   }

   const deleteData = async () => {
      LoadingManager.show();
      const id = `${route.params.id}`;
      const res = await API.deleteContact(id);
      LoadingManager.hide();
      console.log('res delete', res);
      if (res === 200 || res === 201) {
         ToastAndroid.showWithGravityAndOffset(
            "Delete data success",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
         );
      } else {
         ToastAndroid.showWithGravityAndOffset(
            'Server error, trya again later',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
         );
      }
   }

   useEffect(() => {
      if (route.params.id !== '') {
         getDetailContact();
      }
   },[])

   return(
      <View style={{flex: 1}}>
         <ModalTakeImage
            ref={refModal}
            onPressCamera={() => {
               refModal.current?.hide();
               toLaunchCamera();
            }}
            onPressLibrary={() => {
               refModal.current?.hide();
               toLaunchImageGallery();
            }}
         />
         <Header
            title="Add Contact"
            onLeftPress={() => navigation.goBack()}
         />
         <ScrollView 
            style={{padding: 10}}
            showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView
               behavior='position'
               enabled
               keyboardVerticalOffset={-500}
            >
               <TextInput
                  placeholder='Add First Name'
                  style={styles.txtInput}
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
               />
               <TextInput
                  placeholder='Add Last Name'
                  style={[styles.txtInput, {marginTop: 15}]}
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
               />
               <TextInput
                  placeholder='Add Age'
                  keyboardType='number-pad'
                  style={[styles.txtInput, {marginTop: 15}]}
                  value={age}
                  onChangeText={(text) => setAge(text)}
               />
               <View style={styles.box}>
                  {
                     photo !== '' ? (
                        <Image
                           source={{uri: photo}}
                           style={{
                              width: 100,
                              height: 100
                           }}
                        />
                     )
                     :
                     <Text style={{
                        fontSize: 16,
                        fontWeight: '600'
                     }}>
                        Add your profile image
                     </Text>
                  }
                  <TouchableOpacity
                     activeOpacity={0.8}
                     style={styles.btnAddImg}
                     onPress={() => refModal?.current.show()}

                  >
                     <Text style={{color: '#fff', fontWeight: '600'}}>
                        Take an image
                     </Text>
                  </TouchableOpacity>
               </View>
               <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.btnSend, {
                     backgroundColor: validation() ? 'grey' : '#43a047'
                  }]}
                  onPress={() => {
                     if (route.params.id !== "") {
                        editData();
                     } else {
                        postData();
                     }
                  }}
                  disabled={validation()}
               >
                  <Text style={{color: '#fff', fontWeight: '600'}}>
                     Send
                  </Text>
               </TouchableOpacity>
               {
                  route.params.id !== '' && (
                     <TouchableOpacity
                        activeOpacity={0.8}
                        style={[styles.btnSend, {
                           backgroundColor: '#b71c1c'
                        }]}
                        onPress={() => deleteData()}
                     >
                        <Text style={{color: '#fff', fontWeight: '600'}}>
                           Delete Data
                        </Text>
                     </TouchableOpacity>
                  )
               }
            </KeyboardAvoidingView>
         </ScrollView>
      </View>
   )
}

const styles = StyleSheet.create({
   btnSend: {
      padding: 10,
      marginTop: 20,
      borderRadius: 6,
      width: 100,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center'
   },
   btnAddImg: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 6,
      padding: 10,
      marginTop: 10,
      backgroundColor: '#2979ff'
   },
   box: {
      borderColor: '#a5a5a5',
      borderWidth: 0.7,
      borderRadius: 6,
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
      height: 200
   },
   txtInput: {
      width: '100%',
      borderRadius: 6,
      padding: 10,
      borderColor: '#a5a5a5',
      borderWidth: 0.7
   }
})

export default AddContact;