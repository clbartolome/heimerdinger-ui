import { Component, Inject, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Login } from 'src/app/model/login';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from "@angular/router";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.removeItem('jwt');
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.value.username != "" && this.loginForm.value.password != "") {
      let login: Login = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      }
      this.apiService.login(login).subscribe(
        (res) => {
          console.log('Logged in!')
          localStorage.setItem('jwt', res.token );
          this.router.navigateByUrl('/servers-list');
        }, (error) => {
          console.log(error);
          this.openLoginError();
        });
    }
  }

  openLoginError() {
    this.dialog.open(ErrorDialog);
  }
}

@Component({
  selector: 'error-dialog',
  templateUrl: 'error-dialog.html',
})
export class ErrorDialog {
  constructor() { }
}

