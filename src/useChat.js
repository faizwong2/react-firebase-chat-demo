import { useState, useEffect } from 'react';
import { db } from './firebase.js';

const useChat = (dbName) => {
  const CHAT_LIMIT = 10;
  const MORE_MESSAGE_QUANTITY = 5;

  const [messages, setMessages] = useState([]);
  const [messagesLoading, setMessagesLoading] = useState(true);
  const [messagesError, setMessagesError] = useState(false);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchError, setFetchError] = useState(false);

  const [startKey, setStartKey] = useState(null);
  const [scrollTrigger, setScrollTrigger] = useState(null);

  useEffect(() => {
    let scrollTriggerLocal = false;
    const responseCallback = (response) => {
      setMessagesError(false);
      let responseArray = [];
      if (response.val()) {
        responseArray = Object.entries(response.val()).map(e => Object.assign(e[1], { key: e[0] }));
      }
      if (responseArray.length > 0) {
        setStartKey(responseArray[0].key);
        setMessages(responseArray);
        setMessagesLoading(false);
        setScrollTrigger(scrollTriggerLocal);
        scrollTriggerLocal = !scrollTriggerLocal;
      }
    }

    const errorCallback = (error) => {
      setMessagesError(true);
      setMessagesLoading(false);
    }

    db.ref(dbName).limitToLast(CHAT_LIMIT).on('value', responseCallback, errorCallback);

    return () => {
      db.ref(dbName).off();
    }
  // eslint-disable-next-line
  }, []);

  const handleSubmitMessage = async (text) => {
    try {
      setSubmitError(false);
      setSubmitLoading(true);
      await db.ref(dbName).push({
        text: text,
        timestamp: Date.now()
      });
      setSubmitLoading(false);
    } catch (error) {
      console.error(error);
      setSubmitError(true);
      setSubmitLoading(false);
    }
  };

  const handleFetchOlderMessages = async () => {
    try {
      setFetchError(false);
      setFetchLoading(true);
      const response = await db.ref(dbName).orderByKey().endAt(startKey).limitToLast(MORE_MESSAGE_QUANTITY + 1).once('value');
      let responseArray = [];
      if (response.val()) {
        responseArray = Object.entries(response.val()).map(e => Object.assign(e[1], { key: e[0] }));
      }
      responseArray.splice(-1, 1);

      if (responseArray.length > 0) {
        setStartKey(responseArray[0].key);
        setMessages([
          ...responseArray,
          ...messages
        ]);
      }
      setFetchLoading(false);
    } catch (error) {
      setFetchError(true);
      setFetchLoading(false);
    }
  };

  return {
    messages,
    messagesLoading,
    messagesError,
    handleSubmitMessage,
    submitLoading,
    submitError,
    handleFetchOlderMessages,
    fetchLoading,
    fetchError,
    scrollTrigger
  };
};

export default useChat;
