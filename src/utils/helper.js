import Swal from 'sweetalert2'

export class Alert {
    static swal = Swal.mixin({
        confirmButtonText: 'Ok',
        cancelButtonText: 'Cancelar',
        focusCancel: true,
        showCancelButton: true
    })

    static warning (message, title = 'Opss') {
        return this.swal.fire({
            icon: 'warning',
            title: title,
            text: message
        })
    }

    static error (message, title = 'Opss') {
        return this.swal.fire({
            icon: 'error',
            title: title,
            text: message
        })
    }
}

export function convertHTMLEntity(text){
    const span = document.createElement('span');
    return text
        .replace(/&[#A-Za-z0-9]+;/gi, (entity)=> {
            span.innerHTML = entity;
            return span.innerText;
        });
}

export function clearObj(obj) {
    for (const prop of Object.getOwnPropertyNames(obj)) {
        obj[prop] = '';
    }
}