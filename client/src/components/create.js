import React, { useState } from "react";
import { useNavigate } from "react-router";

import "./create.css"
import {Button} from "./Button"

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        author: "",
        availability: "",
        subject: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newPerson = { ...form };

        await fetch("http://localhost:5000/record/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setForm({ name: "", author: "", availability: "", subject:"" });
        navigate("/records");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div className="enableScroll">
            <h2 className="title">Add New Book</h2>
            
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group ">
                    <label className="label booktitle" htmlFor="name">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Eg. How To Eat Sushi"
                        value={form.name}
                        required
                        onChange={(e) => updateForm({ name: e.target.value })}
                    />
                </div>
                <div className="form-group author">
                    <label className="label" htmlFor="author">Author</label>
                    <input
                        type="text"
                        className="form-control"
                        id="author"
                        placeholder="Eg. Ricky Gervais"
                        value={form.author}
                        onChange={(e) => updateForm({ author: e.target.value })}
                    />
                </div>
                <div className="form-group subject">
                    <label className="label" htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        id="subject"
                        placeholder="Eg. Engineering, Science, Mathematics..."
                        value={form.subject}
                        onChange={(e) => updateForm({ subject: e.target.value })}
                    />
                </div>
                <div className="form-group availability">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="authorOptions"
                            id="authorAvailable"
                            value="Available"
                            required
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
                <div className="form-group">
                    <Button className="btn--large">
                        Add Book
                    </Button>
                </div>
            </form>
        </div>
    );
}