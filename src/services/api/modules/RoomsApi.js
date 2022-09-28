import ApiModel from 'services/api/ApiModel';
export default class RoomsApi extends ApiModel {
  constructor() {
    super();
    this.resourceUrl = 'rooms';
  }

  async getList(filter) {
    return await this.http.get(`${this.resourceUrl}/?search=${filter}`);
  }
  async getItem(roomUuid) {
    return await this.http.get(`${this.resourceUrl}/${roomUuid}/`);
  }
  async create(payload) {
    return await this.http.post(`${this.resourceUrl}/`, payload);
  }
  async addMember(roomId, payload) {
    return await this.http.post(
      `${this.resourceUrl}/${roomId}/members/`,
      payload
    );
  }
  async getMessages(roomUuid, filter) {
    return await this.http.get(`${this.resourceUrl}/${roomUuid}/messages/?search=${filter.text}&created_at=${filter.date}`);
  }
  async getMembers(roomUuid) {
    return await this.http.get(`${this.resourceUrl}/${roomUuid}/members/`);
  }
  async memberReadMessages(roomUuid, memberUuid, payload) {
    return await this.http.post(`${this.resourceUrl}/${roomUuid}/members/${memberUuid}/read_messages/`, payload);
  }
  async delete(roomUuid, payload) {
    return await this.http.delete(`${this.resourceUrl}/${roomUuid}/`, payload);
  }
}
