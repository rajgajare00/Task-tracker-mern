import '../styles/TaskControls.css';

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'az', label: 'A-Z' },
  { value: 'za', label: 'Z-A' },
];

const statusOptions = ['All', 'Pending', 'In Progress', 'Completed'];
const priorityOptions = ['All', 'Low', 'Medium', 'High'];

function TaskControls({
  searchText,
  statusFilter,
  priorityFilter,
  sortOption,
  onSearch,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}) {
  return (
    <section className="task-controls card-panel">
      <div className="controls-row">
        <label className="search-field">
          Search tasks
          <input
            type="search"
            value={searchText}
            onChange={(event) => onSearch(event.target.value)}
            placeholder="Search by title"
          />
        </label>
        <label>
          Status
          <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Priority
          <select value={priorityFilter} onChange={(event) => onPriorityChange(event.target.value)}>
            {priorityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort by
          <select value={sortOption} onChange={(event) => onSortChange(event.target.value)}>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

export default TaskControls;
