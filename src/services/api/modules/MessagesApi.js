import ApiModel from 'services/api/ApiModel';
import messages from 'data/mock/messages'
export default class MessagesApi extends ApiModel{
    constructor () {
        super();
        this.resourceUrl = 'messages';
    }

    async getRoomMessages(roomId) {
        return await new Promise((resolve) => {
            resolve(messages.filter(message => message.room_id === roomId));
        });
    }

    async getById(id) {
        return await new Promise((resolve) => {
            resolve(messages.find(message => message.id === id));
        });
    }
}