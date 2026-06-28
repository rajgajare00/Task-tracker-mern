import '../styles/TaskStats.css';

function TaskStats({ total, pending, inProgress, completed }) {
  const stats = [
    { label: 'Total Tasks', value: total, accent: 'total' },
    { label: 'Pending', value: pending, accent: 'pending' },
    { label: 'In Progress', value: inProgress, accent: 'progress' },
    { label: 'Completed', value: completed, accent: 'completed' },
  ];

  return (
    <section className="task-stats-grid card-panel">
      {stats.map((item) => (
        <div key={item.label} className={`task-stat-card ${item.accent}`}>
          <p>{item.label}</p>
          <h3>{item.value}</h3>
        </div>
      ))}
    </section>
  );
}

export default TaskStats;
