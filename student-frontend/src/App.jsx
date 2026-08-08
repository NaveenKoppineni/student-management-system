import { useState } from "react";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";

function App() {

    const [refresh, setRefresh] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const refreshStudents = () => {
        setRefresh(!refresh);
        setSelectedStudent(null);
    };

    return (
        <div className="container py-4">

            <h1 className="text-center mb-4">
                Student Management System
            </h1>

            <AddStudent
                onStudentAdded={refreshStudents}
                selectedStudent={selectedStudent}
            />

            <StudentList
                refresh={refresh}
                onEdit={setSelectedStudent}
            />

        </div>
    );
}

export default App;