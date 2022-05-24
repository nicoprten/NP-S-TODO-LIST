import { RadioButtonUnchecked, RadioButtonChecked, Delete } from '@mui/icons-material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import styles from './Tasks.module.scss';

export default function Tasks({tasks, deleteTask, toggleTask, showTask, moveDownTask, moveUpTask}){
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
            {/* {taskFilter.length > 0 && <p>{taskFilter[0]}</p>}; */}
            {taskFilter.length > 0 && taskFilter.map((t, i) => {
                return (
                    <div key={t.id}>
                        {i === 0 && <p className={styles.firstTask}><span className={styles.spanText}>Next task to do:</span> {t.task}</p>}
                        <div  className={styles.containerTask}>
                            
                            {i < (taskFilter.length - 1) && <button onClick={() => moveDownTask(t.id)}><ArrowDownwardIcon color='primary'/></button>}
                            {i !== 0 && <button onClick={() => moveUpTask(t.id)}><ArrowUpwardIcon color='primary'/></button>}
                            {t.complete ? <p className={styles.complete}>{t.task}</p> : <p>{t.task}</p>}
                            <div className={styles.containerButtons}>
                            <button onClick={() => toggleTask(t.id)}>{t.complete ? <RadioButtonChecked color='primary'/> : <RadioButtonUnchecked color='primary'/>}</button>
                            <button onClick={() => deleteTask(t.id)}><Delete color='primary'/></button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}