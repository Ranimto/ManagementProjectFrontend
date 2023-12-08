import { Component, OnInit } from '@angular/core';
import { Organisation } from 'src/app/ModelsEvents/organisation';
import { OrganisationService } from 'src/app/ServiceEvenements/Organisations/organisation.service';
import { Evenement } from 'src/app/ModelsEvents/evenement';
import { NgForm } from '@angular/forms';
import { Organisateur } from 'src/app/ModelsEvents/organisateur';
import { OrganisateurService } from 'src/app/ServiceEvenements/Organisateurs/organisateur.service';
import { EvenementsService } from 'src/app/ServiceEvenements/Evenements/evenements.service';
@Component({
  selector: 'app-organisation',
  templateUrl: './organisation.component.html',
  styleUrls: ['./organisation.component.css']
})
export class OrganisationComponent implements OnInit {
  organisations: Organisation[] = [];
  showForm = false;
  isEditing = false;
  organisation: Organisation={
  id:0,
  name:'',
  id_evenement:0,
  id_organisateur:0,
  organisateur: new Organisateur(),
  evenement: new Evenement(),
  };

  filteredOrganisations: Organisation[] = []; 
  searchKeyword = '';

 
 public  evenements: Evenement[]= [];
public organisateurs: Organisateur[]=[];
  constructor(private organisationService : OrganisationService,
    private organisateurService : OrganisateurService,private evenementService: EvenementsService) { }

  ngOnInit(): void {
  this.getAllOrganisations();
  this.getAllEvents();
   this.getAllOrganisateurs();
   this.filteredOrganisations=this.organisations;

  }
  toggleForm() {
    this.showForm = !this.showForm; // Basculez entre afficher et masquer le formulaire

  }
 
  CloseForm(addForm: NgForm) {
    this.toggleForm() ;
    addForm.resetForm();

  }
  toggleEditing(organisation: Organisation) {
    this.isEditing = !this.isEditing;
    
  }

  getAllOrganisations (){
    this.organisationService.getAllOrganisations().subscribe(
      (result) => {
        this.organisations = result;
        this.filteredOrganisations=result;
      },
      (error) => {
        console.error('Error fetching organisation:', error);
      }
    );
  }

  AddOrganisations(addForm: NgForm) {
    console.log('Before Add - organisation:', this.organisation);
    // Vérifier si les champs sont sélectionnés
    if (addForm.valid && this.organisation.evenement && this.organisation.organisateur) {
      this.organisationService.createOrganisation(this.organisation).subscribe(
        () => {
          console.log('After Add - organisation:', this.organisation); // Ajouter cette ligne
          alert('organisation is added successfully');
          addForm.resetForm();
        },
        (error) => {
          console.error('Error add organisation:', error);
        }
      );
    } else {
      // Afficher un message d'erreur ou effectuer une action appropriée si les champs ne sont pas sélectionnés
      alert('Veuillez sélectionner un événement et un organisateur.');
    }
  }
  
  UpdateOrganisations(organisation: Organisation) {
    if (organisation.id === undefined) {
      console.error('Error updating organisateur: ID is undefined');
      return;
    }
  
    this.organisationService.updateOrganisation(organisation.id, organisation).subscribe(
      (updatedOrganisation) => {
        alert('organisation is updated successfully');
      },
      (error) => {
        console.error('Error updating organisation:', error);
      }
    );
  }

   
  DeleteOrganisations(idorganisation: number) {
    this.organisationService.deleteOrganisation(idorganisation).subscribe(
      () => {
        console.log('Organizer deleted successfully');
        alert("evenement " + idorganisation + " is deleted successfully");
        this.getAllOrganisations(); // Mettez à jour la liste des fournisseurs après la suppression
      },
      (error) => {
        console.error('Error Delete evenement:', error);
      }
    );
  }

  getAllEvents() {
    this.evenementService.getAllEvenements().subscribe(
      (result) => {
        this.evenements = result;
        console.log('Evenements:', this.evenements);
      },
      (error) => {
        console.error('Error fetching evenements:', error);
      }
    );
  }

 
  
  getAllOrganisateurs() {
    this.organisateurService.getAllOrganisateurs().subscribe(
      (result) => {
        this.organisateurs = result;
        console.log('Organisateurs:', this.organisateurs); 
      },
      (error) => {
        console.error('Error fetching organisateurs:', error);
      }
    );
  }
  

  GetOrganisateurName(id: number | undefined): string {
    if (!id) {
      return 'Unknown Organisateur';
    }
    let nameorg = "";
    let find = this.organisateurs.find(x => x.id == id);
    if (find) {
      nameorg = find.firstname + " " + find.lastname;
    }
    // console.log('Name for ID', id, ':', nameorg); // Ajoutez cette ligne pour le débogage
    return nameorg;
  }
  
  
  GetEventName(id: number | undefined): string {
    if (!id) {
      return 'Unknown Event';
    }
    let nameevent = ""
    let find = this.evenements.find(y => y.id == id);
    if (find) {
      nameevent = find.name +""
    }
    return nameevent
  }
  
  
  editingOrganisation: Organisation | null = null; // Ajoutez cette ligne
 

  setEditingOrganisation(organisation: Organisation | null) {
    this.editingOrganisation = organisation;
    console.log('Editing Organisation:', organisation);
  }

  filterOrganisations(searchKeyword: string) {
    console.log('Search keyword:', searchKeyword);

    // Filter the evenements based on the search keyword
    this.filteredOrganisations = this.organisations.filter((organisation) => {
      return (
        organisation.id.toString().includes(searchKeyword.toLowerCase()) ||
        organisation.name.toLowerCase().includes(searchKeyword.toLowerCase()) 
      );
    });
  }
  
  
}
