import React from 'react'

interface user {
  id : number ;
  name : string ;
}
const UserPage = async () => {
  const res = await fetch ('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  const users : user []= await res.json()
  return (
    <>
    <h1>Users Page</h1>
    <p>{new Date().toLocaleTimeString()}</p>
    <ul>
      {users.map(u => 
        <li key = {u.id}>
          {u.name}
        </li>
      )}
    </ul>
    </>
  )
}

export default UserPage