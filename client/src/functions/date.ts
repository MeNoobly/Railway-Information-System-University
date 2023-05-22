export function normaliseDate(dateInput: string): string {
    const date = new Date(dateInput);

    if (date.getHours() < 10 && date.getMinutes() < 10) {
        return `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()} 0${date.getHours()}:0${date.getMinutes()}`;
    }

    if (date.getHours() < 10) {
        return `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()} 0${date.getHours()}:${date.getMinutes()}`;
    }

    if (date.getMinutes() < 10) {
        return `${date.getDate()}/${
            date.getMonth() + 1
        }/${date.getFullYear()} ${date.getHours()}:0${date.getMinutes()}`;
    }

    return `${date.getDate()}/${
        date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export function normaliseDateForChange(dateInput: string): string {
    const date = new Date(dateInput);

    if (date.getHours() < 10 && date.getMinutes() < 10) {
        return `${
            date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()} 0${date.getHours()}:0${date.getMinutes()}`;
    }

    if (date.getHours() < 10) {
        return `${
            date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()} 0${date.getHours()}:${date.getMinutes()}`;
    }

    if (date.getMinutes() < 10) {
        return `${
            date.getMonth() + 1
        }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:0${date.getMinutes()}`;
    }

    return `${
        date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}

export function normaliseDateForDB(dateInput: string): string {
    const date = new Date(dateInput);

    return `${date.getFullYear()}-${
        date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:00`;
}
