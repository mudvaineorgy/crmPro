import { RouterModule, Routes } from '@angular/router';

import { Grafica1Component } from './grafica1/grafica1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

// Guards
import { LoginGuardGuard } from '../services/service.index';
import { AdminGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteComponent } from './clientes/cliente.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';
import { EstadosComponent } from './estados/estados.component';

const pagesRoutes: Routes = [
            {
                path: 'dashboard',
                component: DashboardComponent,
                canActivate: [VerificaTokenGuard],
                data: { titulo: 'Dashboard' } },

            { path: 'progress', component: ProgressComponent, data: { titulo: 'Barras de Progreso' }  },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas' }  },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' }  },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajuste de tema' }  },
            { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario' }  },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador General' }  },

            // Mantenimientos
            { path: 'usuarios',
             component: UsuariosComponent,
             canActivate: [ AdminGuard],
             data: { titulo: 'Mantenimiento de usuarios' }  },

            { path: 'servicios', component: ServiciosComponent, data: { titulo: 'Servicios' }  },
            { path: 'clientes', component: ClientesComponent, data: { titulo: 'Mantenimiento de Clientes' }  },
            { path: 'cliente/:id', component: ClienteComponent, data: { titulo: 'Actualizar cliente' }  },
            { path: 'estados', component: EstadosComponent, data: { titulo: 'Estados' }  },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );