// import { Profile } from './../src/models/profile'

// const response = {
//   data: {
//     viewer: {
//       avatarUrl: 'https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4',
//       name: 'Ang',
//       login: 'Rexiao',
//       bio: '',
//       bioHTML: '',
//       websiteUrl: null,
//       email: '',
//       repositories: {
//         totalCount: 4
//       },
//       followers: {
//         totalCount: 1
//       },
//       following: {
//         totalCount: 1
//       },
//       createdAt: '2018-09-04T01:08:13Z'
//     }
//   }
// }
// const compareResult = [
//   {
//     avatarUrl: 'https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4'
//   },
//   { name: 'Ang' },
//   { login: 'Rexiao' },
//   { bio: '' },
//   { websiteUrl: null },
//   { email: '' },
//   { public_repo_count: 4 },
//   { followers_count: 1 },
//   { followings_count: 1 },
//   { createdAt: '2018-09-04T01:08:13Z' }
// ]

// const profile = new Profile()
// // const nullProfile = new Profile(null)

// test('test Profile class under fake response', async () => {
//   await expect(profile.avatarUrl).toBe('https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4')
// })

// // test('test Profile class toJSONArray function under fake response', () => {
// //   expect(profile.toJSONArray()).toEqual(compareResult)
// // })

// // test('test invalid Profile under invalid response', () => {
// //   expect(nullProfile.name).toEqual('')
// // })

import { Profile } from './../src/models/profile'

const response = {
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
}
const compareResult = [
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
]

const profile = new Profile(response)
const nullProfile = new Profile(null)

test('test Profile class under fake response', () => {
  expect(profile.avatarUrl).toBe('https://avatars3.githubusercontent.com/u/42951357?u=a648f7ff3392b1139e1208bc1b6774d249b25f7b&v=4')
})

test('test Profile class toJSONArray function under fake response', () => {
  expect(profile.toJSONArray()).toEqual(compareResult)
})

test('test invalid Profile under invalid response', () => {
  expect(nullProfile.name).toEqual('')
})
