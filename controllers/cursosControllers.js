const models = require('../models'); 

const cursosController = {
    async getAllCursos(req, res) {
        try {
            const cursos = await models.Curso.findAll();
            res.status(200).json(cursos);
        } catch (error) {
            console.error('error recuperando cursos', error);
            res.status(500).json({ error: 'error recuperando cursos' });
        }
    },

    async getCurso(req, res) {
        const { clave } = req.params; 
        try {
            const curso = await models.Curso.findOne({ where: { clave } }); 
            if (!curso) {
                return res.status(404).json({ error: 'curso no encontrado' });
            }
            res.status(200).json(curso);
        } catch (error) {
            console.error('curso no encontrado', error);
            res.status(500).json({ error: 'curso no encontrado' });
        }
    },

    async createCurso(req, res) {
        const { nombre, clave, creditos } = req.body; 
        try {
            const newCurso = await models.Curso.create({ nombre, clave, creditos });
            res.status(201).json(newCurso);
        } catch (error) {
            console.error('error creando curso', error);
            res.status(500).json({ error: 'Eerror creando curso' });
        }
    },

    async updateCurso(req, res) {
        const { clave } = req.params; 
        const { nombre, creditos } = req.body; 
        try {
            const [updated] = await models.Curso.update(
                { nombre, creditos }, 
                { where: { clave } } 
            );
            if (!updated) {
                return res.status(404).json({ error: 'curso no encontrado' });
            }
            const updatedCurso = await models.Curso.findOne({ where: { clave } }); 
            res.status(200).json(updatedCurso);
        } catch (error) {
            console.error('error acualizando curso', error);
            res.status(500).json({ error: 'error acualizando curso' });
        }
    },

    async deleteCurso(req, res) {
        const { clave } = req.params; 
        try {
            const deleted = await models.Curso.destroy({
                where: { clave } 
            });
            if (!deleted) {
                return res.status(404).json({ error: 'Curso no encontrado' });
            }
            res.status(204).send(); 
        } catch (error) {
            console.error('Error borrando curso', error);
            res.status(500).json({ error: 'Error borrando curso' });
        }
    },
};

module.exports = cursosController;
