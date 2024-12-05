const express = require('express');
const router = express.Router();
const estudiantesController = require('./controllers/estudiantesControllers.js'); 
const profesoresController = require('./controllers/profesoresControllers.js');
const cursosController = require('./controllers/cursosControllers.js'); 


// Rutas CRUD para estudiantes
router.get('/estudiantes', estudiantesController.getAllEstudiantes); // Obtener todos los estudiantes
router.get('/estudiantes/:matricula', estudiantesController.getEstudiante); // Obtener un estudiante por matrícula
router.post('/estudiantes', estudiantesController.createEstudiante); // Crear un nuevo estudiante
router.put('/estudiantes/:matricula', estudiantesController.updateEstudiante); // Actualizar un estudiante existente por matrícula
router.delete('/estudiantes/:matricula', estudiantesController.deleteEstudiante); // Eliminar un estudiante por matrícula
router.patch('/estudiantes/:matricula/enroll', estudiantesController.enrollEstudiante); // Inscribir a un estudiante en un curso
router.patch('/estudiantes/:matricula/disenroll', estudiantesController.disenrollEstudiante); // Desinscribir a un estudiante de un curso
router.get('/estudiantes/:matricula/cursos', estudiantesController.cursosInscritosEstudiantes); // Obtener cursos inscritos por matrícula
router.get('/estudiantes/:matricula/profesores', estudiantesController.getEstudiantesProfesor); // Obtener profesores asociados a un estudiante por matrícula



router.get('/profesores', profesoresController.getAllProfesores); // Obtener todos los profesores
router.get('/profesores/:noEmpleado', profesoresController.getProfesor); // Obtener un profesor por noEmpleado
router.post('/profesores', profesoresController.createProfesor); // Crear un nuevo profesor
router.put('/profesores/:noEmpleado', profesoresController.updateProfesor); // Actualizar un profesor existente por noEmpleado
router.delete('/profesores/:noEmpleado', profesoresController.deleteProfesor); // Eliminar un profesor por noEmpleado
router.patch('/profesores/:noEmpleado/enroll', profesoresController.enrollProfesores); // Inscribir a un profesor en un curso
router.patch('/profesores/:noEmpleado/disenroll', profesoresController.disenrollProfesores); // Desinscribir a un profesor de un curso
router.get('/profesores/:noEmpleado/cursos', profesoresController.cursosInscritosProfesores); // Obtener cursos asociados a un profesor
router.get('/profesores/:noEmpleado/estudiantes', profesoresController.getEstudiantesProfesor); // Obtener estudiantes asociados a un profesor

// Rutas CRUD para cursos
router.get('/cursos', cursosController.getAllCursos); // Obtener todos los cursos
router.get('/cursos/:id', cursosController.getCurso); // Obtener un curso por ID
router.post('/cursos', cursosController.createCurso); // Crear un nuevo curso
router.put('/cursos/:id', cursosController.updateCurso); // Actualizar un curso existente
router.delete('/cursos/:id', cursosController.deleteCurso); // Eliminar un curso

module.exports = router; 