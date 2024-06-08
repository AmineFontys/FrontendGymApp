import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { ChatService } from '../services/chatservice';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let myServiceMock: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    myServiceMock = jasmine.createSpyObj('MyService', ['sendMessage', 'getData']);
    myServiceMock.getData.and.returnValue(of('')); // Mock the getData method to return an empty string observable

    await TestBed.configureTestingModule({
      declarations: [ChatComponent],
      imports: [FormsModule], // Import FormsModule for ngModel binding
      providers: [
        { provide: ChatService, useValue: myServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore any unrecognized elements and attributes
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call sendMessage method of the service', () => {
    // Arrange
    const testMessage = 'Hello World';
    component.messageText = testMessage;

    // Act
    component.sendMessage();

    // Assert
    expect(myServiceMock.sendMessage).toHaveBeenCalledWith(testMessage);
  });
});
