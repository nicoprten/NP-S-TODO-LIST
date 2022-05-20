import {RadioButtonUnchecked, RadioButtonChecked, Delete} from '@mui/icons-material';
import styles from './Tasks.module.scss';

export default function Tasks({tasks, deleteTask, toggleTask, showTask}){
    console.log(tasks)
    let taskFilter = [];
    if(showTask === 'complete'){
        taskFilter = tasks.filter(t => t.complete == true);
    }else if(showTask === 'incomplete'){
        taskFilter = tasks.filter(t => t.complete == false);
    }else{
        taskFilter = tasks;
    }
    return(
        <div className={styles.containerTasks}>
            {taskFilter.length > 0 && taskFilter.map((t, i) => {
                return (
                    <div key={i} className={styles.containerTask}>
                        {t.complete ? <p className={styles.complete}>{t.task}</p> : <p>{t.task}</p>}
                        <div className={styles.containerButtons}>
                        <button onClick={() => toggleTask(t.id)}>{t.complete ? <RadioButtonChecked color='primary'/> : <RadioButtonUnchecked color='primary'/>}</button>
                        <button onClick={() => deleteTask(t.id)}><Delete color='primary'/></button>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}