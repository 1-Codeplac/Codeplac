import { baseUrl } from "./api"

export async function getAllEvents() {
  try {
    const response = await fetch(`${baseUrl}/event/list`)

    if(!response.ok) {
      throw new Error("Erro HTTP! Status: ", response.status)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}