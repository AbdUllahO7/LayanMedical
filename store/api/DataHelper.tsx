export const apiRequest = async (endpoint: string, method: string = "GET", body?: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
        });
    
        if (!res.ok) console.log('')
    
        const data = await res.json();
        return data.data; 
  };
  