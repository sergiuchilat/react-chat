import ApiModel from 'services/api/ApiModel';
export default class MessagesApi extends ApiModel {
  constructor() {
    super();
    this.resourceUrl = 'messages';
  }

  async create(payload) {
    return await this.http.post(`${this.resourceUrl}/`, payload);
  }

  async getItem(uuid) {
    return await this.http.get(`${this.resourceUrl}/${uuid}/`);
  }
  async deleteItem(messageUuid) {
    return await this.http.delete(`${this.resourceUrl}/${messageUuid}/`);
  }

  async updateItem(messageUuid, payload) {
    return await this.http.patch(
      `${this.resourceUrl}/${messageUuid}/`,
      payload
    );
  }
}
