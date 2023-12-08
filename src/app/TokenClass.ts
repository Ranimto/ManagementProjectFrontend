import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService{

    private readonly TOKEN_KEY = 'jwtToken';

    //pour récupèrer le token du localStorage.
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
 
    //pour stocker un token dans le localStorag
    setToken(token: string): void{
     localStorage.setItem(this.TOKEN_KEY, token);
    }


  // pour supprimer un token du localStorage
  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

   
 
}