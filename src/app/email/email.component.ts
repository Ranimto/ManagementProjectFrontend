import { Component, OnInit } from '@angular/core';
import { Email } from '../models/Email';
import { EmailService } from '../services/emailService/email.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor(private emailService: EmailService) { }
email:Email={
  id:0,
  toEmail:'',
  subject:'',
  body:''
}

discardEmail() {
  this.email.toEmail = '';
  this.email.subject = '';
  this.email.body = '';
}
sendEmail() {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbjNAZ21haWwuY29tIiwiaWF0IjoxNzAwOTUyNTU1LCJleHAiOjE3MDg5NTI1NTV9.S1rxETp95q6BJ_SKut-z8BfWNk0GYEr5rcS0nqzKXkw'
    })
  };
  // Envoi de l'e-mail en utilisant le service
  this.emailService.sendEmail(this.email).subscribe(
    response => {
      // Gérez la réponse réussie ici si nécessaire
      console.log('E-mail envoyé avec succès !');
    },
    error => {
      // Gérez les erreurs ici si nécessaire
      console.error('Erreur lors de l envoie d email:', error);
    }
  );
}
  ngOnInit(): void {
  }

}
