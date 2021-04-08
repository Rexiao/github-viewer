import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { HomeScreenWrapper } from './src/view/main_view'
import { RepoScreenWrapper } from './src/view/repo_view'
import { FollowerScreen } from './src/view/follower_view'
import { FollowingScreen } from './src/view/following_view'

// used for side bar
const Drawer = createDrawerNavigator()

/**
 * main function
 */
export default function App () {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={HomeScreenWrapper}
          options={{ title: 'Profile' }}
        />
        <Drawer.Screen
          name="Repo"
          component={RepoScreenWrapper}
          options={{ title: 'Repo' }}
        />
        <Drawer.Screen
          name="following"
          component={FollowingScreen}
          options={{ title: 'following' }}
        />
        <Drawer.Screen
          name="follower"
          component={FollowerScreen}
          options={{ title: 'follower' }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
