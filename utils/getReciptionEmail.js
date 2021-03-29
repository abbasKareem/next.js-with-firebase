const getReciptionEmail = (users, userLoggedIn) =>
  users?.filter((userTofilter) => userTofilter !== userLoggedIn?.email)[0]

export default getReciptionEmail
