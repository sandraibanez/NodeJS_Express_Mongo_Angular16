SALEBACK
Bienvenidos a SaleBack.
Un proyecto realizado por el alumno Sandra Soler Ibañez en el 2er curso de DAW en el IES L'estació.

Este proyecto trata sobre una página web de venta de productos de segunda mano, al estilo wallapop,
sobre la cual se pueden realizar distintas funciones.


FUNCIONES
La web contiene un total de 4 secciones.

Home
En la sección del Home, el usuario tiene su primera impresión de la web, el cual puede observar
un carrusel de las categorias que dispone la página, y filtar por ellas los productos.
Además, contiene un infinite scroll de la lista de las categorias de la empresa.
Ambas opciones, tienen un salto al módulo de shop aplicando el filtro de la categoría seleccionada

Carrusel de categorias
Infinite scroll de categorías
Search
El módulo de search, esta presente tanto en el home como en el shop de la aplicación. En él, se puede
buscar el producto deseado por su nombre. Este motor de búsqueda, redirige a la sección del shop,
aplicando el filtro deseado.

Login
La aplicación web, consta también, de un módulo de login donde el usuario puede crear una cuenta, e
iniciar sesión con ella. Consta además, de una sección de perfil, donde el usuario puede ver sus
productos y los productos a los que les ha dado like. También tiene una opción de ajustes, donde puede
puede modificar la información de su perfil.

Register
Login
Profile
Settings
Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay
un usuario conectado.

Shop
Este es el módulo más importante de toda la web, en el se puede ver la lista de productos del que dispone la
web y además se puede filtrar esta lista y la lista se encuentra paginada. También puede entrar en el
producto deseado y ver una lista mas detallada de este, además, el usuario puede añadir algún comentario
al producto y, en caso de que sea suyo, eliminarlo. También hay una opción de marcado de favoritos de
cada producto si el usuario se encuentra logeado.

Lista de productos
Filtros
Detalles del producto
Likes
Paginación
Comentarios

PUESTA EN MARCHA
Es necesario crear el fichero .env en la carpeta de servidor.

Tener instalado las siguientes herramientas:
NodeJS V16.17.0
Angular V13
MongoDB
BACKEND
cd server
npm install
npm run dev
FRONTEND
cd client
npm install
npm start

LIBRERÍAS
Lista de librerías utilizadas en este proyecto:

Toastr
