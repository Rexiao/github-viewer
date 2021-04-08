import 'react-native'
import React from 'react'
import { HomeScreen } from './../src/view/main_view'
// test renderer must be required after react-native.
import { render, cleanup, waitFor } from '@testing-library/react-native'

beforeEach(() => {
  fetch.resetMocks()
})
afterEach(cleanup)

test('renders mian view fetch success', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      viewer: {
        avatarUrl: 'https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4',
        name: 'Ang',
        login: 'Rexiao',
        bio: '',
        bioHTML: '',
        websiteUrl: null,
        email: '',
        repositories: {
          totalCount: 4
        },
        followers: {
          totalCount: 1
        },
        following: {
          totalCount: 1
        },
        createdAt: '2018-09-04T01:08:13Z'
      }
    }
  }))
  const { toJSON } = render(<HomeScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders main view fetch fail becuase promise is rejected', async () => {
  fetch.mockReject(() => Promise.reject('API is down'))
  const { toJSON } = render(<HomeScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders mian view fetch fail because data is not in correct format', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    viewer: {
      avatarUrl: 'https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4',
      name: 'Ang',
      login: 'Rexiao',
      bio: '',
      bioHTML: '',
      websiteUrl: null,
      email: '',
      repositories: {
        totalCount: 4
      },
      followers: {
        totalCount: 1
      },
      following: {
        totalCount: 1
      },
      createdAt: '2018-09-04T01:08:13Z'
    }
  }))
  const { toJSON } = render(<HomeScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders mian view fetch fail because data is not in correct format(repositiries)', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      viewer: {
        avatarUrl: 'https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4',
        name: 'Ang',
        login: 'Rexiao',
        bio: '',
        bioHTML: '',
        websiteUrl: null,
        email: '',
        totalCount: 4,
        followers: {
          totalCount: 1
        },
        following: {
          totalCount: 1
        },
        createdAt: '2018-09-04T01:08:13Z'
      }
    }
  }))
  const { toJSON } = render(<HomeScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders mian view fetch success but all data is empty', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      viewer: {
        avatarUrl: null,
        name: null,
        login: null,
        bio: null,
        bioHTML: null,
        websiteUrl: null,
        email: null,
        repositories: {
          totalCount: null
        },
        followers: {
          totalCount: null
        },
        following: {
          totalCount: null
        },
        createdAt: null
      }
    }
  }))
  const { toJSON } = render(<HomeScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})
