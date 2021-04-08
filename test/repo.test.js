import { Repo } from './../src/models/repo'

const response = {
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
}

const repo = new Repo(response)
const invalid_repo = new Repo(null)
test('test Repo class under fake response', () => {
  expect(repo.repo_list.length).toEqual(4)
})

test('test Repo class toJSONArray function under fake response', () => {
  // console.log(repo.repo_list)
  expect(repo.toJSONArray()).toEqual(repo.repo_list)
})

test('test invalid Repo class because response is invalid', () => {
  expect(invalid_repo.repo_list.length).toEqual(0)
})
