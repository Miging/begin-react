import React from "react";

function User({user}){
    return(
        <div>
            <b>{user.username}</b> <span>({user.nickname})</span>
        </div>
    )
}

function UserList(props) {
    const users=[
        {
            id:1,
            username:'민혁',
            nickname:'미기'
        },{
            id:2,
            username:'민찬',
            nickname:'바보'
        },{
            id:3,
            username:'성훈',
            nickname:'등신'
        }
    ]
    return(
        <div>
            {users.map(user=>(
                <User user={user} key={user.id}/>
            ))}
        </div>
    )
}

export default UserList;    