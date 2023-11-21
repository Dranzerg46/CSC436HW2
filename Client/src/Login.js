import {useEffect, useState} from "react";
import {useResource} from "react-request-hook";

export default function Login({ dispatchUser}) {

    const [username, setUsername ] = useState('')
    const [ loginFailed, setLoginFailed ] = useState(false)
    const [ password, setPassword ] = useState('')

   // const [user, login] = useResource((username, password) => ({
   //     url: "/login",
   //     method: "post",
   //     data: { email: username, password },
   // }));


//    useEffect(() => {
//        if (user) {
//            if (user?.data?.user) {
//                setLoginFailed(false);
//                dispatchUser({ type: "LOGIN", username: user.data.user.email });
//            } else {
//                setLoginFailed(true);
//            }
//        }
//    }, [user]);

    const [user, login] = useResource((username, password) => ({
        url: "/auth/login",
        method: "post",
        data: { username, password },
    }));
    useEffect(() => {
        if (user && user.isLoading === false && (user.data || user.error)) {
            if (user.error) {
                setLoginFailed(true);
            } else {
                setLoginFailed(false);
                dispatchUser({
                    type: "LOGIN",
                    username: "User",
                    access_token: user.data.access_token,
                });
            }
        }
    }, [user]);

    function handleUsername (evt) {setUsername(evt.target.value)}
    function handlePassword (evt) { setPassword(evt.target.value) }

    return (
        <>
        {loginFailed && <span style={{color: "red"}}>invalid username or password</span> }
        <form onSubmit={e => {e.preventDefault(); login(username,password)/*dispatchUser({type: "LOGIN", username: username});*/}}>
            <label htmlFor="login-username">Username:</label>
            <input type="text" name="login-username" id="login-username" value={username} onChange={handleUsername}/>
            <label htmlFor="login-password">Password:</label>
            <input type="password" value={password} onChange={handlePassword} name="login-username" id="login-username" />
            <input type="submit" value="Login" disabled={username.length === 0}/>
        </form>
        </>
    )
}