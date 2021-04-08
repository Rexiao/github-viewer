import 'react-native'
import React from 'react'
import { FollowerScreen } from './../src/view/follower_view'
import { FollowingScreen } from './../src/view/following_view'
// test renderer must be required after react-native.
import { render } from '@testing-library/react-native'

test('renders 3', () => {
  const tree = render(<FollowingScreen />).toJSON()

  expect(tree).toMatchSnapshot()
})

test('renders 4', () => {
  const tree = render(<FollowerScreen />).toJSON()

  expect(tree).toMatchSnapshot()
})
