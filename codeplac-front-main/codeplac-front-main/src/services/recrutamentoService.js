import { baseUrl } from "./api"

export async function recruitUser(formData) {
    try {
        const response = await fetch(`${baseUrl}/juntese`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        if(!response.ok) {
            throw new Error(`Status do erro: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro no service recrutamentoService: ${error.message}`)
        throw error
    }
}