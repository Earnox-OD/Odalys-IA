'use client'
import { useState } from 'react'
import { Flex, Text, TextField, Button, Card } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import { userLogin } from '@/app/actions/login'
import { setCookie } from '@/app/utils/cookies'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { success, token } = await userLogin({ email, password })
      if (success && token) {
        setCookie('jwt', token)
        router.push('/chat')
      } else {
        setError('Identifiants incorrects. Contactez le support si nécessaire.')
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex
      width="100%"
      align="center"
      justify="center"
      style={{ backgroundColor: 'var(--gray-a2)' }}
      height={'100%'}
    >
      <Card size="4" style={{ width: 400 }}>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="4">
            <Text size="7" weight="bold" align="center">
              Odalys IA
            </Text>

            <Text size="2" color="gray" align="center" mb="4">
              Entrez vos identifiants pour accéder à la plateforme
            </Text>

            <Flex direction="column" gap="2">
              <label htmlFor="email">Email</label>
              <TextField.Input
                size="3"
                id="email"
                type="email"
                placeholder="email@odalys-vacances.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Flex>

            <Flex direction="column" gap="2">
              <label htmlFor="password">Mot de passe (api key)</label>
              <TextField.Input
                size="3"
                id="password"
                type="password"
                placeholder="sk-••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Flex>

            {error && (
              <Text size="2" color="red" align="center">
                {error}
              </Text>
            )}

            <Button
              size="3"
              type="submit"
              disabled={loading}
              style={{ cursor: 'pointer', marginTop: '1rem' }}
            >
              {loading ? (
                <Flex align="center" gap="2">
                  <div className="spinner" />
                  <Text>Connexion en cours...</Text>
                </Flex>
              ) : (
                'Se connecter'
              )}
            </Button>

            <Text size="1" color="gray" align="center" mt="4">
              Problème de connexion ? Contactez{' '}
              <a
                href="mailto:lebonnois.s@odalys-vacances.com"
                style={{ color: 'var(--accent-11)', textDecoration: 'underline' }}
              >
                le support
              </a>
            </Text>
          </Flex>
        </form>
      </Card>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--gray-8);
          border-top-color: var(--accent-11);
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
      `}</style>
    </Flex>
  )
}
