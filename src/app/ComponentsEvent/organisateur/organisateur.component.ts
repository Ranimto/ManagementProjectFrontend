import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Organisateur } from 'src/app/ModelsEvents/organisateur';
import { OrganisateurService } from 'src/app/ServiceEvenements/Organisateurs/organisateur.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-organisateur',
  templateUrl: './organisateur.component.html',
  styleUrls: ['./organisateur.component.css']
})
export class OrganisateurComponent implements OnInit {
  organisateurs: Organisateur[] = [];
  showForm = false;
  isEditing = false;
  organisateur: Organisateur={
    id:0,
    firstname:'',
    lastname:'',
    email:'',
    cin:'',
    phoneNumber:'',
    adresse:'',
    password:'',
    role:''
  };

  filteredOrganisateurs: Organisateur[] = []; 
  searchKeyword = '';

  constructor(private organisateurService : OrganisateurService) {}

  ngOnInit(): void {
    this.getAllOrganisateurs();
    this.filteredOrganisateurs=this.organisateurs;
  }

  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire

  }

  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();

  }
  toggleEditing(id:number) {
    this.isEditing = !this.isEditing;
  }

  getAllOrganisateurs (){
    this.organisateurService.getAllOrganisateurs().subscribe(
      (result) => {
        this.organisateurs = result;
        this.filteredOrganisateurs=result;
      },
      (error) => {
        console.error('Error fetching organisateurs:', error);
      }
    );
  }

  AddOrganisateurs(addForm: NgForm) {
    if (addForm.valid) {
      this.organisateurService.createOrganisateur(this.organisateur).subscribe(
        () => {
          alert('organisateur is added successfully');
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add organisateur:', error);
        }
      );
    }
  }
  UpdateOrganisateurs(organisateur: Organisateur) {
    if (organisateur.id === undefined) {
      console.error('Error updating organisateur: ID is undefined');
      return;
    }
  
    this.organisateurService.updateOrganisateur(organisateur.id, organisateur).subscribe(
      (updatedOrganisateur) => {
        alert('organisateur is updated successfully');
        // Optionally, you can update your component state or perform additional actions.
      },
      (error) => {
        console.error('Error updating organisateur:', error);
      }
    );
  }

   
  DeleteOrganisateurs(idorganisateur: number) {
    this.organisateurService.deleteOrganisateur(idorganisateur).subscribe(
      () => {
        console.log('Organizer deleted successfully');
        alert("evenement " + idorganisateur + " is deleted successfully");
        this.getAllOrganisateurs(); // Mettez à jour la liste des fournisseurs après la suppression
      },
      (error) => {
        console.error('Error Delete evenement:', error);
      }
    );
  }

  editingOrganisateur: Organisateur | null = null; // Ajoutez cette ligne



  setEditingOrganisateur(organisateur: Organisateur | null) {
    this.editingOrganisateur = organisateur;
  }
  

  filterOrganisateurs(searchKeyword: string) {
    console.log('Search keyword:', searchKeyword);

    // Filter the evenements based on the search keyword
    this.filteredOrganisateurs = this.organisateurs.filter((organisateur) => {
      return (
        organisateur.id.toString().includes(searchKeyword.toLowerCase()) ||
        organisateur.firstname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        organisateur.lastname.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        organisateur.adresse.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        organisateur.email.toLowerCase().includes(searchKeyword.toLowerCase())

      );
    });
  }
  

}

