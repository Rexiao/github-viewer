import 'react-native-gesture-handler'
import React from 'react'
import { Button, Text, View } from 'react-native'

/**
 * follower screen
 * @param {Object} navigation react native navigation
 */
function FollowerScreen ({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>empty</Text>
      <Button onPress={() => navigation.goBack()} title="Go back profile" />
    </View>
  )
}

export { FollowerScreen }
