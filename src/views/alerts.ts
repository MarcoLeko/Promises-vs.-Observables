export function createAlert(alertType: string, alertText: string): string {
    return `<div class="alert alert-${alertType} alert-dismissible fade show" data-dismiss="alert" role="alert">
                    ${alertText}
            </div>`;
}