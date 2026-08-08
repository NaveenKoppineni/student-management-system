import { useEffect, useState } from "react";
import { addStudent, updateStudent } from "../services/studentService";

function AddStudent({ onStudentAdded, selectedStudent }) {

    const [student, setStudent] = useState({
        name: "",
        email: "",
        course: ""
    });

    useEffect(() => {

        if (selectedStudent) {
            setStudent(selectedStudent);
        }

    }, [selectedStudent]);

    const handleChange = (e) => {

        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (student.id) {
            await updateStudent(student.id, student);
        } else {
            await addStudent(student);
        }

        setStudent({
            name: "",
            email: "",
            course: ""
        });

        onStudentAdded();
    };

    return (
        <div className="card shadow-sm mb-4">

            <div className="card-body">

                <h3 className="card-title mb-3">
                    {student.id ? "Update Student" : "Add Student"}
                </h3>

                <form onSubmit={handleSubmit}>

                    <div className="row">

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Name
                            </label>

                            <input
                                className="form-control"
                                type="text"
                                name="name"
                                placeholder="Enter name"
                                value={student.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Email
                            </label>

                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                value={student.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Course
                            </label>

                            <input
                                className="form-control"
                                type="text"
                                name="course"
                                placeholder="Enter course"
                                value={student.course}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {student.id ? "Update Student" : "Add Student"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddStudent;