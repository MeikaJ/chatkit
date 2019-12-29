import React from 'react';
// import './App.css';
import Chatkit from "@pusher/chatkit-client";
import MessageList from './components/MessageList'
import { instanceLocator, tokenUrl } from './config';



class App extends React.Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {

    //   const chatKitManager = new Chatkit.ChatManager({
    //     instanceLocator,
    //     userId: "meeks",
    //     tokenProvider: new Chatkit.chatManager({
    //       url: tokenUrl
    //     })
    //   })

    const tokenProvider = new Chatkit.TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/09f679ce-bb4d-4a68-a035-3cd337905ada/token"
    });

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: "v1:us1:09f679ce-bb4d-4a68-a035-3cd337905ada",
      userId: "meeks",
      tokenProvider: tokenProvider
    });

    chatManager
      .connect()
      .then(currentUser => {
        currentUser.subscribeToRoomMultipart({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onMessage: message => {
              this.setState({
                messages: [...this.state.messages, message]
              })
            }
          }
        });
      })
      .catch(error => {
        console.error("error:", error);
      });


    // chatKitManager.connect()
    //   .then(currentUser => {
    //     currentUser.AddToRoom({
    //       roomId: 'ae5d82d6 - f5ad - 421c- a3cf - 10c5d55e4af2',
    //       hook: {
    //         onNewMessage: message => {
    //           console.log('message.text', message.text);
    //         }
    //       }
    //     })
    //   })
  }

  render() {
    return (
      <div className="app">
        <MessageList messages={this.state.messages} />


      </div>
    )
  }
}


export default App;



  // state is private for the component

// props are changed through components