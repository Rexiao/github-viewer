export class Profile {
  /**
   * convert the content of response to an object which will be used in main view
   * @param {Object} response result getten from github graphql
   */
  constructor (response) {
    if (response && response.data && response.data.viewer && response.data.viewer.repositories &&
      response.data.viewer.followers && response.data.viewer.following) {
      const VIEWER = response.data.viewer
      this.avatarUrl = VIEWER.avatarUrl
      this.name = VIEWER.name
      this.login = VIEWER.login
      this.bio = VIEWER.bio
      this.websiteUrl = VIEWER.websiteUrl
      this.email = VIEWER.email
      this.public_repo_count = VIEWER.repositories.totalCount
      this.followers_count = VIEWER.followers.totalCount
      this.followings_count = VIEWER.following.totalCount
      this.createdAt = VIEWER.createdAt
    } else {
      this.avatarUrl = ''
      this.name = ''
      this.login = ''
      this.bio = ''
      this.websiteUrl = ''
      this.email = ''
      this.public_repo_count = ''
      this.followers_count = ''
      this.followings_count = ''
      this.createdAt = ''
    }
  }

  /**
   * convert the object to an array
   * @returns {Object} a list of object
   */
  toJSONArray () {
    var list = []
    for (var x in this) {
      if (x === 'toJSON' || x === 'constructor') {
        continue
      }
      list.push({ [x]: this[x] })
    }
    return list
  }

  /**
   * fetch function used in main view
   * @param {String} token personal github token
   * @param {String} queryText graphql script
   * @param {Object} variables varaibels for query
   * @param {Function} setData setter for data
   * @param {Function} setLoading setter for loading
   */
  static fetchWrapper (token, queryText, variables, setData, setLoading) {
    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      },
      body: JSON.stringify({ query: queryText, variables })
    }).then(response => {
      // console.log(response.json())
      let t = response.json()
      // console.log(t)
      return t
    }).then((json) => {
    //   console.log(json)
      let d = null
      if (json.data) {
        d = new Profile(json).toJSONArray()
      }
      setData(d)
    }).catch((error) => {
      console.error(error)
      console.error('=====================================')
    }).finally(() => {
      setLoading(false)
    })
  }
}

const queryText = `query ProfileQuery {
  viewer {
    avatarUrl
    name
    login
    bio
    bioHTML
    websiteUrl
    email
    repositories(privacy: PUBLIC) {
      totalCount
    }
    followers {
      totalCount
    }
    following {
      totalCount
    }
    createdAt
  }
}`

export { queryText }