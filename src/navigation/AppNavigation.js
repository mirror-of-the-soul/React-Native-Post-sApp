import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Platform} from 'react-native';
import {Ionicons} from '@expo/vector-icons'
import {MainScreen} from '../screens/MainScreen';
import {PostScreen} from '../screens/PostScreen';
import {BookedScreen} from '../screens/BookedScreen';
import {AboutScreen} from '../screens/AboutScreen';
import {CreateScreen} from '../screens/CreateScreen';
import {THEME} from '../theme';

const navigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
  }
}

const PostNavigator = createStackNavigator({
    Main: MainScreen,
    Post: PostScreen
  },
  navigatorOptions
)

const BookedNavigator = createStackNavigator({
    Booked: BookedScreen,
    Post: PostScreen
  },
  navigatorOptions
)

const bottomTabsConfig = {
  Post: {
    screen: PostNavigator,
    navigationOptions: {
      tabBarLabel: 'Все',
      tabBarIcon: info => (
        <Ionicons name='ios-albums' size={25} color={info.tintColor}/>
      )
    }
  },
  Booked: {
    screen: BookedNavigator,
    navigationOptions: {
      tabBarLabel: 'Избранное',
      tabBarIcon: info => (
        <Ionicons name='ios-star' size={25} color={info.tintColor}/>
      )
    }
  }
}


const BottomNavigator = Platform.OS === 'android'
  ? createMaterialBottomTabNavigator(bottomTabsConfig, {
    activeTintColor: '#fff',
    shifting: true,
    barStyle: {
      backgroundColor: THEME.MAIN_COLOR
    }
  })
  : createBottomTabNavigator(
    bottomTabsConfig,
    {
      tabBarOptions: {
        activeTintColor: THEME.MAIN_COLOR
      }
    })

const AboutNavigator = createStackNavigator({
  About: AboutScreen
}, navigatorOptions)

const CreateNavigator = createStackNavigator({
  Create: CreateScreen
}, navigatorOptions)


const MainNavigator = createDrawerNavigator({
  PostTabs: {
    screen: BottomNavigator,
    navigationOptions: {
      drawerLabel: 'Главная',
      // drawerIcon: <Ionicons name="ios-star"/>  // добавление иконок
    }
  },
  About: {
    screen: AboutNavigator,
    navigationOptions: {
      drawerLabel: 'О приложении'
    }
  },
  Create: {
    screen: CreateNavigator,
    navigationOptions: {
      drawerLabel: 'Создать новый пост'
    }
  }
}, {
  contentOptions: {
    activeTintColor: THEME.MAIN_COLOR,
    labelStyle: {
      fontFamily: 'open-bold',
      fontSize: 18
    }
  }
})

export const AppNavigation = createAppContainer(MainNavigator)
