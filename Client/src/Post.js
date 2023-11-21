import {useEffect, useState} from "react";
import { useContext} from "react";
import {StateContext, ThemeContext} from "./contexts";
import {useResource} from "react-request-hook";
import App from "./App";

export default function Post ({ _id, title, content, author, date, dateCompleted, booleanCompleted}) {


    const { secondaryColor } = useContext(ThemeContext);
    //const []
    //function handleCompleted (evt) {isCompleted = true}
    const [completed,setCompleted] = useState(booleanCompleted)
    const [endDate,setEndDate] = useState(dateCompleted)
    const [checked, setChecked] = useState(booleanCompleted);
    const [deleted, setDeleted] = useState('');
    const {state, dispatch} = useContext(StateContext);
    let value = '';
    const x = booleanCompleted;
    //const ObjectIdString = id.toString();
    const { user } = state;

    const [post , toggleTodo ] = useResource(({ dateCompleted, booleanCompleted }) => ({
        url: '/post/'  +_id ,
        method: 'patch',
        headers: { Authorization: `${state?.user?.access_token}` },
        data: { dateCompleted, booleanCompleted }
    }))

    const [post1 , deleteTodo ] = useResource(() => ({
        url: '/post/' + _id,
        method: 'delete',
        headers: { Authorization: `${state?.user?.access_token}` },
        data: { }
    }))

   // useEffect(() => {
   //     if (user && user.data) {
   //         dispatchUser({ type: "REGISTER", username: user.data.user.email });
   //     }
   // }, [user, dispatchUser]);

 //   useEffect(() => {
 //       if (post && post.data) {
 //           dispatch({ type: "REGISTER", dateCompleted: endDate, booleanCompleted: 1 });
 //       }
 //   }, [user, dispatchUser]);

    function handleCompleted (evt) {
        setCompleted(true);
        setChecked(true);
        const end = Date.now();
        setEndDate(end);
        const updateTodo = {dateCompleted: end, booleanCompleted: true};
       // setEndDate(Date.now);
        toggleTodo(updateTodo);

       // dispatch({ type: 'TOGGLE_TODO'}, /*updateTodo*/)
    }

    function handleDelete(evt)
    {
        value = 'Deleted'
        setDeleted(value);
        deleteTodo();
         dispatch({ type: 'DELETE_TODO', _id: _id} /*updateTodo*/)
    }

    return (
        <div>
            <h3 style={{color: secondaryColor}}>Title: {title}</h3>
            <div>Description: {content}</div>
            <i>Author: <b>{author}</b></i>
            <br />
            <div>Date Created: {date}</div>
            <label htmlFor="Completed">Completed?</label>
            <input type="checkbox" name = "input-checkbox" id = "input-checkbox"  checked={checked} onChange={handleCompleted} disabled={x === 1}/>
            <br />
            <div>dateCompleted: {endDate}</div>
            <form onSubmit={e => {e.preventDefault();handleDelete();}}>
            <input type="submit" value="Delete" />
            </form>
            <br />
        </div>
    )
}
