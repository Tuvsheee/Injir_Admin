import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axiosInstance from '@/hooks/axios';
import Swal from 'sweetalert2';

interface Request {
    _id: string;
    name: string;
    companyName?: string; 
    email: string;
    phone?: string;     
    content?: string;   
    createdAt: string; 
}

interface RequestState {
    filteredItems: Request[];
    value: string;
    search: string;
    fetchRequest: () => Promise<void>;
    setFilteredItems: (items: Request[]) => void;
    showMessage: (msg: string, type?: 'success' | 'error') => void;
    updateStatus: (id: string, status: number) => Promise<void>;
}

const showMessage = (msg: string, type: 'success' | 'error' = 'success') => {
    const toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        customClass: { container: 'toast' },
    });
    toast.fire({
        icon: type,
        title: msg,
        padding: '10px 20px',
    });
};

const fetchRequest = async (set: (state: Partial<RequestState>) => void) => {
    try {
        const response = await axiosInstance.get<{ data: Request[] }>('/request');
        set({ filteredItems: response.data.data });
    } catch (error) {
        console.error('Error fetching Requests:', error);
        showMessage('Error fetching Requests', 'error');
    }
};

const updateStatus = async (id: string, status: number, set: (state: Partial<RequestState>) => void, get: () => RequestState) => {
    try {
        const formData = new FormData();
        formData.set('status', status.toString());
        await axiosInstance.put(`/request/${id}`, formData);

        const updatedItems = get().filteredItems.map((item: Request) => 
            item._id === id ? { ...item, status } : item
        );
        set({ filteredItems: updatedItems });

        showMessage('Төлөв амжилттай шинэчлэгдлээ', 'success');
    } catch (error) {
        console.error('Error updating status:', error);
        showMessage('Error updating status', 'error');
    }
};

export const useRequestStore = create<RequestState>()(
    persist(
        (set, get) => ({
            filteredItems: [],
            value: 'list',
            search: '',
            fetchRequest: () => fetchRequest(set),
            setFilteredItems: (items: Request[]) => set({ filteredItems: items }),
            showMessage: (msg: string, type?: 'success' | 'error') => showMessage(msg, type),
            updateStatus: (id: string, status: number) => updateStatus(id, status, set, get),
        }),
        { name: 'company-store' }
    )
);