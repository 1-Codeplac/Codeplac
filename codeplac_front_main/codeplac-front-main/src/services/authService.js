import { baseUrl } from "./api";

export async function loginUser(formData) {
  try {
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      // Tenta capturar a mensagem de erro exata vinda do Spring Boot
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Status do erro: ${response.status}`,
        );
      } catch (parseError) {
        // Se não conseguir converter para JSON, joga o erro da tentativa
        throw new Error(
          parseError.message || `Status do erro: ${response.status}`,
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no service loginUser:", error.message);
    throw error;
  }
}

export async function registerUser(formData) {
  try {
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Status do erro: ${response.status}`,
        );
      } catch (parseError) {
        throw new Error(
          parseError.message || `Status do erro: ${response.status}`,
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro no service registerUser:", error.message);
    throw error;
  }
}

export async function forgotPassword(cpf) {
  try {
    const response = await fetch(`${baseUrl}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf }),
    });

    if (!response.ok) {
      try {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `Status do erro: ${response.status}`,
        );
      } catch (parseError) {
        throw new Error(
          parseError.message || `Status do erro: ${response.status}`,
        );
      }
    }
  } catch (error) {
    console.error("Erro no service forgotPassword:", error.message);
    throw error;
  }
}
