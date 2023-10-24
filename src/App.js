//import logo from './logo.svg';
//import './App.css';

import UserBar from "./UserBar";
import CreatePost from "./CreatePost";
//import {useState} from "react";
import {useReducer} from "react";
import PostList from "./PostList";

function App() {
    //const [user,setUser] = useState("");


    function userReducer(state, action) {
        switch (action.type) {
            case "LOGIN":
            case "REGISTER":
                return action.username;
            case "LOGOUT":
                return "";
            default:
                return state;
        }
    }

    const [user, dispatchUser] = useReducer(userReducer, "");


    function todoReducer(state, action) {
        switch (action.type) {
            case "CREATE_TODO":
                const newPost = {
                    title: action.title,
                    content: action.content,
                    author: action.author,
                };
                return [newPost, ...state];
            default:
                return state;
        }
    }
    const initialPosts = []

    const [posts, dispatchPost] = useReducer(todoReducer, initialPosts);



   // const initialPosts = []

  //  const [posts, setPosts] = useState(initialPosts);

    //handled differently in slides
    //const handleAddPost = (newPost) => {setPosts([newPost,...posts]);};
    const handleAddPost = (newPost) => { dispatchPost({type: "CREATE_TODO",...newPost}); }
    //const handleAddPost = (newPost) => { dispatchPost({type: "CREATE_TODO", title: newPost.title, content: newPost.content, author: newPost.author}); };
    //the commented out on 53 is the samr as 52 just more specific in what is being transmitted using the spread operator

    return (
        <div>
            <UserBar user={user} dispatchUser={dispatchUser}/>
            <CreatePost user={user} handleAddPost={handleAddPost}/>
            <PostList posts={posts}/>
        </div>
    )
}

export default App;
