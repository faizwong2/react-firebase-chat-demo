import React, { useState, useCallback } from 'react';

import useChat from './useChat.js';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const {
    messages,
    messagesLoading,
    messagesError,
    handleSubmitMessage,
    submitLoading,
    handleFetchOlderMessages,
    fetchLoading,
    scrollTrigger
  } = useChat('testChat');

  return (
    <div className="App">
      <header>
        <h1>React Firebase Chat</h1>
      </header>
      <ChatRoom
        messages={messages}
        messagesLoading={messagesLoading}
        messagesError={messagesError}
        handleSubmitMessage={handleSubmitMessage}
        submitLoading={submitLoading}
        handleFetchOlderMessages={handleFetchOlderMessages}
        fetchLoading={fetchLoading}
        scrollTrigger={scrollTrigger}
      />
    </div>
  );
};

const ChatRoom = (props) => {
  const {
    messages,
    messagesLoading,
    messagesError,
    handleSubmitMessage,
    submitLoading,
    handleFetchOlderMessages,
    fetchLoading,
    scrollTrigger
  } = props;

  const [formInput, setFormInput] = useState('');
  const chatContainerRef = useCallback((node) => {
    if (node) {
      node.scrollTop = 9999999;
    }
  // eslint-disable-next-line
  }, [scrollTrigger]);

  const handleScroll = (e) => {
    if (e.target.scrollTop === 0) {
      handleFetchOlderMessages();
    }
  };

  const handleChangeFormInput = (e) => {
    setFormInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmitMessage(formInput);
    setFormInput('');
  };

  return (
    <div>
      <main ref={chatContainerRef} onScroll={handleScroll}>

        {/* <button */}
        {/*   type='button' */}
        {/*   onClick={handleFetchOlderMessages} */}
        {/*   disabled={fetchLoading} */}
        {/* > */}
        {/*   { */}
        {/*     fetchLoading ? */}
        {/*     'Loading' : */}
        {/*     'More' */}
        {/*   } */}
        {/* </button> */}

        <p>
          {
            fetchLoading ?
            'Loading' :
            ''
          }
        </p>

        {
          messagesLoading && !messagesError &&
          <p>Loading...</p>
        }

        {
          messagesError && !messagesLoading &&
          <p>Error</p>
        }

        {
          !messagesLoading && !messagesError &&
          messages.map((message, index) => (
            <ChatMessage key={index} message={message}/>
          ))
        }

      </main>
      <form onSubmit={handleFormSubmit}>
        <input
          value={formInput}
          onChange={handleChangeFormInput}
          type='text'
          placeholder='say something nice'
        />
        <button type="submit" disabled={submitLoading || !formInput}>
          {
            submitLoading ?
            '⌛️' :
            '✈️'
          }
        </button>
      </form>
    </div>
  );
};

const ChatMessage = (props) => {
  const { text } = props.message;

  return (
    <div className={`message received`}>
      <img alt='user-profile' src={logo} />
      <p>{text}</p>
    </div>
  );
};

export default App;
