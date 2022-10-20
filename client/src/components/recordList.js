import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./recordList.css";



const Record = (props) => (

  <tr>
    <td className="book-title">{props.record.name}</td>
    <td>{props.record.author}</td>
    <td>{props.record.subject}</td>
    <td className={(props.record.availability === 'Available') ? 'available' : 'unavailable'}>{props.record.availability}</td>

    <td>
      <Link className="btn btn-link edit-btn" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      
      <button
        className="btn btn-link del-btn"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 className="title book-list-title">Book List</h3>
      <div className="table-responsive">
        <table className="table table-hover" cellspacing="0">
          <thead >
            <tr className="table-title">
              <th >Title</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{recordList()}</tbody>
        </table>
      </div>
    </div>
  );
}
