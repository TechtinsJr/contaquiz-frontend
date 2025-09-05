import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { DialogType } from "./types";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function formatShortDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');

    return `${day}/${month}`;
}

export function getMonthName(dateString: string): string {
    const date = new Date(dateString);
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return monthNames[date.getMonth()];
}

export const setDialog = <T>(type: DialogType, data: T | null = null) => {
  return {
    isOpenCreateOrEditDialog: type === "createOrEdit",
    isOpenDeleteDialog: type === "delete",
    data,
  };
};