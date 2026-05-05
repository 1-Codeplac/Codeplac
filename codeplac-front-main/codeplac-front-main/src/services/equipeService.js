import { baseUrl } from "./api"

export async function registerEquipe(formData) {
    try {
        const response = await fetch(`${baseUrl}/equipes/inscricao`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok) {
            throw new Error("Status do erro: ", response.status)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro no service registerEquipe:", error.message)
        throw error
    }
}