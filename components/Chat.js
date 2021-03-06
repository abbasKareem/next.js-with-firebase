import { Avatar } from '@material-ui/core'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import getReciptionEmail from '../utils/getReciptionEmail'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function Chat({ id, users }) {
  const router = useRouter()

  const [user] = useAuthState(auth)
  const [recipientSnapshot] = useCollection(
    db.collection('users').where('email', '==', getReciptionEmail(users, user))
  )

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

  const recipient = recipientSnapshot?.docs?.[0]?.data()

  const recipientEmail = getReciptionEmail(users, user)
  return (
    <Container onClick={enterChat}>
      {recipient ? (
        <UserAvatar src={recipient.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0]}</UserAvatar>
      )}

      <p>{recipientEmail}</p>
    </Container>
  )
}

export default Chat

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  word-break: break-word;
  :hover {
    background-color: #e9eaeb;
  }
  :active {
    background-color: red;
  }

  @media screen and (max-width: 480px) {
    font-size: 7px;
  }
`
const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`
