const uploadPrompt = async (name: string, prompt: string) => {
  const data = { name, prompt }
  const response = await fetch('/api/prompts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    },
    body: JSON.stringify(data)
  })
  console.log('response', response)
  if (!response.ok) {
    throw new Error('Erreur lors de la sauvegarde du prompt')
  }
  console.log('response', response)
  return await response.json()
}

export default uploadPrompt