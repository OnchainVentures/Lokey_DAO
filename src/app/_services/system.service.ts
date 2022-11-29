import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastController } from "@ionic/angular";
import { Subject } from "rxjs";


const DefaultSettings: Settings = {
    theme: 'light',
};

@Injectable()
export class SystemService {
    isMobileSize: boolean = false;

    private settings: Settings;
    private events: any = {};

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private toast: ToastController,
        private router: Router
        ) {
            this.settings = DefaultSettings;
            let loadSettings = localStorage.getItem('settings');
            if(loadSettings) {
                const settings = JSON.parse(loadSettings);
                console.log(this.settings);
                if(settings != null) {
                    this.theme = settings.theme;
                }
            }

            // Check if mobile screen size
            if (window.innerWidth < 900) {
                this.isMobileSize = true;
            }

            window.onresize = () => {
                if(window.innerWidth <= 900) {
                    this.isMobileSize = true;
                } else {
                    this.isMobileSize = false;
                }
            }
            
    }

    set theme(theme: 'light' | 'dark') {
        this.settings.theme = theme;
        this.setTheme(theme);
        this.saveSettings();
    }
    get theme(): 'light' | 'dark' {
        return this.settings ? this.settings.theme : DefaultSettings.theme;
    }

    setTheme(theme: 'light' | 'dark') {
        if(theme === 'dark') {
            this.document.body.classList.add('dark');
        } else {
            this.document.body.classList.remove('dark');
        }
    }

    saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    async showToast(data: ToastData) {
        let buttons : any[] = []
        if (data.icon) buttons.push({ side: 'start', icon: data.icon })
        if (data.link) buttons.push({ side: 'end', text: data.linkText ? data.linkText : 'VIEW', handler: () => { this.router.navigateByUrl(data.link!) } })

        const toast = await this.toast.create({
            header: data.header,
            message: data.message,
            duration: data.duration ? data.duration : 4000,
            position: 'bottom',
            color: data.color ? data.color : 'dark',
            cssClass: 'my-toast',
            buttons
        });
        toast.present();
        return toast;
    }

    on(event : string) : Subject<any> {
        let sub = new Subject()
        if (this.events[event] && this.events[event].length)
            this.events[event].push(sub)
        
        else this.events[event] = [sub]
        return sub
    }
    emit(event : string, data?: any) : any {
        if (this.events[event])
            for (let ev of this.events[event])
                ev.next(data);
    }
}

interface Settings {
    theme: 'light' | 'dark';
}

export interface ToastData {
    header: string;
    message?: string;
    icon?: string;
    link?: string;
    linkText?: string;
    duration?: number;
    color?: string;
}