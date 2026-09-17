import { useState } from "react";

function TaskCard({ task, onDelete, onUpdate }) {

    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");

    const handleStatusChange = (e) => {
        onUpdate(task._id, {
            status: e.target.value
        });
    };

    const handleEdit = () => {
        setTitle(task.title);
        setDescription(task.description || "");
        setIsEditing(true);
    };

    const handleCancel = () => {
        setTitle(task.title);
        setDescription(task.description || "");
        setIsEditing(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            return;
        }

        setIsSaving(true);
        const updatedTask = await onUpdate(task._id, {
            title: title.trim(),
            description: description.trim()
        });
        setIsSaving(false);

        if (updatedTask) {
            setIsEditing(false);
        }
    };

    return (
        <article className="task-card">
            {isEditing ? (
                <form className="task-edit-form" onSubmit={handleSave}>
                    <div className="form-field">
                        <label htmlFor={`edit-title-${task._id}`}>Task title</label>
                        <input id={`edit-title-${task._id}`} value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
                    </div>
                    <div className="form-field">
                        <label htmlFor={`edit-description-${task._id}`}>Details</label>
                        <textarea id={`edit-description-${task._id}`} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="task-edit-actions">
                        <button className="secondary-button" type="button" onClick={handleCancel}>Cancel</button>
                        <button className="primary-button" type="submit" disabled={isSaving || !title.trim()}>{isSaving ? "Saving..." : "Save changes"}</button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="task-card-top">
                        <h3 className={task.status === "COMPLETED" ? "task-completed" : ""}>{task.title}</h3>
                        <button className="edit-button" onClick={handleEdit}>Edit</button>
                    </div>
                    {task.description && <p className={`task-description ${task.status === "COMPLETED" ? "task-completed" : ""}`}>{task.description}</p>}
                    <div className="task-controls">
                        <select className="status-select" aria-label={`Status for ${task.title}`} value={task.status} onChange={handleStatusChange}>
                            <option value="TODO">To do</option>
                            <option value="IN_PROGRESS">In progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                        <button className="danger-button" onClick={() => onDelete(task._id)}>Delete</button>
                    </div>
                </>
            )}
        </article>
    );
}

export default TaskCard;