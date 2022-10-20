import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "./create.css";
import {Button} from "./Button"

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        author: "",
        availability: "",
        subject: "",
        records: [],
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:5000/record/${params.id.toString()}`);

            if (!response.ok) {
                const message = `An error has occurred: ${response.statusText}`;
                window.alert(message);
                return;
            }

            const record = await response.json();
            if (!record) {
                window.alert(`Record with id ${id} not found`);
                navigate("/records");
                return;
            }

            setForm(record);
        }

        fetchData();

        return;
    }, [params.id, navigate]);

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const editedPerson = {
            name: form.name,
            author: form.author,
            availability: form.availability,
            subject: form.subject,
        };

        // This will send a post request to update the data in the database.
        await fetch(`http://localhost:5000/update/${params.id}`, {
            method: "POST",
            body: JSON.stringify(editedPerson),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        
        
        navigate("/records");
    }

    // This following section will display the form that takes input from the user to update the data.
    return (
        <div>
            <h2 className="title">Update Book</h2>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Title </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author </label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        value={form.author}
                        onChange={(e) => updateForm({ author: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject </label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        value={form.subject}
                        onChange={(e) => updateForm({ subject: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="authorOptions"
                            id="authorAvailable"
                            value="Available"
                            checked={form.availability === "Available"}
                            onChange={(e) => updateForm({ availability: e.target.value })}
                        />
                        <label htmlFor="authorAvailable" className="form-check-label">Available</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="authorOptions"
                            id="authorUnavailable"
                            value="Unavailable"
                            checked={form.availability === "Unavailable"}
                            onChange={(e) => updateForm({ availability: e.target.value })}
                        />
                        <label htmlFor="authorUnavailable" className="form-check-label">Unavailable</label>
                    </div>
                    
                </div>
                <br />

                <div className="form-group">

                    <Button className="btn--large">
                       Update Book
                    </Button>
                </div>
            </form>
        </div>
    );
}