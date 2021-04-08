export class Repo {
  /**
   * convert the content of response to an object which will be used in repo view
   * @param {Object} response result getten from github graphql
   */
  constructor (response) {
    this.repo_list = []
    if (response && response.data && response.data.viewer &&
      response.data.viewer.repositories &&
      response.data.viewer.repositories.nodes) {
      const NODES = response.data.viewer.repositories.nodes
      for (let i = 0; i < NODES.length; i++) {
        this.repo_list.push({
          repo_name: NODES[i].name,
          owner_name: NODES[i].owner.login,
          description: NODES[i].description
        })
      }
    }
  }

  /**
   * convert the object to an array
   * @returns {Object} a list of object
   */
  toJSONArray () {
    return this.repo_list
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
      return response.json()
    }).then((json) => {
      // console.log(json)
      let d = null
      if (json.data) {
        d = new Repo(json).toJSONArray()
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

const queryText = `query RepositoriesQuery($total_repo_count: Int) {
  viewer {
    repositories(privacy: PUBLIC, first: $total_repo_count) {
      totalCount
      nodes {
        description
        name
        owner {
          login
        }
      }
    }
  }
}`

export { queryText }
