import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumComponent } from './album/album.component';
import { AlbumListComponent } from './album-list/album-list.component';
import { ErrorComponent } from './error/error.component';
import { ArtistListComponent } from './artist-list/artist-list.component';
import { ArtistComponent } from './artist/artist.component';
import { AddAlbumComponent } from './add-album/add-album.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'album', component: AlbumListComponent },
  { path: 'album/:id', component: AlbumComponent },
  { path: 'add-album', component: AddAlbumComponent },
  { path: 'artist', component: ArtistListComponent },
  { path: 'artist/:id', component: ArtistComponent },
  { path: '**', component: ErrorComponent },
];
