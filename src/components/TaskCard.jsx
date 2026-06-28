import '../styles/TaskCard.css';

function TaskCard({ task, onEdit, onDelete }) {
  const statusClass = task.status.toLowerCase().replace(' ', '-');
  const priorityClass = task.priority.toLowerCase();

  const confirmDelete = () => {
    if (window.confirm(`Delete task "${task.title}"? This action cannot be undone.`)) {
      onDelete(task.id);
    }
  };

  return (
    <article className="task-card">
      <div className="task-card-header">
        <div>
          <h3>{task.title}</h3>
          <p className="task-date">Created {task.createdAt}</p>
        </div>
        <div className="badges">
          <span className={`badge status ${statusClass}`}>{task.status}</span>
          <span className={`badge priority ${priorityClass}`}>{task.priority}</span>
        </div>
      </div>
      <p className="task-description">{task.description}</p>
      <div className="task-card-actions">
        <button type="button" className="secondary-button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button type="button" className="text-button" onClick={confirmDelete}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskCard;
