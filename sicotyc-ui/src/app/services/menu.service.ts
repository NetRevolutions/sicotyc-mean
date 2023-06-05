import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  // Por ahora es fijo, luego vendra de BD de manera dinamica
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'nav-icon fas fa-tachometer-alt',
      submenu: [
        { title: 'Home', icon: 'far fa-circle nav-icon', url: '/dashboard'}
      ]
    },
    {
      title: 'Operaciones',
      icon: 'nav-icon fas fa-solid fa-wrench',
      submenu: [
        { title: 'Calculo de Tarifas Lima y Callao', icon: '', url: '/calculo-tarifas/lima-callao'},
        { title: 'Calculo de Tarifas Provincia', icon: '', url: '/calculo-tarifas/provincia'},
        { title: 'Solicitud de Serv. - Evaluacion', icon: '', url: '/'}
      ]
    },
    {
      title: 'Ordenes de Trabajo',
      icon: 'nav-icon fas fa-regular fa-note',
      submenu: [
        {title: 'Creacion de Ordenes de Trabajo', icon: '', url: '/'},
        {title: 'Control de Documentos', icon: '', url: '/'},
        {title: 'Estado Ordenes de Trabajo', icon: '', url: '/'}
      ]
    },
    {
      title: 'Administracion',
      icon: 'nav-icon fas fa-solid fa-screwdriver-wrench',
      submenu: [
        {title: 'Cuentas de Usuario', icon: '', url: '/'},
        {title: 'Roles', icon: '', url: '/'},
        {title: 'Lookup', icon: '', url: '/'},
        {title: 'Menu', icon: '', url: '/'},
      ]
    },
    {
      title: 'Mantenimientos',
      icon: 'nav-icon fas fa-duotone fa-gear',
      submenu: [
        {title: 'Choferes', icon: '', url: '/'},
        {title: 'Camiones', icon: '', url: '/'},
        {title: 'Complementos', icon: '', url: '/'},
        {title: 'Transportistas', icon: '', url: '/'},
        {title: 'Almacenes', icon: '', url: '/'},
        {title: 'Zonas', icon: '', url: '/'},
        {title: 'Agencias y/o Clientes', icon: '', url: '/'},
        {title: 'Tarifas x Distrito x Zona', icon: '', url: '/'},
        {title: 'Tarifas x Agencia', icon: '', url: '/'},
        {title: 'Peajes', icon: '', url: '/'}
      ]
    }
  ]

  constructor() { }
}
