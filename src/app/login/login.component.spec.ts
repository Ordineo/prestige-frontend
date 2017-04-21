/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {LoginComponent} from './login.component';

describe('LoginComponent', () => {
  /*let component: LoginComponent;
   let fixture: ComponentFixture<LoginComponent>;

   beforeEach(async(() => {
   TestBed.configureTestingModule({
   declarations: [ LoginComponent ]
   })
   .compileComponents();
   }));

   beforeEach(() => {
   fixture = TestBed.createComponent(LoginComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
   });*/

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  let loginComponent;

  beforeEach(() => {
    const mockFormBuilder = jasmine.createSpyObj('mockFormBuilder', ['group']);
    mockFormBuilder.group.and.returnValue(true);

    const mockAccountService = jasmine.createSpyObj('mockAccountService', ['login']);
    mockAccountService.login.and.returnValue(true);

    const mockRouter = jasmine.createSpyObj('mockRouter', ['navigate']);
    mockRouter.navigate.and.returnValue(true);

    loginComponent = new LoginComponent(mockFormBuilder, mockAccountService, mockRouter);
  });

  it('Should be true when you have enter a valid emailaddress', () => {
    expect(loginComponent.validateEmail('ines.vanstappen@ordina.be')).toBeTruthy();
  });

  it('Should be false when you have enter a valid emailaddress', () => {
    expect(loginComponent.validateEmail('ines.vanstappen@ordinabe')).toBeFalsy();
  });

  it('Should be false when you have enter a valid emailaddress', () => {
    expect(loginComponent.emailCheck('inesvanstappen')).toBe(undefined);
  });

  it('Should give an error when you enter emailaddress with less then 6 characters', () => {
    loginComponent.emailCheck('i@oe');
    expect(loginComponent.errors.email).toBe('Email should have at least 6 characters!');
  });

  it('Should be false when you have enter a valid emailaddress', () => {
    loginComponent.emailCheck('ines.vanstappen@ordinabe');
    expect(loginComponent.errors.email).toBe('Email is invalid!');
  });
});
