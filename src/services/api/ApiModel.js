import axios from 'axios';

export default class ApiModel{
  constructor () {
    this.resourceUrl = null;
    this.http = axios;
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user'));
    }catch (e) {
      user = null;
    }

    this.http.interceptors.request.use(
      config => {
        const queryConfig = config;
        queryConfig.headers.common['X-localization'] = 'ru';
        if(user && user.token){
          queryConfig.headers.Authorization = `Bearer ${user.token}`;
        }

        const isAbsoluteURLRegex = /^(?:\w+:)\/\//;

        if ( !isAbsoluteURLRegex.test(config.url) ) {
          queryConfig.url = `${process.env.REACT_APP_API_URL}${queryConfig.url}`;
        }

        return queryConfig;
      }
    );

    this.http.interceptors.response.use();
  }

  async get(){
    return await this.http.get(this.resourceUrl);
  }

  async getById(id){
    return await this.http.get(`${this.resourceUrl}/${id}`);
  }

  async create(payload){
    return await this.http.post(this.resourceUrl, payload);
  }

  async update(id, payload){
    return await this.http.patch(`${this.resourceUrl}/${id}`, payload);
  }

  async delete(id){
    return await this.http.delete(`${this.resourceUrl}/${id}`);
  }
}