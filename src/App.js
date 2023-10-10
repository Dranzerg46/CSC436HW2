//import logo from './logo.svg';
//import './App.css';

import UserBar from "./UserBar";
import CreatePost from "./CreatePost";
import {useState} from "react";
import PostList from "./PostList";

function App() {
    const [user,setUser] = useState("")

    const initialPosts = []

    const [posts, setPosts] = useState(initialPosts);

    //handled differently in slides
    const handleAddPost = (newPost) => {setPosts([newPost,...posts]);};


    return (
        <div>
            <UserBar user={user} setUser={setUser}/>
            <CreatePost user={user} handleAddPost={handleAddPost}/>
            <PostList posts={posts}/>
        </div>
    )
}

export default App;
