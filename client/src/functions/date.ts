export function normaliseDate(dateInput: string): string {
    const dateConvert = new Date(dateInput).toJSON();
    const [date, time] = dateConvert.split("T");
    const [year, month, day] = date.split("-");
    const [hour, minutes] = time.split(":");
    return `${day}/${month}/${year} ${hour}:${minutes}`;
}
