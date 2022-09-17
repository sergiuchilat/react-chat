import ApiModel from 'services/api/ApiModel';
import messages from '../../../data/mock/messages';
export default class MessagesApi extends ApiModel{
  constructor () {
    super();
    this.resourceUrl = 'messages';
  }

  // async getRoomMessages(roomId, searchString = '') {
  //   const roomMessages = await new Promise((resolve) => {
  //     resolve(messages.filter(message => message.room_id === roomId));
  //   });
  //   return await new Promise((resolve) => {
  //     const response = roomMessages.filter(
  //       message => searchString === '' ||
  //         (message.text.toLowerCase().search(searchString.toLowerCase()) !== -1)
  //     );
  //     resolve(response);
  //   });
  // }
  async createMessage(payload) {
    return await this.http.post(`${this.resourceUrl}/` ,payload);
  }

  async getById(id) {
    return await new Promise((resolve) => {
      resolve(messages.find(message => message.id === id));
    });
  }
  async deleteMessage(messageUuid) {
    return await this.http.delete(`${this.resourceUrl}/${messageUuid}/`);
  }
  async updateMessage(messageUuid, payload) {
    return await this.http.patch(`${this.resourceUrl}/${messageUuid}/`, payload);
  }
}
