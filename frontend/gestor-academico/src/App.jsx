import { useState, useEffect } from 'react';
import studentService from './services/studentService';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import Modal from './components/Modal';
import './styles/App.css';

function App() {
  const [students, setStudents] = useState([]);
  
  // Estados para Modales
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);
  const [idToDelete, setIdToDelete] = useState(null);

  useEffect(()=>{
    const loadStudents = async () =>{
      try {
        const data = await studentService.getAll();
        setStudents(data);
      } catch (error) {
        alert("Error al cargar los estudiantes desde el servidor.");
        
      }
    };
    loadStudents();
  }, []);

  const handleSave = async (student) => {
    try {
      if (student.id) {
      const updatedStudent = await studentService.update(student.id, student);
      setStudents(students.map(s => s.id === student.id ? updatedStudent : s));
    } else {
      const newStudent = await studentService.create(student);
      setStudents([...students, newStudent]);
    }

    setIsFormOpen(false);
  
    } catch (error) {
      alert("No se pudo procesar la operanción de guardado");
    }
     
  };

  const confirmDelete = (id) => {
    setIdToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await studentService.delete(idToDelete);
      setStudents(students.filter(s => s.id !== idToDelete));
      setIsConfirmOpen(false);
      setIdToDelete(null);
    } catch (error) {
      alert("Hubo un problema para eliminar el registro");
      
    }
    
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Perfil Académico</h1>
        <button className="btn-add" onClick={() => { setStudentToEdit(null); setIsFormOpen(true); }}>
          + Agregar
        </button>
      </header>

      <StudentTable 
        students={students} 
        onDelete={confirmDelete} // Ahora abre el modal de confirmación
        onEdit={(s) => { setStudentToEdit(s); setIsFormOpen(true); }} 
      />

      {/* MODAL PARA FORMULARIO (CREAR/EDITAR) */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title={studentToEdit ? "Editar Estudiante" : "Nuevo Registro"}
      >
        <StudentForm onSave={handleSave} studentToEdit={studentToEdit} />
      </Modal>

      {/* MODAL PARA ELIMINAR */}
      <Modal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)}
        title="Confirmar Eliminación"
      >
        <p>¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.</p>
        <div className="confirm-actions">
          <button className="btn-cancel" onClick={() => setIsConfirmOpen(false)}>Cancelar</button>
          <button className="btn-confirm-delete" onClick={handleDelete}>Eliminar</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;