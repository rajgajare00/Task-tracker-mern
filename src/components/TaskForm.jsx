import { useEffect, useState } from 'react';
import '../styles/TaskForm.css';

const defaultValues = {
  title: '',
  description: '',
  status: 'Pending',
  priority: 'Medium',
};

const statusOptions = ['Pending', 'In Progress', 'Completed'];
const priorityOptions = ['Low', 'Medium', 'High'];

function TaskForm({ onAddTask, onUpdateTask, onCancelEdit, editingTask, saving }) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setValues(editingTask);
      setErrors({});
      return;
    }
    setValues(defaultValues);
    setErrors({});
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fieldErrors = {};

    if (!values.title.trim()) {
      fieldErrors.title = 'Title is required and cannot be blank.';
    }

    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors);
      return;
    }

    try {
      if (editingTask) {
        await onUpdateTask(values);
      } else {
        await onAddTask(values);
      }
      setValues(defaultValues);
      setErrors({});
    } catch (error) {
      // Leave form values intact on error so users can retry.
    }
  };

  return (
    <section className="task-form-shell card-panel">
      <div className="form-heading">
        <h2>{editingTask ? 'Edit Task' : 'Add Task'}</h2>
        <p>Enter task details and set its status, priority, and description.</p>
      </div>
      <form className="task-form" onSubmit={handleSubmit}>
        <label>
          Title <span className="required">*</span>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            placeholder="Task title"
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </label>
        <label>
          Description
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Add a short description"
            rows="4"
          />
        </label>
        <div className="selector-row">
          <label>
            Status
            <select name="status" value={values.status} onChange={handleChange}>
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label>
            Priority
            <select name="priority" value={values.priority} onChange={handleChange}>
              {priorityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="form-actions">
          <div className="action-buttons">
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? (editingTask ? 'Updating...' : 'Saving...') : editingTask ? 'Update Task' : 'Add Task'}
            </button>
            {editingTask && (
              <button type="button" className="secondary-button cancel-button" onClick={onCancelEdit} disabled={saving}>
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}

export default TaskForm;
