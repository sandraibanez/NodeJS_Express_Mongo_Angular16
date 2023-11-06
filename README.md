# Introducción

SaleBack es una página web de venta de productos de segunda mano, al estilo wallapop.

# Funciones

La web contiene un total de 4 secciones:

* Home
* Search
* Login
* Shop

# Home

En la sección del Home, el usuario puede:

* Ver un carrusel de las categorías que dispone la página.
* Filtrar los productos por categoría.
* Ver un infinite scroll de la lista de las categorías de la empresa.

# Search

El módulo de search, esta presente tanto en el home como en el shop de la aplicación. En él, se puede
buscar el producto deseado por su nombre. Este motor de búsqueda, redirige a la sección del shop,
aplicando el filtro deseado.

# Login

La aplicación web, consta también, de un módulo de login donde el usuario puede crear una cuenta, e
iniciar sesión con ella. Consta además, de una sección de perfil, donde el usuario puede ver sus
productos y los productos a los que les ha dado like. También tiene una opción de ajustes, donde puede
puede modificar la información de su perfil.

* Register
* Login
* Profile
* Settings

Además el login tiene un token mediante JWT en el que va verificando durante el uso de la web si hay
un usuario conectado.

# Shop

Este es el módulo más importante de toda la web, en el se puede ver la lista de productos del que dispone la
web y además se puede filtrar esta lista y la lista se encuentra paginada. También puede entrar en el
producto deseado y ver una lista mas detallada de este, además, el usuario puede añadir algún comentario
al producto y, en caso de que sea suyo, eliminarlo. También hay una opción de marcado de favoritos de
cada producto si el usuario se encuentra logeado.
Si el usuario que esta logeado no es el que ha creado el producto solo podra darle like al producto, seguir 
al usuario que lo ha creado o visitar su profile.
Si el usuario que esta logeado es el que ha creado el producto podra eliminarlo y editarlo.
Solo se podra entrar al details de un producto si el usuario esta logeado.

* Lista de productos
* Filtros
* Likes
* Seguir a un usuario
* Paginación
* Comentarios
* Detalles del producto


# PUESTA EN MARCHA
Es necesario crear el fichero .env en la carpeta de servidor.

Tener instalado las siguientes herramientas:

* NodeJS V16.17.0
* Angular V13
* MongoDB

# BACKEND
* cd server
* npm install
* npm run dev
# FRONTEND
* cd client
* npm install
* npm start

# LIBRERÍAS
Lista de librerías utilizadas en este proyecto:

* [Toastr](https://codeseven.github.io/toastr/)
* [bootstrap](https://getbootstrap.com/)
