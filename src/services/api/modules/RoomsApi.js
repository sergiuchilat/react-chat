import ApiModel from 'services/api/ApiModel';
import rooms from 'data/mock/rooms'
export default class RoomsApi extends ApiModel{
    constructor () {
        super();
        this.resourceUrl = 'rooms';
    }

    async get() {
        return await new Promise((resolve) => {
            resolve(rooms);
        });
    }

    async getById(id) {
        return await new Promise((resolve) => {
            resolve(rooms.find(room => room.id === id));
        });
    }
}