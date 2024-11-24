import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  images = [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  ];
  services = [
    { icon: '🏠', title: 'Verified Listings', description: 'All homes are thoroughly verified for quality and safety.' },
    { icon: '🤝', title: 'Secure Exchange', description: 'Safe and secure property exchange process with legal support.' },
    { icon: '📅', title: 'Flexible Duration', description: 'Exchange homes for any duration that suits your needs.' },
    { icon: '✨', title: 'Premium Services', description: 'Additional services including cleaning and maintenance.' }
  ];
  currentIndex = 0;

  ngOnInit() {
    this.startImageSlider();
  }

  startImageSlider() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 5000); // Slide every 5 seconds
  }
}
