import { baseUrl } from "./api"

export async function getUserByCpf(cpf, token) {
    try {
        const response = await fetch(`${baseUrl}/users/${cpf}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(!response.ok) {
            throw new Error(`Status do erro: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro no service userService: ${error.message}`)
        throw error
    }
}

export async function getAllUsers(token) {
    try {
        const response = await fetch(`${baseUrl}/users/list`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if(!response.ok) {
            throw new Error(`Status do erro: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro no service getAllUsers: ${error.message}`)
        throw error
    }
}

export async function modifyUserFunction(userCpf, token, newUserFunction) {
    try {
        const response = await fetch(`${baseUrl}/users/modify/${userCpf}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ tipoUsuario: newUserFunction })
        })

        if(!response.ok) {
            throw new Error(`Status do erro: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro no service modifyUserFunction: ${error.message}`)
        throw error
    }
}

export async function updateUser(userCpf, token, changedFields) {
    try {
        const response = await fetch(`${baseUrl}/users/modify/${userCpf}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(changedFields)
        })

        if(!response.ok) {
            throw new Error(`Status do erro: ${response.status}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro no service updateUser: ${error.message}`)
        throw error
    }
}