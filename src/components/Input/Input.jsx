import { useState } from 'react';
import Tasks from './../Tasks/Tasks';
import styles from './Input.module.scss';

export default function Input(){
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showTask, setShowTask] = useState('');
    const [id, setId] = useState(0);

    function addTask(e, task){
        e.preventDefault();
        if(task.length > 2){
            const taskCapitalize = task.charAt(0).toUpperCase() + task.slice(1);
            setTasks([...tasks, {id, task: taskCapitalize, complete: false}]);
            setId(id + 1);
            setTask('');
        }
    }
    function deleteTask(id){
        const newTasks = tasks.filter((task) =>  task.id !== id);
        setTasks(newTasks);
    }
    function toggleTask(id){
        const taskToToggle = tasks.find(t => t.id == id);
        taskToToggle.complete = !taskToToggle.complete;
        // console.log(taskToToggle)
        setTasks([...tasks]);
    }

    return(
        <>
            <div className={styles.containerInput}>
                <h1>NP´s TODO LIST</h1>
                <form>
                    <input type="text" onChange={(e) => setTask(e.target.value)} value={task} placeholder='Some task'/>
                    <button type="submit" onClick={(e) => addTask(e, task)}>ADD</button>
                    <select name='task-state' onChange={e => setShowTask(e.target.value)}>
                        <option value='all'>All</option>
                        <option value='complete'>Complete</option>
                        <option value='incomplete'>Incomplete</option>
                    </select>
                </form>
            </div>
            <Tasks tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} showTask={showTask}/>
        </>

    )
}