import { useEffect, useState } from "react";
import { getStudents, deleteStudent } from "../services/studentService";

function StudentList({ refresh, onEdit }) {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [courseFilter, setCourseFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const studentsPerPage = 5;

    useEffect(() => {
        loadStudents();
    }, [refresh]);

    const loadStudents = async () => {

        const response = await getStudents();

        setStudents(response.data);
        setCurrentPage(1);
    };

    const handleDelete = async (id) => {

        if (window.confirm("Delete this student?")) {

            await deleteStudent(id);

            loadStudents();
        }
    };

    // Search + course filter
    const filteredStudents = students.filter((student) => {

        const searchText = search.toLowerCase();

        const matchesSearch =
            student.name.toLowerCase().includes(searchText) ||
            student.email.toLowerCase().includes(searchText);

        const matchesCourse =
            courseFilter === "" ||
            student.course.toLowerCase() === courseFilter.toLowerCase();

        return matchesSearch && matchesCourse;
    });

    // Pagination
    const totalPages = Math.ceil(
        filteredStudents.length / studentsPerPage
    );

    const startIndex =
        (currentPage - 1) * studentsPerPage;

    const currentStudents = filteredStudents.slice(
        startIndex,
        startIndex + studentsPerPage
    );

    // Get unique courses
    const courses = [
        ...new Set(students.map((student) => student.course))
    ];

    return (
        <div className="card shadow-sm">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h3 className="mb-0">
                        Student List
                    </h3>

                    <span className="badge bg-secondary">
                        {filteredStudents.length} Students
                    </span>

                </div>

                {/* Search and Filter */}

                <div className="row mb-4">

                    <div className="col-md-8 mb-2">

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />

                    </div>

                    <div className="col-md-4 mb-2">

                        <select
                            className="form-select"
                            value={courseFilter}
                            onChange={(e) => {
                                setCourseFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >

                            <option value="">
                                All Courses
                            </option>

                            {courses.map((course) => (
                                <option
                                    key={course}
                                    value={course}
                                >
                                    {course}
                                </option>
                            ))}

                        </select>

                    </div>

                </div>

                {/* Student Table */}

                <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle">

                        <thead className="table-dark">

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>

                        </thead>

                        <tbody>

                            {currentStudents.length > 0 ? (

                                currentStudents.map((student) => (

                                    <tr key={student.id}>

                                        <td>{student.id}</td>

                                        <td>{student.name}</td>

                                        <td>{student.email}</td>

                                        <td>
                                            <span className="badge bg-info text-dark">
                                                {student.course}
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => onEdit(student)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() =>
                                                    handleDelete(student.id)
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center py-4"
                                    >
                                        No students found.
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

                {/* Pagination */}

                {totalPages > 1 && (

                    <div className="d-flex justify-content-center mt-3">

                        <button
                            className="btn btn-outline-primary me-2"
                            disabled={currentPage === 1}
                            onClick={() =>
                                setCurrentPage(currentPage - 1)
                            }
                        >
                            Previous
                        </button>

                        <span className="btn btn-light">
                            Page {currentPage} of {totalPages}
                        </span>

                        <button
                            className="btn btn-outline-primary ms-2"
                            disabled={currentPage === totalPages}
                            onClick={() =>
                                setCurrentPage(currentPage + 1)
                            }
                        >
                            Next
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}

export default StudentList;