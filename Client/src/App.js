//import logo from './logo.svg';
//import './App.css';

import UserBar from "./UserBar";
import CreatePost from "./CreatePost";
//import {useState} from "react";
import {useEffect, useReducer, useState} from "react";
import PostList from "./PostList";
import appReducer from "./reducers";
import Header from "./Header";
import ChangeTheme  from "./ChangeTheme"
import {ThemeContext, StateContext} from "./contexts";
import {useResource} from "react-request-hook";

function App() {
    //const [user,setUser] = useState("");
    //const initialPosts = []
//    useEffect(() => {
//        fetch('/api/posts')
//            .then(result => result.json())
//            .then(posts => dispatch({ type: 'FETCH_POSTS', posts }))
//    }, [])

    const [ postResponse, getPosts ] = useResource(() => ({
        url: '/posts',
        method: 'get'
    }))
    const [ state, dispatch ] = useReducer(appReducer, { user: '', /*posts: initialPosts */ posts: [] });
    const {user,posts} = state;

    useEffect(getPosts, [])

    useEffect(() => {
        if (postResponse && postResponse.data) {
            dispatch({type: "FETCH_POSTS", posts: postResponse.data.reverse()});
        }
    }, [postResponse]);



      //  const [ state, dispatch ] = useReducer(appReducer, { user: '', /*posts: initialPosts */ posts: [] });

    //const {user,posts} = state;

    const [theme, setTheme] = useState({primaryColor: "orange", secondaryColor: "purple"});

        useEffect(() => {
            if (user) {
                document.title = `${user}’s Blog`
            } else {
                document.title = 'Blog'
            }
        }, [user])






//const [user, dispatchUser] = useReducer(userReducer, "");



    //const [posts, dispatchPost] = useReducer(todoReducer, initialPosts);

   // const initialPosts = []

  //  const [posts, setPosts] = useState(initialPosts);

    //handled differently in slides
    //const handleAddPost = (newPost) => {setPosts([newPost,...posts]);};

    //const handleAddPost = (newPost) => { dispatch({type: "CREATE_TODO",...newPost}); }

    //const handleAddPost = (newPost) => { dispatchPost({type: "CREATE_TODO", title: newPost.title, content: newPost.content, author: newPost.author}); };
    //the commented out on 53 is the samr as 52 just more specific in what is being transmitted using the spread operator



    return (
        <div>
            <StateContext.Provider value={{ state, dispatch }}>
            <ThemeContext.Provider value={theme}>
            <Header text= "Blog" />
                <ChangeTheme theme={theme} setTheme={setTheme} />
            <UserBar/>
            <CreatePost/>
            <PostList posts = {posts}/>
            </ThemeContext.Provider>
            </StateContext.Provider>
        </div>
    );
}

export default App;
