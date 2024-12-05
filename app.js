const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const models = require('./models/index.js'); 
const routes = require('../Meta 3.3/routes'); 

const app = express();


const options = {
  key: fs.readFileSync('key.pem'), 
  cert: fs.readFileSync('cert.pem') 
};

const server = https.createServer(options, app);

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(routes);



const crearRelacionProfesorCurso = async (modeloProfesor, idProf, modeloCurso, idCurso) => {
    try {
        const primario = await modeloProfesor.findByPk(idProf); // Use modeloProfesor here
        const secundario = await modeloCurso.findByPk(idCurso);

        if (!primario || !secundario) {
            throw new Error(`${modeloProfesor.name} o ${modeloCurso.name} no encontrado.`);
        }

        await primario[`add${modeloCurso.name}`](secundario); // No need for calif here
        return { success: true, message: 'Relación creada exitosamente.' };
    } catch (error) {
        console.error('Error al crear la relación:', error);
        return { success: false, error: 'Error al crear la relación.' };
    }
};


app.post('/enrollEstudiante', async (req, res) => {
  const { estudianteId, cursoId, calificacion } = req.body;
  const result = await crearRelacionEstudianteCurso(models.Estudiante, estudianteId, models.Curso, cursoId, { calificacion });
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(500).json(result);
  }
});

app.post('/enrollProfesor', async (req, res) => {
    const { idProf, cursoId } = req.body; 
    const result = await crearRelacionProfesorCurso(models.Profesor, idProf, models.Curso, cursoId); 

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(500).json(result);
    }
});

// Ruta de prueba
app.get('/estudiantes', (req, res) => {
  res.send('Hola mundo');
});








// Iniciar el servidor
const port = 4000;
server.listen(port, () => {
  console.log(`Servidor corriendo en https://localhost:${port}`);
});