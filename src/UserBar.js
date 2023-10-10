import Login from './Login'
import Logout from './Logout'
import Register from './Register'
//import {useState} from "react";
export default function UserBar({user, setUser}) {
    //const [user, setUser] = useState("");
    if (user) { return <Logout user={user} setUser={setUser}/> }
    else {
        return (
            <>
                <Login setUser={setUser}/>
                <Register setUser={setUser}/>
            </>
        )
    }
}
