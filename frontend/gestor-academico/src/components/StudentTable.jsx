const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <div className="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Nombre del Estudiante</th>
            <th>Nota</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td data-label="Estudiante">{student.fullName}</td>
              <td data-label="Nota">{student.grade}</td>
              <td data-label="Acciones">
                <button className="btn-edit" onClick={() => onEdit(student)}>Editar</button>
                <button className="btn-delete" onClick={() => onDelete(student.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default StudentTable;