import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddHouseService } from '../../services/add-house/add-house.service';

@Component({
  selector: 'app-add-houses',
  standalone: false,
  templateUrl: './add-house.component.html',
  styleUrls: ['./add-house.component.css']
})
export class AddHousesComponent {
  houseForm: FormGroup;
  primaryImage: File | null = null;
  additionalImages: File[] = [];

  constructor(private fb: FormBuilder, private addHouseService: AddHouseService) {
    this.houseForm = this.fb.group({
      location: ['', Validators.required],
      size: [''],
      amenities: [''],
      availability: [true, Validators.required]
    });
  }

  onFileSelect(event: any) {
    this.primaryImage = event.target.files[0];
  }

  onMultipleFilesSelect(event: any) {
    this.additionalImages = Array.from(event.target.files);
  }

  onSubmit() {
    if (this.houseForm.invalid || !this.primaryImage) return;

    const formData = new FormData();
    formData.append('location', this.houseForm.get('location')?.value);
    formData.append('size', this.houseForm.get('size')?.value);
    formData.append('amenities', this.houseForm.get('amenities')?.value);
    formData.append('availability', this.houseForm.get('availability')?.value);
    formData.append('image', this.primaryImage);

    this.additionalImages.forEach((file, index) => {
      formData.append(`images`, file, file.name);
    });

    this.addHouseService.addHouse(formData).subscribe({
      next: (response) => {
        console.log('House added successfully:', response);
        alert('House added successfully!');
        this.houseForm.reset();
        this.primaryImage = null;
        this.additionalImages = [];
      },
      error: (err) => {
        console.error('Error adding house:', err);
        alert('Failed to add house. Please try again.');
      }
    });
  }
}
