const { Estudiante, Curso, Profesor, ProfesorCurso } = require('./models');

const inscribirEstudiante = async (estudianteId, cursoId, calificacion) => {
  try {
    const estudiante = await Estudiante.findByPk(estudianteId);
    const curso = await Curso.findByPk(cursoId);

    if (estudiante && curso) {
      await estudiante.addCurso(curso, { through: { calificacion } });
      console.log("Estudiante inscrito correctamente");
    } else {
      console.log("Estudiante o curso no encontrado");
    }
  } catch (error) {
    console.error("Error al inscribir al estudiante:", error);
  }
};

const inscribirProfesor = async (profesorId, cursoId) => {
  try {
    const profesor = await Profesor.findByPk(profesorId);
    const curso = await Curso.findByPk(cursoId);

    if (profesor && curso) {
      await ProfesorCurso.create({
        ProfId: profesor.id,
        CursoId: curso.id,
      });
      console.log("Profesor inscrito correctamente");
    } else {
      console.log("Profesor o curso no encontrado");
    }
  } catch (error) {
    console.error("Error al inscribir al profesor:", error);
  }
};

(async () => {
  await inscribirEstudiante(1, 1, 90); 
  await inscribirProfesor(1, 1);
})();