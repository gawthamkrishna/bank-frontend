import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options = {
  headers: new HttpHeaders()
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // register
  register(uname: any, acno: any, pswd: any) {
    const body = {
      uname, acno, pswd
    }
    // server call to register an account  and return response to register component 
    return this.http.post('http://localhost:3000/register', body)
  }
  login(acno: any, pswd: any) {
    const body = {
      acno, pswd
    }
    // server call to login an account  and return response to register component 
    return this.http.post('http://localhost:3000/login', body)
  }

  // append token to the http header
  appendToken() {

    // fetch token from local storage
    const token = localStorage.getItem("token") || ""
    // create http header
    let headers = new HttpHeaders()
    if (token) {
      // append token inside header
      headers = headers.append('access-token', token)
      // overload token
      options.headers = headers
    }
    return options

  }

  // getBalance
  getBalance(acno: any) {
    return this.http.get('http://localhost:3000/getBalance/' + acno, this.appendToken())
  }

  deposit(acno: any, amount: any) {
    const body = {
      acno, amount
    }
    return this.http.post('http://localhost:3000/deposit/', body, this.appendToken())
  }

  // fundTransfer
  fundTransfer(toAcno: any, pswd: any, amount: any) {
    const body = {
      toAcno,
      pswd,
      amount
    }
    return this.http.post('http://localhost:3000/fundTransfer', body, this.appendToken())

  }
  // all-transcations api
  getAllTranscations(){
    return this.http.get('http://localhost:3000/all-transcations',this.appendToken())

  }

  // deleteaccount
  deleteAccount(acno:number){
    return this.http.delete('http://localhost:3000/delete-account/'+acno,this.appendToken())
   
  }
}
