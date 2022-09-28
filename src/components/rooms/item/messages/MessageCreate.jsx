import MessageActions from './MessageActions';
import cancel from '../../../../assets/img/icons/cancel.svg';
import { forwardRef, useState } from 'react';
import MessagesApi from '../../../../services/api/modules/MessagesApi';
import { showSnackbar } from '../../../../store/SnackBarSlice';
import { useDispatch } from 'react-redux';
import { initialStates } from '../InitialStatesRoomItem';
import { SetEmoji } from '../../../../utils/SetEmoji';
import { useRef } from 'react';

export const MessageCreate = forwardRef(
  ({ resetMessages, updatingMessage,
    handleDeleteMessage, replyMessage, handleRemoveParentMessage, roomUuid, user }) => {

    const [newMessage, setNewMessage] = useState(initialStates.newMessage);
    const createInput = useRef(null);
    const dispatch = useDispatch();

    const handleChangeMessage = (message) => {
      setNewMessage(message);
    };
    const selectEmoji = (emoji) => {
      SetEmoji(emoji, createInput, newMessage, setNewMessage);
    };
    const validMessageInput = (text) =>  text.length;
    const handleSubmitMessage = async (attachments) => {
      try {
        if (validMessageInput(newMessage)) {
          const finalMessage = {
            text: newMessage,
            room_uuid: roomUuid,
            sender_uuid: user.uuid,
            parent_uuid: replyMessage?.uuid,
            attachments: attachments || [],
          };
          if(!finalMessage.parent_uuid) {
            delete finalMessage.parent_uuid;
          }
          const response = await new MessagesApi().createMessage({ ...finalMessage });
          if (response) {
            resetMessages();
          }
        }
        setNewMessage('');
      } catch (e) {
        dispatch(showSnackbar({ message: e.message }));
      }
    };
    return (
      <div className={'message-create'}>
        {Object.keys(replyMessage).length > 0 && <div className={'reply-message'}>
          <p>{replyMessage.text}</p>
          <button onClick={() => handleRemoveParentMessage()}>
            <img
              height={16}
              width={16}
              src={cancel}
              alt={'cancel'}
            />
          </button>
        </div>}
        <div className={'message-create-inner'}>
          <input
            ref={createInput}
            placeholder={'Type your message...'}
            value={newMessage}
            onChange={(e) => handleChangeMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitMessage()}
            className={'rooms-search-input rooms-message-input'}
            type={'text'}
          />
          <MessageActions
            selectEmoji={selectEmoji}
            updatingMessage={updatingMessage}
            handleDeleteMessage={handleDeleteMessage}
            handleSubmitMessage={handleSubmitMessage}
            message={newMessage}
          />
        </div>
      </div>
    );
  }
);

MessageCreate.displayName = 'messageCreate';
