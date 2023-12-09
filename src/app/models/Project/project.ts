export interface Project {
  id: number;
  nom: string;
  startDate: string; // Utilisation d'une chaîne pour représenter une date, vous pouvez ajuster selon vos besoins
  endDate: string;   // Utilisation d'une chaîne pour représenter une date, vous pouvez ajuster selon vos besoins
  id_manager: number;
}
