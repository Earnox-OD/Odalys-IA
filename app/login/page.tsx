'use client'
import { useState } from 'react'
import { userLogin } from '@/app/actions/login'
import { setCookie } from '@/app/utils/cookies'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  async function onLogin() {
    // Call à la serveur action
    const payload = { email, password }

    const { success, token } = await userLogin(payload)
    if (success && token) {
      setCookie('jwt', token)
      router.push('/chat')
    } else {
      alert(
        'Mauvais identifiants. Envoyez un mail à lebonnois.s@odalys-vacances.com si vous avez perdu votre mot de passe.'
      )
    }
  }

  return (
    // @ts-ignore
    <main style={styles.main}>
      <h1>Connexion à Odalys IA</h1>
      <p>
        Veuillez saisir votre adresse email ainsi que votre clé d'API qui vous a été communiquée.
      </p>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name=""
        id="email"
        style={styles.input}
        onChange={(e: any) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="password">Mot de passe</label>
      <input
        type="password"
        name=""
        id="password"
        style={styles.input}
        onChange={(e: any) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={onLogin}>Connexion</button>
    </main>
  )
}

const styles = {
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    border: '1px solid #000',
    padding: '0.5rem'
  }
}
