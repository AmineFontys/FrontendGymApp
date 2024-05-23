import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ChatComponent } from './chat/chat.component'
import { TrainerHomepageComponent } from './trainer-homepage/trainer-homepage.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'trainer-homepage', component: TrainerHomepageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
