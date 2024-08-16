import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

import { AlbumDataService } from '../album-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css',
})
export class AlbumComponent implements OnInit {
  album: any = {};
  isLoggedIn = false;

  constructor(
    private location: Location,
    private dataService: AlbumDataService,
    private route: ActivatedRoute,
    private _authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    const userid = this.route.snapshot.params['id'];
    this.getData(userid);
    this.isLoggedIn = this._authentication.hasToken();
  }

  getData(id: string): void {
    this.dataService.getById(id).subscribe((data) => {
      this.album = data;
      console.log(data);
    });
  }

  updateData(formValue: any): void {
    const id = this.route.snapshot.params['id'];
    this.dataService.update(formValue, id).subscribe((data) => {
      this.album = data;
    });
  }

  deleteData(): void {
    const id = this.route.snapshot.params['id'];
    this.dataService.delete(id).subscribe((data) => {
      this.album = data;
    });
  }

  update(form: NgForm) {
    this.updateData(form.value);
  }

  onBack(): void {
    this.location.back();
  }
}
