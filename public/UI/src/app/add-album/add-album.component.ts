import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AlbumDataService } from '../album-data.service';

@Component({
  selector: 'app-add-album',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-album.component.html',
  styleUrl: './add-album.component.css',
})
export class AddAlbumComponent implements OnInit {
  album: any = {};

  constructor(
    private location: Location,
    private dataService: AlbumDataService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  insertData(formValue: any): void {
    this.dataService.add(formValue).subscribe((data) => {
      this.album = data;
      this._router.navigate(['album']);
    });
  }

  add(form: NgForm) {
    this.insertData(form.value);
  }

  onBack(): void {
    this.location.back();
  }
}
