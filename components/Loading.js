import { Circle } from 'better-react-spinkit'

const Loading = () => {
  return (
    <center
      style={{
        display: 'grid',
        placeItems: 'center',
        heigth: '100vh',
      }}
    >
      <div>
        <img
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png'
          alt='whatsappclone'
          style={{ marginBottom: 10 }}
          height={200}
        />
        <Circle color='#3CBC2B' size={60} />
      </div>
    </center>
  )
}

export default Loading
