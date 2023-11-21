import {useState, useContext, useEffect} from "react";
import {StateContext} from "./contexts";
import {useResource} from "react-request-hook";
import {v4 as uuidv4} from "uuid"

export default function CreatePost () {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const {state, dispatch} = useContext(StateContext);
    const { user } = state;

    const [post , createPost ] = useResource(({ title, content, /*author*/ date, dateCompleted, booleanCompleted }) => ({
        url: '/post' ,
        method: 'post',
        headers: {"Authorization": `${state.user.access_token}`},
        data: { title, content, date, dateCompleted, booleanCompleted,  }
    }))

    function handleTitle (evt) { setTitle(evt.target.value) }
    function handleContent (evt) { setContent(evt.target.value) }
    function handleCreate () {
       // const myObjectID = ObjectId();
        const newPost = { title, content, /*author: user.username,*/ date: Date.now(), dateCompleted: 0, booleanCompleted: false, _id:"" }
        createPost(newPost)
       // dispatch({ type: 'CREATE_TODO', ...newPost})
       // handleAddPost(newPost)
    }

    useEffect(() => {
        if (post.isLoading === false && post.data) {
            dispatch({
                type: "CREATE_TODO",
                title: post.data.title,
                content: post.data.content,
                _id: post.data.id,
                author: user.username,
                date: post.data.date,
                dateCompleted: post.data.dateCompleted,
                booleanCompleted: post.data.booleanCompleted
            });
        }
    }, [post]);
    return (
        <form onSubmit={e => {e.preventDefault(); handleCreate();}}>
            <div>Author: <b>{user.username}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value = {title} onChange={handleTitle} name="create-title" id="create-title" />
            </div>
            <textarea value={content} onChange={handleContent}/>
            <input type="submit" value="Create" disabled={title.length === 0}/>
        </form>
    )
}

