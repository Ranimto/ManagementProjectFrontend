import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Evenement } from 'src/app/ModelsEvents/evenement';
import { EvenementsService } from 'src/app/ServiceEvenements/Evenements/evenements.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent implements OnInit {
  filteredEvenements: Evenement[] = []; 
  evenements: Evenement[] = [];
  showForm = false;
  isEditing = false;
  evenement: Evenement={
    id:0,
    name:'',
    description:'',
    lieu:''
  };
  searchKeyword = '';

  

  constructor(private evenementService: EvenementsService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllEvents();
    this.filteredEvenements = this.evenements; // Initialize filteredEvenements with all events

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

  getAllEvents (){
    this.evenementService.getAllEvenements().subscribe(
      (result) => {
        this.evenements = result;
        this.filteredEvenements = result;  // Initialize filtered events with all events

      },
      (error) => {
        console.error('Error fetching evenements:', error);
      }
    );
  }

  AddEvents(addForm: NgForm) {
    if (addForm.valid) {
      this.evenementService.createEvenement(this.evenement).subscribe(
        () => {
          alert('evenement is added successfully');
          addForm.resetForm();

        },
        (error) => {
          console.error('Error add evenement:', error);
        }
      );
    }
  }
  UpdateEvents(evenement: Evenement) {
    if (evenement.id === undefined) {
      console.error('Error updating provider: ID is undefined');
      return;
    }
  
    this.evenementService.updateEvenement(evenement.id, evenement).subscribe(
      (updatedEvenement) => {
        alert('evenement is updated successfully');
      //  this.filterEvenements();  // Update filtered events after updating

        // Optionally, you can update your component state or perform additional actions.
      },
      (error) => {
        console.error('Error updating evenement:', error);
      }
    );
  }

   
  DeleteEvents(idevenements: number) {
    this.evenementService.DeleteEvenement(idevenements).subscribe(
      () => {
        alert("evenement " + idevenements + " is deleted successfully");
        this.getAllEvents(); // Mettez à jour la liste des fournisseurs après la suppression
      },
      (error) => {
        console.error('Error Delete evenement:', error);
      }
    );
  }

  editingEvenement: Evenement | null = null; // Ajoutez cette ligne



  setEditingEvenement(evenement: Evenement | null) {
    this.editingEvenement = evenement;
  }
  
  filterEvenements(searchKeyword: string) {
    console.log('Search keyword:', searchKeyword);

    // Filter the evenements based on the search keyword
    this.filteredEvenements = this.evenements.filter((evenement) => {
      return (
        evenement.id.toString().includes(searchKeyword.toLowerCase()) ||
        evenement.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        evenement.description.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        evenement.lieu.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    });
  }
  
  

}
