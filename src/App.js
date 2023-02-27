import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList'
import { useRef, useState ,useMemo, useCallback} from 'react';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user=>user.active).length;
}

function App() {
  const [inputs,setInputs]=useState({
    username:'',
    email:''
  });
  const {username,email}=inputs;
  const onChange= useCallback(
  e=>{
    const {name,value}=e.target;
    setInputs(inputs=>({
      ...inputs,
      [name]:value
    }));
  },[]);
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
  const onCreate=useCallback(()=>{
    const user={
      id:nextId.current,
      username,
      email
    }
    setUsers(users=>users.concat(user));

    setInputs({
      username:'',
      email:''
    });
    nextId.current+=1;
  },[users,username,email]);
  const onRemove=useCallback( id=>{
    setUsers(users=>users.filter(user=>user.id!==id));
  },[]);
  const onToggle=useCallback(id=>{
    setUsers(users=>
      users.map(user=>
        user.id === id ?{...user, active:!user.active }:user
      )
    );
  },[]);
  //활성화 유저 찾기 
  const count=useMemo(()=>countActiveUsers(users),[users]);
  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
      <div>활성 사용자 수 : {count}</div>
    </>

  );
}

export default App;
