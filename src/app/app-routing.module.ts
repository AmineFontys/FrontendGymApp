import { NgModule } from '@angular/core'
import { RouterModule, type Routes } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ChatComponent } from './chat/chat.component'
import { TrainerHomepageComponent } from './trainer-homepage/trainer-homepage.component'
import { TrainingsComponent } from './trainings/trainings.component'
import { TrainerComponent } from './trainer/trainer.component'
import { PersonelManagementComponent } from './personel-management/personel-management.component'
import { CreateTrainerComponent } from './create-trainer/create-trainer.component'
import { CreateTrainingComponent } from './create-training/create-training.component'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'chat', component: ChatComponent },
  { path: 'trainer-homepage', component: TrainerHomepageComponent },
  { path: 'trainings', component: TrainingsComponent },
  { path: 'trainer', component: TrainerComponent },
  { path: 'personel-management', component: PersonelManagementComponent },
  { path: 'create-trainer', component: CreateTrainerComponent },
  { path: 'create-training', component: CreateTrainingComponent }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
