import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { AlbumDataService } from '../album-data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.css',
})
export class AlbumListComponent implements OnInit {
  albums: any[] = [];

  pageNumber: number = environment.pageNumber;
  limit: number = environment.limit;

  constructor(private dataService: AlbumDataService) {}

  ngOnInit(): void {
    this.fetchAlbumData();
  }

  fetchAlbumData() {
    this.dataService
      .getAll((this.pageNumber - 1) * this.limit, this.limit).subscribe((data) => {
        this.albums = data;
      });
  }

  onChange(change: number): void {
    if (change === -1) this.pageNumber -= 1;

    if (change === 1) this.pageNumber += 1;

    this.fetchAlbumData();
  }
}
