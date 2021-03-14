import React, {useState} from 'react';
import {View, StyleSheet, Image, Button, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

async function askForPermission() {
  const {status} = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  )
  if (status !== 'granted') {
    Alert.alert('Ошибка', 'Вы не предоставили прав для создания фото...')
    return false
  }
  return true
}

export const PhotoPicker = ({onPick}) => {
  const [image, setImage] = useState(null)

  const takePhoto =async () => {
    const hasPermissions = await askForPermission()

    if (!hasPermissions) {
      return
    }

    const img = await ImagePicker.launchCameraAsync({
      quality: 0.7,  // от 0-1 качество фото
      allowsEditing: true,  // возможность редактировать фото встроенным редактором
      aspect: [16, 9]   // в массив передаются соотношения сторон для фото, которое сделали
    })

    setImage(img.uri)
    onPick(img.uri)
  }

  return (
    <View style={styles.wrapper}>
      <Button title='Сделать фото' onPress={takePhoto}/>
      {image && <Image style={styles.image} source={{uri: image}} />}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  }
})
