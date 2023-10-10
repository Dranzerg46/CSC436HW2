import Post from './Post'
import {v4 as uuidv4} from "uuid"
export default function PostList ({posts = []}) {


    return (
        <div>
            {posts.map((p, i) => (
                //<Post title={p.title} content = {p.content} author = {p.author} key = {"post-" + i} /> is what below is doing
                <Post {...p} key={uuidv4()} />
            ))}
        </div>
    );
}

