import { useState, useEffect } from 'react';
import Tasks from './../Tasks/Tasks';
import styles from './Input.module.scss';

export default function Input(){
    const [task, setTask] = useState('');
    const [showTask, setShowTask] = useState('');
    const [error, setError] = useState('');

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
        const taskCapitalize = task.charAt(0).toUpperCase() + task.slice(1);
        if(tasks.filter(t => t.task === taskCapitalize).length == 0){
            let id = new Date().valueOf();
            setTasks([...tasks, {id, task: taskCapitalize, complete: false}]);
            setTask('');
            setError('');
        }else{
            setError('La tarea ya está agregada.')
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
            {error && 
                <div className={styles.error}>
                    <p>{error}</p>
                </div>
            }

            <Tasks tasks={tasks} deleteTask={deleteTask} toggleTask={toggleTask} showTask={showTask}/>
        </>

    )
}