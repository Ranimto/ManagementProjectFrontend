import { Component, OnInit } from '@angular/core';
import { ProviderServiceService } from '../services/providerService/provider-service.service';
import { Provider } from '../models/Provider';

@Component({
  selector: 'app-viewproviders',
  templateUrl: './viewproviders.component.html',
  styleUrls: ['./viewproviders.component.css']
})
export class ViewprovidersComponent implements OnInit {
  filteredProviders: Provider[] = []; 
  searchKeyword = '';
  constructor(private providerService: ProviderServiceService) { }
  providers: Provider[]=[];
  ngOnInit(): void {
    this.getAllProviders();
    this.filteredProviders=this.providers;
  }

  getAllProviders (){
    this.providerService.getAllProviders().subscribe(
      (result) => {
        this.providers = result;
        console.log(this.providers);
        this.filteredProviders=result;
      },
      (error) => {
        console.error('Error fetching providers:', error);
      }
    );

  }

  filterProviders(searchKeyword: string) {
    // Check if searchKeyword is defined
    if (searchKeyword !== null && searchKeyword !== undefined) {
      // Filter the providers based on the search keyword
      this.filteredProviders = this.providers.filter((provider) => {
        // Check if name and city are defined and not null before applying toLowerCase
        let isMatch =
          (provider.name !== undefined && provider.name !== null && provider.name.toLowerCase().includes(searchKeyword.toLowerCase())) ||
          (provider.city !== undefined && provider.city !== null && provider.city.toLowerCase().includes(searchKeyword.toLowerCase()));
        // Check if phone is a number and includes the search keyword as a string
        if (typeof provider.phone === 'number') {
          isMatch = isMatch || provider.phone.toString().includes(searchKeyword);
        }
        return isMatch;
      });
    } else {
      // If searchKeyword is not defined, reset the filteredProviders to all providers
      this.filteredProviders = this.providers;
    }
  }
  

}
