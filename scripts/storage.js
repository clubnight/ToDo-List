export const localStorageKey = 'todo-items';

export const saveToStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
}

export const getFromStorage = () => {
    const rawData = localStorage.getItem(localStorageKey);

    if (!rawData) return [];

    try {
        const parsedData = JSON.parse(rawData);

        return Array.isArray(parsedData) ? parsedData : []
    } catch {
        console.error('Ошибка получения элементов');
        return []
    }
}