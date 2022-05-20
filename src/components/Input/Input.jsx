import { useState, useEffect } from 'react';
import Tasks from './../Tasks/Tasks';
import styles from './Input.module.scss';

export default function Input(){
    const [task, setTask] = useState('');
    const [showTask, setShowTask] = useState('');
    
    // LocalStorage
    const [tasks, setTasks] = useState(getLocalStorage());
    function getLocalStorage(){
        const localTasks = JSON.parse(localStorage.getItem('tasks'));
        // console.log(localTasks)
        if(localTasks){
            return localTasks;
        }else{
            return [];
        }
    }
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log(tasks)
    }, [tasks])

    function addTask(e, task){
        e.preventDefault();
        if(task.length > 2){
            const taskCapitalize = task.charAt(0).toUpperCase() + task.slice(1);
            let id = task[Math.floor(Math.random() * task.length)] + Math.floor(Math.random() * (task.length * 5));
            setTasks([...tasks, {id, task: taskCapitalize, complete: false}]);
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