import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header.jsx';
import TaskControls from './components/TaskControls.jsx';
import TaskStats from './components/TaskStats.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import api from './services/api.js';
import './styles/App.css';

const normalizeTask = (task) => ({ ...task, id: task._id || task.id });

const sortTasks = (tasks, option) => {
  return [...tasks].sort((a, b) => {
    if (option === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    if (option === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (option === 'az') {
      return a.title.localeCompare(b.title);
    }
    if (option === 'za') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortOption, setSortOption] = useState('newest');

  const notifyError = (message) => {
    setError(message);
    toast.error(message);
  };

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const fetchTasks = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await api.get('/tasks');
      setTasks(response.data.map(normalizeTask));
    } catch (err) {
      notifyError(err.response?.data?.message || err.message || 'Failed to load tasks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    setError('');
    setSaving(true);

    try {
      const response = await api.post('/tasks', task);
      setTasks((prevTasks) => [normalizeTask(response.data), ...prevTasks]);
      notifySuccess('Task Added');
    } catch (err) {
      notifyError(err.response?.data?.message || err.message || 'Failed to add task.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const updateTask = async (updatedTask) => {
    setError('');
    setSaving(true);

    try {
      const response = await api.put(`/tasks/${updatedTask.id}`, updatedTask);
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? normalizeTask(response.data) : task))
      );
      setEditingTask(null);
      notifySuccess('Task Updated');
    } catch (err) {
      notifyError(err.response?.data?.message || err.message || 'Failed to update task.');
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (taskId) => {
    setError('');
    setSaving(true);

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
      notifySuccess('Task Deleted');
    } catch (err) {
      notifyError(err.response?.data?.message || err.message || 'Failed to delete task.');
    } finally {
      setSaving(false);
    }
  };

  const editTask = (task) => {
    setEditingTask(task);
    setError('');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setError('');
  };

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchText.trim()) {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    return sortTasks(filtered, sortOption);
  }, [tasks, searchText, statusFilter, priorityFilter, sortOption]);

  const taskCounts = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === 'Pending').length,
    inProgress: tasks.filter((task) => task.status === 'In Progress').length,
    completed: tasks.filter((task) => task.status === 'Completed').length,
  };

  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">
        <TaskStats {...taskCounts} />
        <TaskControls
          searchText={searchText}
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          sortOption={sortOption}
          onSearch={setSearchText}
          onStatusChange={setStatusFilter}
          onPriorityChange={setPriorityFilter}
          onSortChange={setSortOption}
        />
        <TaskForm
          onAddTask={addTask}
          onUpdateTask={updateTask}
          onCancelEdit={cancelEdit}
          editingTask={editingTask}
          saving={saving}
        />
        <TaskList
          tasks={filteredTasks}
          onEdit={editTask}
          onDelete={deleteTask}
          loading={loading}
        />
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </main>
    </div>
  );
}

export default App;
