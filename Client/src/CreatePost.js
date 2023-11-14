import {useState, useContext} from "react";
import {StateContext} from "./contexts";
import {useResource} from "react-request-hook";
import {v4 as uuidv4} from "uuid"

export default function CreatePost () {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const {state, dispatch} = useContext(StateContext);
    const { user } = state;

    const [post , createPost ] = useResource(({ title, content, author, date, dateCompleted, booleanCompleted, id }) => ({
        url: '/posts' ,
        method: 'post',
        data: { title, content, author, date, dateCompleted, booleanCompleted, id }
    }))

    function handleTitle (evt) { setTitle(evt.target.value) }
    function handleContent (evt) { setContent(evt.target.value) }
    function handleCreate () {
        const newPost = { title, content, author: user, date: Date.now(), dateCompleted: 0, booleanCompleted: false, id: uuidv4()}
        createPost(newPost)
        dispatch({ type: 'CREATE_TODO', ...newPost})
       // handleAddPost(newPost)
    }
    return (
        <form onSubmit={e => {e.preventDefault(); handleCreate();}}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value = {title} onChange={handleTitle} name="create-title" id="create-title" />
            </div>
            <textarea value={content} onChange={handleContent}/>
            <input type="submit" value="Create" disabled={title.length === 0}/>
        </form>
    )
}

