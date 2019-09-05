const { RESTDataSource } = require('apollo-datasource-rest');

class StarwarsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `${process.env.SWAPI_BASE_URL}/`;
    // console.log(this.baseURL);
  }

  public async getPeople(id) {
    return this.get(`people/${id}`);
  }
}

export default StarwarsAPI;
