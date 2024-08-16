import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AlbumDataService } from '../album-data.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent implements OnInit {
  album:any = {};

  constructor(
    private location: Location,
    private dataService: AlbumDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userid = this.route.snapshot.params['id'];
    this.getData(userid);
  }

  getData(id: string): void {
    this.dataService.getById(id).subscribe((data) => {
      this.album = data;
      console.log(data);
      
    });
  }

  register(form: NgForm){
    console.log("register");
    console.log(form.value);
  }

  onBack(): void {
    this.location.back();
  }
}
