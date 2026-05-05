import { capitalize } from "./capitalize"

export function formatDate(date) {
    const [dia, mes, ano] = date.split("-")

    const result = new Date(dia, mes - 1, ano).toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
    })

    return capitalize(result)
}
