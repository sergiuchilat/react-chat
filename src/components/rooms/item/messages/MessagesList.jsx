import MessageItemWrapper from './messageItem/MessageItem';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import arrowDown from '../../../../assets/img/icons/arrow-down.svg';
import { scrollToBottom } from '../../../../functions/ScrollToBottom';
import RoomsApi from '../../../../services/api/modules/RoomsApi';
import { showSnackbar } from '../../../../store/modules/SnackBarSlice';
import { useDispatch, useSelector } from 'react-redux';
import useDebounce from '../../../../hooks/useDebounce';
import { scrollToElement } from '../../../../functions/ScrollToElement';

export const MessagesList = forwardRef(
  ({ userUuid, messages, handleDeleteMessage, handleUpdateMessage,
    searchMessageActive, handleReplyMessage, messageFilter, roomTitle }, ref) => {
    const scrollButton = useRef(null);
    const dispatch = useDispatch();
    const activeRoom = useSelector(state => state.rooms.selectedRoom);
    const externalUserUuid = useSelector(state => state.user.userExternalUuid);
    const [unreadMessages, setUnreadMessages] = useState(0);

    const readMessages = async (roomUuid, userUuid, externalUuid, messagesUuid) => {
      try {
        await new RoomsApi().memberReadMessages(roomUuid, userUuid, {
          external_user_uuid: externalUuid,
          messages: messagesUuid
        });
      } catch (e) {
        dispatch(showSnackbar(e));
      }
    };

    const isInViewport = async (el) => {
      const allUnreadMessages = document.querySelectorAll('.foreign-message.unread');
      const rect = el.getBoundingClientRect().bottom;
      const roomTitleRect = roomTitle.current.getBoundingClientRect().bottom;
      const indexElement = [...allUnreadMessages].indexOf(el);
      if((rect - roomTitleRect) <= ref.current.clientHeight) {
        if(!el.nextElementSibling) {
          const unreadMessagesUuid = [...allUnreadMessages].map(message => {
            message.classList.remove('unread');
            return message.getAttribute('data-id');
          });
          await readMessages(activeRoom, userUuid, externalUserUuid, unreadMessagesUuid);
          setUnreadMessages(unread => unread - (indexElement + 1));
          return;
        }
        const nextUnreadMessage = el.nextElementSibling;
        if(nextUnreadMessage) {
          await isInViewport(nextUnreadMessage);
        }
      } else if (indexElement > 0) {
        let unreadMessagesUuid = [];
        for(let index = 0; index < indexElement; index++){
          unreadMessagesUuid.push(allUnreadMessages[index].getAttribute('data-id'));
          allUnreadMessages[index].classList.remove('unread');
        }
        setUnreadMessages(unread => unread - (indexElement));
        await readMessages(activeRoom, userUuid, externalUserUuid, unreadMessagesUuid);
      }
    };
    const getFirstUnreadMessage = useCallback(() => {
      const firstUnreadMessage = document.querySelector('.foreign-message.unread');
      const newMessageLine = document.querySelector('.newMessage');
      if(firstUnreadMessage && !newMessageLine) {
        const newMessages = document.createElement('h3');
        newMessages.innerHTML = 'New Messages';
        newMessages.classList.add('newMessage');
        firstUnreadMessage.before(newMessages);
      }
      if(newMessageLine){
        scrollToElement(newMessageLine);
      }
    }, [activeRoom]);
    const toggleScrollButton = async () => {
      const firstUnreadMessage = ref?.current?.querySelector('.foreign-message.unread');
      if(firstUnreadMessage && ref.current.scrollHeight) {
        await isInViewport(firstUnreadMessage);
      }
      if(ref?.current && scrollButton.current){
        if((firstUnreadMessage || (ref.current.scrollTop < ref.current.scrollHeight - 1000))
            && ref.current.scrollHeight > 452) {
          scrollButton.current.style.display = 'flex';
        } else {
          scrollButton.current.style.display = 'none';
        }
      }
    };
    const handleScroll = () => {
      scrollButton.current.style.display = 'none';
      scrollToBottom(ref);
    };
    const debouncedScroll = useDebounce(toggleScrollButton, 500);
    useEffect(() => {
      getFirstUnreadMessage();
      const unread = messages.filter(message => (message.sender_uuid !== userUuid) && !message.is_read);
      setUnreadMessages(unread.length);
      if(!unread.length){
        scrollToBottom(ref);
      }
      toggleScrollButton();
      ref.current.addEventListener('scroll', debouncedScroll);
    }, []);
    useEffect(() => {
      const newMessageLine = document.querySelector('.newMessage');
      if(newMessageLine && searchMessageActive) {
        newMessageLine.remove();
      }
    }, [messageFilter]);
    return (
      <div
        ref={ref}
        className={`messages_wrapper ${searchMessageActive ? 'messages_search-active' : ''}`}
      >
        <div className={'messages'}>
          {messages.length !== 0 &&
            messages.map((message) => (
              <MessageItemWrapper
                userUuid={userUuid}
                message={message}
                handleDeleteMessage={handleDeleteMessage}
                handleUpdateMessage={handleUpdateMessage}
                searchMessageActive={searchMessageActive}
                messages={messages}
                handleReplyMessage={handleReplyMessage}
                messageFilter={messageFilter.text}
                key={message.uuid}
              />
            ))}
          {messages.length === 0 && (
            <h3 className={'room-text'}>No messages</h3>
          )}
        </div>
        {(messages.length > 0 && !searchMessageActive) && <button
          ref={scrollButton}
          className={'scroll-button'}
          onClick={() => handleScroll()}
        >
          {unreadMessages > 0 && <span>{unreadMessages}</span>}
          <img
            src={arrowDown}
            alt={'arrow'}
          />
        </button>}
      </div>
    );
  }
);
MessagesList.displayName = 'messages';
