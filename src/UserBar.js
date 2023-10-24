import Login from './Login'
import Logout from './Logout'
import Register from './Register'
//import {useState} from "react";
export default function UserBar({user, dispatchUser}) {
    //const [user, setUser] = useState("");
    if (user) { return <Logout user={user} dispatchUser={dispatchUser}/> }
    else {
        return (
            <>
                <Login dispatchUser={dispatchUser}/>
                <Register dispatchUser={dispatchUser}/>
            </>
        )
    }
}
