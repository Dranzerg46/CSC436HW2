function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                username: action.username,
                access_token: action.access_token,
            };
      //  case "REGISTER":
      //      return action.username;
        case "LOGOUT":
            return "";
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch (action.type) {
        case "CREATE_TODO":
            const newPost = {
                title: action.title,
                content: action.content,
                author: action.author,
                date: action.date,
                dateCompleted: action.dateCompleted,
                booleanCompleted: action.booleanCompleted,
                _id: action._id
            };
            return [newPost, ...state];
        case "FETCH_POSTS":
            return action.posts;
        case "TOGGLE_TODO":
            return "";
        case "DELETE_TODO":
            return state.filter((post) => post._id !== action._id)
        default:
            return state;
    }
}

export default function appReducer (state, action) {
    return {
        user: userReducer(state.user,action),
        posts: todoReducer(state.posts,action)
    };
}