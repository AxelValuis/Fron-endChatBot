import { Injectable, inject } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root',
})
export class NgxToastrService {
    private readonly toastr = inject(ToastrService);

    /**
     * Muestra una notificación de éxito con un mensaje y un título opcional.
     * @param message El mensaje de la notificación.
     * @param title El título de la notificación (opcional).
     */
    showSuccess(message: string, title?: string): void {
        this.toastr.success(message, title);
    }

    /**
     * Muestra una notificación de error con un mensaje y un título opcional.
     * @param message El mensaje de la notificación.
     * @param title El título de la notificación (opcional).
     */
    showError(message: string, title?: string): void {
        this.toastr.error(message, title);
    }

    /**
     * Muestra una notificación de advertencia con un mensaje y un título opcional.
     * @param message El mensaje de la notificación.
     * @param title El título de la notificación (opcional).
     */
    showWarning(message: string, title?: string): void {
        this.toastr.warning(message, title);
    }

    /**
     * Muestra una notificación informativa con un mensaje y un título opcional.
     * @param message El mensaje de la notificación.
     * @param title El título de la notificación (opcional).
     */
    showInfo(message: string, title?: string): void {
        this.toastr.info(message, title);
    }
}