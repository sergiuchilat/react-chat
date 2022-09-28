import MessageActions from './MessageActions';
import { forwardRef, useEffect } from 'react';
import cancel from '../../../../assets/img/icons/cancel.svg';
import { useState } from 'react';
import MessagesApi from '../../../../services/api/modules/MessagesApi';
import { showSnackbar } from '../../../../store/SnackBarSlice';
import { useDispatch } from 'react-redux';
export const MessageEdit = forwardRef(
  ({ updatingMessage, updateMessage, handleChangeUpdatingMessage,
    handleCancelUpdateMessage, selectEmoji, messages, handleDeleteMessageAlert }, ref) => {

    const [parentMessage, setParentMessage] = useState({});

    const dispatch = useDispatch();
    const findParentMessage = () => {
      if(updatingMessage.parent_uuid) {
        setParentMessage(messages.find(item => item.uuid === updatingMessage.parent_uuid));
      }
    };
    const validMessageInput = (text) =>  text.length;
    const handleUpdateMessage = async (messageUuid, parentUuid) => {
      try {
        if (validMessageInput(updatingMessage.text)) {
          if(!updatingMessage.parent_uuid){
            delete updatingMessage.parent_uuid;
          }
          // if(!Object.keys(parentUuid).length){
          //   updatingMessage.parent_uuid = null;
          // }
          const response = await new MessagesApi().updateMessage(messageUuid, { ...updatingMessage });
          if (response.data) {
            updateMessage();
          }
        } else {
          await handleDeleteMessageAlert(messageUuid);
        }
      } catch (e) {
        dispatch(showSnackbar({ message: e.message }));
      }
    };
    const removeParentMessage = () => {
      setParentMessage({});
    };
    useEffect(() => {
      findParentMessage();
    }, []);
    return (
      <div className={'message-edit'}>
        {Object.keys(parentMessage).length > 0 && <div className={'reply-message'}>
          <p>{parentMessage.text}</p>
          <button onClick={() => removeParentMessage()}>
            <img
              height={16}
              width={16}
              src={cancel}
              alt={'cancel'}
            />
          </button>
        </div>}
        <div className={'message-edit-input'}>
          <button onClick={handleCancelUpdateMessage}>
            <img
              width={25}
              src={cancel}
              alt={'cancel'}
            />
          </button>
          <input
            ref={ref}
            placeholder={'Type your message...'}
            value={updatingMessage.text}
            onChange={(e) => handleChangeUpdatingMessage(e.target.value)}
            onKeyDown={(e) =>
              e.key === 'Enter' && handleUpdateMessage(updatingMessage.uuid, parentMessage)}
            className={'rooms-search-input rooms-message-input'}
            type={'text'}
          />
          <MessageActions
            handleUpdateMessage={handleUpdateMessage}
            selectEmoji={selectEmoji}
            updatingMessage={updatingMessage}
            handleDeleteMessage={handleDeleteMessageAlert}
            parentMessage={parentMessage}
          />
        </div>
      </div>
    );
  }
);

MessageEdit.displayName = 'messageEdit';
