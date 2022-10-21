import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import "./details.css";
import { Button } from "./Button"

export default function Details() {
    const [form, setForm] = useState({
        name: "",
        author: "",
        availability: "",
        subject: "",
        description:"",
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
            description: form.description,
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



            <h1 className="title details-title">{form.name}</h1>
            <div className="author1">Written By: {form.author}</div>
            <div className="subject1">Subject: {form.subject}</div>
            <div className="row text-center">
                <div className={(form.availability === 'Available') ? 'details-available mr-auto ml-auto text-center' : 'details-unavailable mr-auto ml-auto text-center'}>{form.availability}</div>
            </div>
            


            <div className="description-title">Description</div>

            <div className="row " >
                <div className="col-md-1 offset-3 description1 "> {form.description}</div>


            </div>







        </div>
    );
}