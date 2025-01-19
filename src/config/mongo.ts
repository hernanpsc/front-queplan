import mongoose from 'mongoose';

async function dbConnect(): Promise<void> {
  // Asegúrate de que la URI de conexión esté definida
  const DB_URI = process.env.DB_URI;
  if (!DB_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);  // Termina la ejecución si no se puede establecer la conexión
  }

  try {
    // Conectar a MongoDB usando Mongoose
    await mongoose.connect(DB_URI);
    console.log('Conexión exitosa a MongoDB usando Mongoose');
  } catch (error) {
    // Manejo de errores de conexión
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Termina el proceso si la conexión falla
  }
}

export default dbConnect;
