export const initialStates = {
  room: {
    name: '',
  },
  messageFilters: {
    text: '',
    date: '',
  },
  messages: [],
  user: {},
  newMessage: '',
  updatingMessage: {},
  selectedMessage: null,
  replyMessage: {},
  searchMessageActive: false,
  pending: false,
  confirm: {
    title: 'Delete a message',
    message: 'Are you sure?',
    confirmed: true
  }
};

