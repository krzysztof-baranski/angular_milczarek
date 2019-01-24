import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GameComponent } from './game/game.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard, RegisterGuard } from './auth/auth.guard';
import { VideosComponent } from './videos/videos.component';

const appRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    // pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'game',
    component: GameComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'videos',
    component: VideosComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RegisterGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    redirectTo: '',
    // pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    NavbarComponent,
    FooterComponent,
    AboutComponent,
    NotFoundComponent,
    GameComponent,
    LoginComponent,
    RegisterComponent,
    VideosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
