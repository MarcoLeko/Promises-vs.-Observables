import * as $ from 'jquery';

export function createAlert(alertType: string, alertText: string): void {
    const alert: HTMLElement = document.createElement('div');
    alert.innerHTML = `<div class="alert alert-${alertType} alert-dismissible fade show" data-dismiss="alert" role="alert">
                    ${alertText}
            </div>`;
    document.body.insertBefore(alert, document.body.childNodes[0]);
    setTimeout(() => $('.alert').alert('close'), 4000);
}