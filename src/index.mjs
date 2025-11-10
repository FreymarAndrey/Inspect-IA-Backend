import envs from './src/config/environments.mjs';
import AppRouter from './src/routes/router.mjs';
import Server from './src/server/server.mjs';

(async () => {
  try {
    main();
  } catch (error) {
    console.error('Error en la inicialización del servidor:', error);
  }
})();

function main() {
  try {
    new Server(envs.PORT, AppRouter.routes).start();
    console.log(`Servidor iniciado en el puerto ${envs.PORT}`);
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
}
