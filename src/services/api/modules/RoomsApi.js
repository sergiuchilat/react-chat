import ApiModel from 'services/api/ApiModel';
import rooms from 'data/mock/rooms';
export default class RoomsApi extends ApiModel{
  constructor () {
    super();
    this.resourceUrl = 'rooms';
  }

  async get(searchString = '') {
    return await new Promise((resolve) => {
      const response = rooms.filter(
        room => searchString === '' ||
                        (room.name.toLowerCase().search(searchString.toLowerCase()) !== -1)
      );
      resolve(response);
    });
  }

  async getById(id) {
    return await new Promise((resolve) => {
      resolve(rooms.find(room => room.id === id));
    });
  }

  async getRoomsList() {
    return await this.http.get(`${this.resourceUrl}/`);
  }
  async getRoom(roomUuid) {
    return await this.http.get(`${this.resourceUrl}/${roomUuid}/`);
  }
  async createRoom(payload) {
    return await this.http.post(`${this.resourceUrl}/`, payload);
  }
  async addMember(roomId, payload) {
    return await this.http.post(`${this.resourceUrl}/${roomId}/members/`, payload);
  }
  async getMessages(roomUuid) {
    return await this.http.get(`${this.resourceUrl}/${roomUuid}/messages/`);
  }
  async getMembers(roomUuid) {
    return await this.http.get(`${this.resourceUrl}/${roomUuid}/members/`);
  }
  async delRoom(roomUuid, payload) {
    return await this.http.delete(`${this.resourceUrl}/${roomUuid}/`, payload);
  }
}
