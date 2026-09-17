import { useState } from "react";
import api from "../services/api";

function TaskForm({ onTaskCreated }) {

    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError("Task title is required");
            return;
        }

        try {
            const response = await api.post("/tasks", formData);

            onTaskCreated(response.data);

            setFormData({
                title: "",
                description: ""
            });

            setError("");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create task"
            );
        }
    };

    return (
        <div>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label htmlFor="task-title">Task title</label>
                    <input id="task-title" type="text" name="title" placeholder="e.g. Prepare project brief" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-field">
                    <label htmlFor="task-description">Details <span>(optional)</span></label>
                    <textarea id="task-description" name="description" placeholder="Add a little context..." value={formData.description} onChange={handleChange} />
                </div>
                <button className="primary-button" type="submit">Add task</button>
            </form>
        </div>
    );
}

export default TaskForm;