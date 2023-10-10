import {useState} from "react";

export default function Post ({ title, content, author, date}) {

    //function handleCompleted (evt) {isCompleted = true}
    const [completed,setCompleted] = useState(false)
    const [endDate,setEndDate] = useState("")
    function handleCompleted (evt) {setCompleted(true);setEndDate(Date.now)}
    return (
        <div>
            <h3>Title: {title}</h3>
            <div>Description: {content}</div>
            <i>Author: <b>{author}</b></i>
            <br />
            <div>Date Created: {date}</div>
            <label htmlFor="Completed">Completed?</label>
            <input type="checkbox" name = "input-checkbox" id = "input-checkbox" onChange={handleCompleted} disabled={completed===true}/>
            <br />
            <div>dateCompleted: {endDate}</div>
            <br />
        </div>
    )
}
