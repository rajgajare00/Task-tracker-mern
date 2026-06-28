import TaskCard from './TaskCard.jsx';
import '../styles/TaskList.css';

function TaskList({ tasks, onEdit, onDelete, loading }) {
  return (
    <section className="task-list-shell">
      <div className="task-list-header">
        <h2>Task List</h2>
        <p>Review tasks, update statuses, or remove items as needed.</p>
      </div>
      <div className="task-grid">
        {loading ? (
          <div className="empty-state card-panel">
            <div className="empty-state-loader">
              <div className="spinner" />
              <p>Loading tasks...</p>
            </div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="empty-state card-panel empty-illustration-state">
            <div className="illustration-box">
              <span className="illustration-icon">🗒️</span>
            </div>
            <div>
              <h3>No tasks found.</h3>
              <p>Adjust your filters or add a new task to populate the list.</p>
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </section>
  );
}

export default TaskList;
