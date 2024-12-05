const models = require('../models'); 

const estudiantesController = {
    async getAllEstudiantes(req, res) {
        try {
            const estudiantes = await models.Estudiante.findAll();
            res.status(200).json(estudiantes);
        } catch (error) {
            console.error('Error obteniendo estudiantes:', error);
            res.status(500).json({ error: 'Error al obtener estudiantes.' });
        }
    },

    async getEstudiante(req, res) {
        const { matricula } = req.params;
        try {
            const estudiante = await models.Estudiante.findOne({ where: { matricula } });
            if (!estudiante) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }
            res.status(200).json(estudiante);
        } catch (error) {
            console.error('Error obteniendo estudiante:', error);
            res.status(500).json({ error: 'Error al obtener estudiante.' });
        }
    },

    async createEstudiante(req, res) {
        try {
            const { nombre, matricula, semestreIngreso, creditosCursados } = req.body;

            if (!nombre || !matricula || !semestreIngreso || creditosCursados == null) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }

            if (isNaN(creditosCursados)) {
                return res.status(400).json({ error: 'El campo creditosCursados debe ser un número.' });
            }

            const nuevoEstudiante = await models.Estudiante.create({ 
                nombre, 
                matricula, 
                semestreIngreso, 
                creditosCursados 
            });

            res.status(201).json(nuevoEstudiante);
        } catch (error) {
            console.error('Error al crear estudiante:', error);
            res.status(500).json({ error: 'Error al crear estudiante.' });
        }
    },

    async updateEstudiante(req, res) {
        const { matricula } = req.params;
        const { nombre, apellido, email } = req.body; 
        try {
            const [updated] = await models.Estudiante.update(
                { nombre, apellido, email },
                { where: { matricula } }
            );
            if (!updated) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }
            const updatedEstudiante = await models.Estudiante.findOne({ where: { matricula } });
            res.status(200).json(updatedEstudiante);
        } catch (error) {
            console.error('Error actualizando estudiante:', error);
            res.status(500).json({ error: 'Error actualizando estudiante.' });
        }
    },

    async deleteEstudiante(req, res) {
        const { matricula } = req.params;
        try {
            const deleted = await models.Estudiante.destroy({ where: { matricula } });
            if (!deleted) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error borrando estudiante:', error);
            res.status(500).json({ error: 'Error borrando estudiante.' });
        }
    },

    async enrollEstudiante(req, res) {
        const { matricula } = req.params;
        const { clave, calificacion } = req.body;
        try {
            const estudiante = await models.Estudiante.findOne({ where: { matricula } });
            if (!estudiante) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }

            const curso = await models.Curso.findOne({ where: { clave } });
            if (!curso) {
                return res.status(404).json({ error: 'Curso no encontrado.' });
            }

            await estudiante.addCurso(curso, { through: { calificacion } });
            res.status(200).json({ message: 'Estudiante inscrito en el curso exitosamente.' });
        } catch (error) {
            console.error('Error inscribiendo estudiante en curso:', error);
            res.status(500).json({ error: 'Error inscribiendo estudiante en curso.' });
        }
    },

    async disenrollEstudiante(req, res) {
        const { matricula } = req.params;
        const { clave } = req.body;
        try {
            const estudiante = await models.Estudiante.findOne({ where: { matricula } });
            if (!estudiante) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }

            const curso = await models.Curso.findOne({ where: { clave } });
            if (!curso) {
                return res.status(404).json({ error: 'Curso no encontrado.' });
            }

            await estudiante.removeCurso(curso);
            res.status(200).json({ message: 'Estudiante desinscrito del curso exitosamente.' });
        } catch (error) {
            console.error('Error desinscribiendo estudiante del curso:', error);
            res.status(500).json({ error: 'Error desinscribiendo estudiante del curso.' });
        }
    },

    async cursosInscritosEstudiantes(req, res) {
        const { matricula } = req.params;
        try {
            const estudiante = await models.Estudiante.findOne({
                where: { matricula },
                include: [{
                    model: models.Curso,
                    through: { attributes: ['calificacion'] }
                }]
            });

            if (!estudiante) {
                return res.status(404).json({ error: 'Estudiante no encontrado.' });
            }

            const cursosInscritos = estudiante.Cursos.map(curso => ({
                nombre: curso.nombre,
                clave: curso.clave,
                calificacion: curso.EstudianteCurso.calificacion
            }));

            res.status(200).json({ matricula: estudiante.matricula, cursosInscritos });
        } catch (error) {
            console.error('Error obteniendo cursos inscritos:', error);
            res.status(500).json({ error: 'Error obteniendo cursos inscritos.' });
        }
    },

    async getEstudiantesProfesor(req, res) {
    const { matricula } = req.params;
    if (!matricula) {
        return res.status(400).json({ error: 'Matrícula es requerida.' });
    }
    try {
        const estudiante = await models.Estudiante.findOne({
            where: { matricula },
            include: {
                model: models.Curso,
                include: {
                    model: models.Profesor, // Eliminar apellido de la consulta
                    through: { attributes: [] }  // Esto asegura que solo los campos relevantes se incluyan
                }
            }
        });

        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado.' });
        }

        // Obtener los profesores asociados al estudiante
        const profesores = estudiante.Cursos.flatMap(curso => curso.Profesors);
        const profesoresUnicos = Array.from(new Set(profesores.map(p => p.noEmpleado)))
                                      .map(noEmpleado => profesores.find(p => p.noEmpleado === noEmpleado));

        res.status(200).json(profesoresUnicos);
    } catch (error) {
        console.error('Error obteniendo profesores del estudiante:', error);
        res.status(500).json({ error: 'Error interno del servidor.' });
    }
}
};

module.exports = estudiantesController;