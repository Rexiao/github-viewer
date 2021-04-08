import 'react-native'
import React from 'react'
import { RepoScreen } from './../src/view/repo_view'
// test renderer must be required after react-native.
import { render, cleanup, waitFor } from '@testing-library/react-native'

beforeEach(() => {
  fetch.resetMocks()
})
afterEach(cleanup)

test('renders repo view fetch success', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      viewer: {
        repositories: {
          totalCount: 4,
          nodes: [
            {
              description: null,
              name: 'learn',
              owner: {
                login: 'Rexiao'
              }
            },
            {
              description: null,
              name: 'fa18-hw-ref',
              owner: {
                login: 'Rexiao'
              }
            },
            {
              description: null,
              name: 'flappy_hotdog',
              owner: {
                login: 'Rexiao'
              }
            },
            {
              description: 'The mvc tutorial',
              name: 'mvc-droids',
              owner: {
                login: 'Rexiao'
              }
            }
          ]
        }
      }
    }
  }))
  const { toJSON } = render(<RepoScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders repo view fetch fail becuase promise is rejected', async () => {
  fetch.mockReject(() => Promise.reject('API is down'))
  const { toJSON } = render(<RepoScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders repo view fetch fail because data is not in correct format', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    viewer: {
      repositories: {
        totalCount: 4,
        nodes: [
          {
            description: null,
            name: 'learn',
            owner: {
              login: 'Rexiao'
            }
          },
          {
            description: null,
            name: 'fa18-hw-ref',
            owner: {
              login: 'Rexiao'
            }
          },
          {
            description: null,
            name: 'flappy_hotdog',
            owner: {
              login: 'Rexiao'
            }
          },
          {
            description: 'The mvc tutorial',
            name: 'mvc-droids',
            owner: {
              login: 'Rexiao'
            }
          }
        ]
      }
    }
  }))
  const { toJSON } = render(<RepoScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders repo view fetch fail because data is not in correct format(repositiries)', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      viewer: {
        totalCount: 4,
        nodes: [
          {
            description: null,
            name: 'learn',
            owner: {
              login: 'Rexiao'
            }
          },
          {
            description: null,
            name: 'fa18-hw-ref',
            owner: {
              login: 'Rexiao'
            }
          },
          {
            description: null,
            name: 'flappy_hotdog',
            owner: {
              login: 'Rexiao'
            }
          },
          {
            description: 'The mvc tutorial',
            name: 'mvc-droids',
            owner: {
              login: 'Rexiao'
            }
          }
        ]
      }
    }
  }))
  const { toJSON } = render(<RepoScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})

test('renders mian view fetch success but all data is empty', async () => {
  fetch.mockResponseOnce(JSON.stringify({
    data: {
      viewer: {
        repositories: {
          totalCount: 4,
          nodes: []
        }
      }
    }
  }))
  const { toJSON } = render(<RepoScreen needFetch={true}/>)
  await waitFor(() => {
    expect(toJSON()).toMatchSnapshot()
  })
})
