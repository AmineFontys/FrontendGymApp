import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChatComponent } from './chat/chat.component'
import { ChatService } from '../services/ChatService'
import { NavbarComponent } from "./navbar/navbar.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateTrainerComponent } from './create-trainer/create-trainer.component';
import { MatMenuModule } from '@angular/material/menu';
import { CreateTrainingComponent } from './create-training/create-training.component';


@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        NavbarComponent,
        CreateTrainerComponent,
        CreateTrainingComponent

    ],
    providers: [ChatService],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatMenuModule

    ]
})
export class AppModule { }
