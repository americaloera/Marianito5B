/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
  
Route.post('/user/login', 'UsersController.login')
Route.resource('users', 'UsersController').apiOnly()

Route.group(() => { 

Route.get('/categoria', 'UsersController.categoria')


Route.resource('user/actions', 'TokensController')

Route.resource('cargo/actions', 'CargosController')

Route.resource('mesa/actions', 'MesasController')
Route.get('mesa/mongo', 'MesasController.verMongo')

Route.resource('cliente/actions', 'ClientesController')

Route.resource('tipo/actions', 'TipoPlatillosController')

Route.get('platillo/categoria/:id', 'PlatillosController.categoria')
Route.resource('platillo/actions', 'PlatillosController')

Route.resource('reservacion/actions', 'ReservacionsController')
Route.get('reservacion/mongoVer', 'ReservacionsController.verMongo')
Route.delete('reservacion/mongoBorrar/:id', 'ReservacionsController.borrarMongo')
Route.get('reservacion/mesas', 'ReservacionsController.mesasDisponibles')
Route.post('reservacion/mesasDis', 'ReservacionsController.verMesasDisponibles')
Route.post('reservacion/prueba', 'ReservacionsController.prueba')

Route.resource('factura/actions', 'FacturasController')

Route.resource('detalle/actions', 'DetalleFacturasController')

Route.get('admin', 'UsersController.IsAdmin')

}).middleware('auth')

//tqm yo+
//tqm  yo+ uwu

Route.get('/', async () => {
  return { hello: 'worLd' }
})