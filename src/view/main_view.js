import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, FlatList, Button, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import token from './../models/token'
import { Profile, queryText } from './../models/profile'

/**
 * function for home screen
 * @param {Object} props props.nav react navigation
 *                       props.needFetch if the view need actually fetch data from github
 *                       props.needLoadScreen if the view only show activity indicator
 *                       props.fakeData the fake data used in view if needFetch is false
 */
function HomeScreen (props) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const variables = {}

  /**
   * item function used in renderItem
   * @param {Object} props l:key
   *                       r:value
   *                       nav: react navigation
   */
  const Item = function itemFunction (props) {
    let content
    if (props.l === 'avatarUrl') {
      content = <Image source={{ uri: props.r }} style={{ width: 400, height: 400 }}/>
    } else if (props.l === 'public_repo_count') {
      content = <Button
        title= {'public repo number: ' + props.r}
        onPress={() => props.nav.navigate('Repo')}
      />
    } else if (props.l === 'followers_count') {
      content = <Button
        title= {'followers number: ' + props.r}
        onPress={() => props.nav.navigate('follower')}
      />
    } else if (props.l === 'followings_count') {
      content = <Button
        title= {'followings number: ' + props.r}
        onPress={() => props.nav.navigate('following')}
      />
    } else {
      content = <Text style={styles.title}>{props.l} : {props.r}</Text>
    }
    return (
      <View style={styles.item}>
        {content}
      </View>
    )
  }
  /**
   * wrapper used in flat list
   * @param {Object} props l:key
   *                       r:value
   *                       nav: react navigation
   */
  const renderItem = ({ item }) => (
    <Item l={Object.keys(item)[0]} r={item[Object.keys(item)[0]]} nav={props.nav} />
  )
  useEffect(() => {
    if (props.needFetch) {
      Profile.fetchWrapper(token, queryText, variables, setData, setLoading)
    } else {
      // console.log('null becuase of fake!')
      if (props.needLoadScreen) {
        setLoading(true)
      } else if (!props.fakeData) {
        setLoading(false)
        setData(null)
      } else {
        setLoading(false)
        setData(props.fakeData)
      }
    }
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        !data ? (<Text>load data fails. If the reason is related to network, check console.error. Otherwise, it is becuase of invalid data format</Text>) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )
      )}
    </SafeAreaView>
  )
}

/**
 * wrapper for home screen
 * @param {Object} navigation react navigation
 */
function HomeScreenWrapper ({ navigation }) {
  return (
    <HomeScreen needLoadScreen={false} nav={navigation} needFetch={true } fakeData={[
      {
        avatarUrl: 'https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4'
      },
      { name: 'Ang' },
      { login: 'Rexiao' },
      { bio: '' },
      { websiteUrl: null },
      { email: '' },
      { public_repo_count: 4 },
      { followers_count: 1 },
      { followings_count: 1 },
      { createdAt: '2018-09-04T01:08:13Z' }
    ]}/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
})

export { HomeScreenWrapper, HomeScreen }
