import Swal from 'sweetalert2';

export const showNotif = (msg: string, type: string) => {
    const toast: any = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type || 'success',
        title: msg || 'Амжилттай',
        padding: '10px 20px',
    });
};