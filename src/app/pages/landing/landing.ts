import {
  Component,
  OnDestroy
} from '@angular/core';

import { RouterLink } from '@angular/router';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing implements OnDestroy {

  activeItem: number | null = null;

  private deferredInstallPrompt: BeforeInstallPromptEvent | null = null;

  private readonly beforeInstallPromptHandler =
    (event: Event): void => {

      event.preventDefault();

      this.deferredInstallPrompt =
        event as BeforeInstallPromptEvent;

    };

  private readonly appInstalledHandler =
    (): void => {

      this.deferredInstallPrompt = null;

    };


  constructor() {

    window.addEventListener(
      'beforeinstallprompt',
      this.beforeInstallPromptHandler
    );

    window.addEventListener(
      'appinstalled',
      this.appInstalledHandler
    );

  }


  toggleItem(index: number): void {

    this.activeItem =
      this.activeItem === index
        ? null
        : index;

  }


  async installApp(): Promise<void> {

    if (!this.deferredInstallPrompt) {

      console.info(
        'LANG installation prompt is not currently available.'
      );

      return;

    }


    const prompt =
      this.deferredInstallPrompt;

    this.deferredInstallPrompt = null;


    try {

      await prompt.prompt();

      const choice =
        await prompt.userChoice;

      if (choice.outcome === 'accepted') {

        console.log(
          'LANG installation accepted.'
        );

      } else {

        console.log(
          'LANG installation dismissed.'
        );

      }

    } catch (error) {

      console.error(
        'LANG installation failed:',
        error
      );

    }

  }


  ngOnDestroy(): void {

    window.removeEventListener(
      'beforeinstallprompt',
      this.beforeInstallPromptHandler
    );

    window.removeEventListener(
      'appinstalled',
      this.appInstalledHandler
    );

  }

}