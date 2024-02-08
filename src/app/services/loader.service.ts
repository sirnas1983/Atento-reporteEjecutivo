import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private loadingApps = new Set<string>(); // Use a Set to store unique app names
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  constructor() {
  }

  showLoader(appName: string): void {
    this.loadingApps.add(appName); // Add the app name to the Set
    this.isLoadingSubject.next(true); // Show the loader
  }

  hideLoader(appName: string): void {
    this.loadingApps.delete(appName); // Remove the app name from the Set
    if (this.loadingApps.size === 0) {
      this.isLoadingSubject.next(false); // Hide the loader if no apps are requesting it
    }
  }
}
