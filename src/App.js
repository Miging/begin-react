import logo from './logo.svg';
import './App.css';
import Hello from './Hello';
import Wrapper from './Wrapper';
import Counter from './Counter';
import InputSample from './InputSample';
import UserList from './UserList'
import { useRef, useState ,useMemo, useCallback, useReducer} from 'react';
import CreateUser from './CreateUser';

function countActiveUsers(users) {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user=>user.active).length;
}

const initialState={
  inputs:{
    username:'',
    email:''
  },
  users:[
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
  ]
};
function reducer(state,action) {
  switch(action.type){
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.name]:action.value
        }
      };
    case 'CREATE_USER':
      return{
        inputs:initialState.inputs,
        users:state.users.concat(action.user)
      };
    case 'TOGGLE_USER':
      return{
        ...state,
        users:state.users.map(user=>
          user.id===action.id?{...user,active:!user.active}:user
        )
      };
    case 'REMOVE_USER':
      return{
        ...state,
        users:state.users.filter(user=>user.id!==action.id)
      }
    default:
      return state;
  }
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState);
  const nextId=useRef(4);
  const {users}=state;
  const {username,email}=state.inputs;

  const onChange=useCallback(e=>{
    const {name,value}=e.target;
    dispatch({
      type:'CHANGE_INPUT',
      name,
      value
    });
  },[]);

  const onCreate=useCallback(()=>{
    dispatch({
      type:'CREATE_USER',
      user:{
        id:nextId.current,
        username,
        email
      }
    });
    nextId.current+=1;
  },[username,email]);

  const onToggle=useCallback(id=>{
    dispatch({
      type:'TOGGLE_USER',
      id
    });
  },[]);
  
  const onRemove=useCallback(id=>{
    dispatch({
      type:'REMOVE_USER',
      id
    });
  },[]);

  const count=useMemo(()=>countActiveUsers(users),[users]);

  return (
    <>
      <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수 : {count}</div>
    </>

  );
}

export default App;
