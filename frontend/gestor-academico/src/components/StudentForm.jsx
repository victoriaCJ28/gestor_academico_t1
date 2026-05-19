import { useState, useEffect } from 'react';

function StudentForm({ onSave, studentToEdit }) {
  const [form, setForm] = useState({ fullName: '', grade: '' });

  useEffect(() => {
    if (studentToEdit) setForm(studentToEdit);
    else setForm({ fullName: '', grade: '' });
  }, [studentToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <label>Nombre del Estudiante</label>
      <input 
        type="text" 
        placeholder="Ej. Juan Pérez"
        value={form.fullName}
        onChange={(e) => setForm({...form, fullName: e.target.value})}
        required
      />
      <label>Nota Final</label>
      <input 
        type="number" 
        step="0.1" 
        min="0" max="10"
        placeholder="0.0"
        value={form.grade}
        onChange={(e) => setForm({...form, grade: e.target.value})}
        required
      />
      <button type="submit" className="btn-save">
        {studentToEdit ? 'Actualizar Datos' : 'Guardar en Sistema'}
      </button>
    </form>
  );
}
export default StudentForm;