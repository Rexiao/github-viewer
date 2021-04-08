import 'react-native-gesture-handler'
import React from 'react'
import { Button, Text, View } from 'react-native'

/**
 * following screen
 * @param {Object} navigation react native navigation
 */
function FollowingScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>empty</Text>
      <Button onPress={() => navigation.goBack()} title="Go back profile" />
    </View>
  )
}

export { FollowingScreen }
