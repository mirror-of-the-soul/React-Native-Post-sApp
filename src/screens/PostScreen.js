import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Button, ScrollView, Alert} from 'react-native';
import {DATA} from '../data';
import {THEME} from '../theme';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {AppHeaderIcon} from '../components/AppHeaderIcon';

export const PostScreen = ({navigation}) => {
  const postId = navigation.getParam('postId')

  const post = DATA.find(p => p.id === postId)

  // useEffect(() => {
  //   navigation.setParams({ booked: post.booked })
  // }, [])

  const removeHandler = () => {
    Alert.alert(
      'Удаление поста',
      'Вы точно хотите удалить пост',
      [
        {
          text: 'Отменить',
          style: 'cancel'
        },
        {
          text: 'Удалить', style: 'destructive', onPress: () => {
          }
        }
      ],
      {cancelable: false}
    )
  }

  return (
    <ScrollView>
      <Image source={{uri: post.img}} style={styles.image}/>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button
        title="Удалить" color={THEME.DANGER_COLOR}
        onPress={removeHandler}
      />
    </ScrollView>
  )
}
PostScreen.navigationOptions = ({navigation}) => {
  const date = navigation.getParam('date')
  const booked = navigation.getParam('booked')
  const iconName= booked ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: 'Пост от ' + new Date(date).toLocaleDateString(),
    headerRight: () =>  (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title="Take photo"
          iconName={iconName}
          onPress={() => console.log('press photo')}
        />
      </HeaderButtons>
    )
  }
  // стилизация для определенной страницы, если не подходят общие пример:
  // headerStyle: {
  //   backgroundColor: 'red'
  // },
  // headerTintColor: '#fff'
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})
