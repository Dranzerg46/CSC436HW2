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
                id: action.id
            };
            return [newPost, ...state];
        case "FETCH_POSTS":
            return action.posts;
        case "TOGGLE_TODO":
            return "";
        case "DELETE_TODO":
            return state.filter((post) => post.id !== action.id)
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