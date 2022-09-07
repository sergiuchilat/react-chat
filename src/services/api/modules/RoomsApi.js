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
}