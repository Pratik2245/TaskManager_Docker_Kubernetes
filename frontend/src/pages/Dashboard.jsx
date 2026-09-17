import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

function Dashboard() {

    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    // Fetch tasks
    const fetchTasks = async () => {

        try {

            const response = await api.get("/tasks");

            setTasks(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        const loadTasks = async () => {
            await fetchTasks();
        };

        loadTasks();
    }, []);


    // Add task to UI
    const handleTaskCreated = (newTask) => {

        setTasks((previousTasks) => [
            newTask,
            ...previousTasks
        ]);

    };


    // Update task
    const handleUpdate = async (id, data) => {

        try {

            const response = await api.put(
                `/tasks/${id}`,
                data
            );

            setTasks((previousTasks) =>
                previousTasks.map((task) =>
                    task._id === id
                        ? response.data
                        : task
                )
            );

            return response.data;

        } catch (error) {

            console.error(error);

            return null;

        }
    };


    // Delete task
    const handleDelete = async (id) => {

        try {

            await api.delete(`/tasks/${id}`);

            setTasks((previousTasks) =>
                previousTasks.filter(
                    (task) => task._id !== id
                )
            );

        } catch (error) {

            console.error(error);

        }
    };


    // Logout
    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");

    };


    const completedCount = tasks.filter((task) => task.status === "COMPLETED").length;
    const activeCount = tasks.filter((task) => task.status === "IN_PROGRESS").length;

    return (
        <div className="dashboard-page">
            <header className="dashboard-header">
                <div className="header-inner">
                    <div className="brand"><span className="brand-mark">T</span> Taskspace</div>
                    <div className="user-actions">
                        <span className="welcome">Welcome, <strong>{user?.name || "there"}</strong></span>
                        <button className="secondary-button" onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </header>

            <main className="dashboard-main">
                <section className="dashboard-intro">
                    <div>
                        <p className="dashboard-kicker">Your workspace</p>
                        <h1 className="dashboard-title">Good work starts here.</h1>
                        <p className="task-count">{tasks.length} {tasks.length === 1 ? "task" : "tasks"} in your list</p>
                    </div>
                    <div className="stat-strip" aria-label="Task summary">
                        <div className="stat"><strong>{tasks.length}</strong><span>Total</span></div>
                        <div className="stat"><strong>{activeCount}</strong><span>Active</span></div>
                        <div className="stat"><strong>{completedCount}</strong><span>Done</span></div>
                    </div>
                </section>

                <div className="workspace-grid">
                    <section className="panel create-panel">
                        <div className="panel-heading">
                            <h2>Add a task</h2>
                            <p>Capture the next thing worth your attention.</p>
                        </div>
                        <TaskForm onTaskCreated={handleTaskCreated} />
                    </section>

                    <section>
                        <div className="task-list-header">
                            <h2>My tasks</h2>
                        </div>
                        {loading ? (
                            <p className="loading-state">Loading your tasks...</p>
                        ) : tasks.length === 0 ? (
                            <div className="empty-state"><strong>Your list is clear.</strong>Create your first task to get momentum.</div>
                        ) : (
                            <div className="task-list">
                                {tasks.map((task) => (
                                    <TaskCard key={task._id} task={task} onDelete={handleDelete} onUpdate={handleUpdate} />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;