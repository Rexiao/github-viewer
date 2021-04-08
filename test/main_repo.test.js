import 'react-native'
import React from 'react'
import { HomeScreen } from './../src/view/main_view'
import { RepoScreen } from './../src/view/repo_view'
// test renderer must be required after react-native.
import { render, cleanup, waitFor } from '@testing-library/react-native'

afterEach(cleanup)

test ('render main view success', async () => {
  // jest.spyOn(React, 'useEffect').mockImplementation(f => f())
  let { toJSON } = render(<HomeScreen needLoadScreen={false} needFetch={false} fakeData={[
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
  ]}/>)

  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test ('render main view invalid token', async () => {
  // jest.spyOn(React, 'useEffect').mockImplementation(f => f())
  let { toJSON } = render(<HomeScreen needLoadScreen={false} needFetch={false} fakeData={null}/>)

  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test ('render main view loading', async () => {
  // jest.spyOn(React, 'useEffect').mockImplementation(f => f())
  let { toJSON } = render(<HomeScreen needLoadScreen={true} needFetch={false} fakeData={null}/>)

  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test ('render repo view success', async () => {
  let { toJSON } = render(<RepoScreen needLoadScreen={false} needFetch={false} fakeData={[
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
  ]}/>)

  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test ('render repo view invalid token', async () => {
  let { toJSON } = render(<RepoScreen needLoadScreen={false} needFetch={false} fakeData={null}/>)

  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test ('render repo view loading', async () => {
  let { toJSON } = render(<RepoScreen needLoadScreen={true} needFetch={false} fakeData={null}/>)

  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})
