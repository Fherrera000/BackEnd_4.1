const models = require('../models');

const profesoresController = {
    async getAllProfesores(req, res) {
        try {
            const profesores = await models.Profesor.findAll();
            res.status(200).json(profesores);
        } catch (error) {
            console.error('Error fetching professors:', error);
            res.status(500).json({ error: 'Error fetching professors' });
        }
    },

    async getProfesor(req, res) {
        const { noEmpleado } = req.params;
        try {
            const profesor = await models.Profesor.findOne({ where: { noEmpleado } });
            if (!profesor) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.status(200).json(profesor);
        } catch (error) {
            console.error('Error fetching professor:', error);
            res.status(500).json({ error: 'Error fetching professor' });
        }
    },


    async createProfesor(req, res) {
        const { nombre, noEmpleado } = req.body;
        try {
            const newProfesor = await models.Profesor.create({ nombre, noEmpleado });
            res.status(201).json(newProfesor);
        } catch (error) {
            console.error('Error creating professor:', error);
            res.status(500).json({ error: 'Error creating professor' });
        }
    },

    async updateProfesor(req, res) {
        const { noEmpleado } = req.params;
        const { nombre } = req.body;
        try {
            const [updated] = await models.Profesor.update(
                { nombre },
                { where: { noEmpleado } }
            );
            if (!updated) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            const updatedProfesor = await models.Profesor.findOne({ where: { noEmpleado } });
            res.status(200).json(updatedProfesor);
        } catch (error) {
            console.error('Error updating professor:', error);
            res.status(500).json({ error: 'Error updating professor' });
        }
    },

    async deleteProfesor(req, res) {
        const { noEmpleado } = req.params;
        try {
            const deleted = await models.Profesor.destroy({
                where: { noEmpleado }
            });
            if (!deleted) {
                return res.status(404).json({ error: 'Professor not found' });
            }
            res.status(204).send(); // No content
        } catch (error) {
            console.error('Error deleting professor:', error);
            res.status(500).json({ error: 'Error deleting professor' });
        }
    },

    async enrollProfesores(req, res) {
        const { noEmpleado } = req.params;
        const { clave } = req.body;

        try {
            const profesor = await models.Profesor.findOne({ where: { noEmpleado } });
            if (!profesor) {
                return res.status(404).json({ error: 'Professor not found' });
            }

            console.log('Looking for course with clave:', clave);
            const curso = await models.Curso.findOne({ where: { clave } });
            if (!curso) {
                return res.status(404).json({ error: 'Course not found' });
            }

            await profesor.addCurso(curso);

            res.status(200).json({ message: 'Professor enrolled in course successfully', profesorId: noEmpleado, clave });
        } catch (error) {
            console.error('Error enrolling professor in course:', error);
            res.status(500).json({ error: 'Error enrolling professor in course' });
        }
    },

    async disenrollProfesores(req, res) {
        const { noEmpleado } = req.params;
        const { clave } = req.body;

        try {
            const profesor = await models.Profesor.findOne({ where: { noEmpleado } });
            if (!profesor) {
                return res.status(404).json({ error: 'Professor not found' });
            }

            const curso = await models.Curso.findOne({ where: { clave } });
            if (!curso) {
                return res.status(404).json({ error: 'Course not found' });
            }

            await profesor.removeCurso(curso);

            res.status(200).json({ message: 'Professor disenrolled from course successfully', profesorId: noEmpleado, clave });
        } catch (error) {
            console.error('Error disenrolling professor from course:', error);
            res.status(500).json({ error: 'Error disenrolling professor from course' });
        }
    },

    async cursosInscritosProfesores(req, res) {
        const { noEmpleado } = req.params;
    
        if (!noEmpleado) {
            return res.status(400).json({ error: 'Número de empleado es requerido.' });
        }
    
        try {
            
            const profesor = await models.Profesor.findOne({
                where: { noEmpleado },
                include: [{
                    model: models.Curso,
                    through: { attributes: [] } 
                }]
            });
    
            if (!profesor) {
                return res.status(404).json({ error: 'Profesor no encontrado.' });
            }
    
            
            res.status(200).json(profesor.Cursos);
        } catch (error) {
            console.error('Error recuperando cursos del profesor', error);
            res.status(500).json({ error: 'Error interno al recuperar cursos del profesor.' });
        }
    },

    async getEstudiantesProfesor(req, res) {
        const { noEmpleado } = req.params;

        try {
          const profesor = await models.Profesor.findOne({
              where: { noEmpleado },
              include: [{
                  model: models.Curso,
                  include: [{
                      model: models.Estudiante,
                      through: { attributes: [] }
                  }]
              }]
          });

          if (!profesor) {
              return res.status(404).json({ error: 'Professor not found' });
          }

          const estudiantes = profesor.Cursos.flatMap(curso => curso.Estudiantes);


          res.status(200).json(estudiantes);
      } catch (error) {
          console.error('Error al obtener estudiantes del profesor:', error);
          res.status(500).json({ error: 'Internal server error' });
      }
  }
};

module.exports = profesoresController;