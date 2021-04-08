import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { FlatList, Button, Text, View, ActivityIndicator } from 'react-native'
import token from './../models/token'
import { Repo, queryText } from './../models/repo'
import { styles } from './style'

/**
 * item function used in renderItem
 * @param {Object} props l:key
 *                       r:value
 *                       nav: react navigation
 */
const Item = function itemFunction (props) {
  return (
    <View style={styles.item}>
      <Text>repo_name: {props.data.repo_name}</Text>
      <Text>owner_name: {props.data.owner_name}</Text>
      <Text>description: {props.data.description}</Text>
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
  <Item data={item} />
)

/**
 * function for repo screen
 * @param {Object} props props.nav react navigation
 *                       props.needFetch if the view need actually fetch data from github
 *                       props.needLoadScreen if the view only show activity indicator
 *                       props.fakeData the fake data used in view if needFetch is false
 */
function RepoScreen (props) {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const variables = { total_repo_count: 15 }
  useEffect(() => {
    if (props.needFetch) {
      Repo.fetchWrapper(token, queryText, variables, setData, setLoading)
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? <ActivityIndicator/> : (
        !data ? (<Text>load data fails. If the reason is related to network, check console.error. Otherwise, it is becuase of invalid data format</Text>) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )
      )}
      <Button onPress={() => props.nav.goBack()} title="Go back profile" />
    </View>
  )
}

function RepoScreenWrapper ({ navigation }) {
  return (
    <RepoScreen needLoadScreen={false} nav={navigation} needFetch={true} fakeData={[
      { repo_name: 'learn', owner_name: 'Rexiao', description: null },
      { repo_name: 'fa18-hw-ref', owner_name: 'Rexiao', description: null },
      {
        repo_name: 'flappy_hotdog',
        owner_name: 'Rexiao',
        description: null
      },
      {
        repo_name: 'mvc-droids',
        owner_name: 'Rexiao',
        description: 'The mvc tutorial'
      }
    ]}/>
  )
}

export { RepoScreen, RepoScreenWrapper }
