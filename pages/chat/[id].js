import Head from 'next/head'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import ChatScreen from '../../components/ChatScreen'
import Sidbar from '../../components/Sidbar'
import { auth, db } from '../../firebase'
import getReciptionEmail from '../../utils/getReciptionEmail'
function Chat({ chat, messages }) {
  const [user] = useAuthState(auth)
  return (
    <Container>
      <Head>
        <title>Chat with {getReciptionEmail(chat.users, user)}</title>
      </Head>
      <Sidbar />
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  )
}

export default Chat

export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id)

  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get()
  // Prep the meesages on the server
  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }))

  // Prep the chats on the server
  const chatRes = await ref.get()
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  }

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  }
}

const Container = styled.div`
  display: flex;
`

const ChatContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow: scroll;
  background-color: pink;

  ::-webkit-scrollar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`
