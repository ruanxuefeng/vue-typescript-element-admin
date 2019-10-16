import {MessageBox, Notification} from 'element-ui';

export function success(title: string, message: string) {
    Notification({
        title,
        message,
        type: 'success',
        duration: 2000,
    });
}

export function confirmDelete(title: string, message: string, confirmButtonText: string,
                              cancelButtonText: string, callback: () => void, rollback?: () => void) {
    MessageBox.confirm(message, title, {
        confirmButtonText,
        cancelButtonText,
        type: 'warning',
    }).then(() => {
        if (callback) {
            callback();
        }
    }).catch(() => {
        if (rollback) {
            rollback();
        }
    });
}
