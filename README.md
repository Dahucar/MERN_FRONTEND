# practica MERN
# Crear la imagen.
docker build -t myapp/react-app .
# Ejecutar la imagen.
docker run -d -it -p 80:80/tcp --name react-app-my myapp/react-app