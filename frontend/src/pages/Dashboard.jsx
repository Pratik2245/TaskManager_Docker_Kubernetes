import { useEffect, useState } from "react";
import api from "../services/api";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const response = await api.get("/tasks");

            setTasks(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>

            <h1>Task Dashboard 🚀</h1>

            <h2>Your Tasks</h2>

            {tasks.length === 0 ? (
                <p>No tasks found.</p>
            ) : (
                tasks.map((task) => (
                    <div key={task._id}>
                        <h3>{task.title}</h3>

                        <p>
                            {task.description}
                        </p>

                        <p>
                            Status: {task.status}
                        </p>
                    </div>
                ))
            )}

        </div>
    );
}

export default Dashboard;