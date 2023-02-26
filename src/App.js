import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList'
import { useRef, useState } from 'react';
import CreateUser from './CreateUser';

function App() {
  const [inputs,setInputs]=useState({
    username:'',
    email:''
  });
  const {username,email}=inputs;
  const onChange=e=>{
    const {name,value}=e.target;
    setInputs({
      ...inputs,
      [name]:value
    });
  };
  const onRemove=id=>{
    setUsers(users.filter(user=>user.id!==id));
  };
  const onToggle=id=>{
    setUsers(
      users.map(user=>
        user.id === id ?{...user, active:!user.active }:user
      )
    );
  };
  const [users,setUsers]=useState([
    {
        id:1,
        username:'민혁',
        email:'dnfldpden32@gmail.com',
        active:true
    },{
        id:2,
        username:'민찬',
        email:'fdjslfjds@naver.com',
        active:false
    },{
        id:3,
        username:'성훈',
        email:'fdsfjdsljl@icloud.com',
        active:false
    }
  ]);
  const nextId=useRef(4);
  const onCreate=()=>{
    const user={
      id:nextId.current,
      username,
      email
    }
    setUsers(users.concat(user));

    setInputs({
      username:'',
      email:''
    });
    nextId.current+=1;
  }
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
    </>

  );
}

export default App;
