import { useAuth } from './auth'
import { headers } from 'next/headers'

export const RABBITMQ_CONFIG = {
  host: process.env.NEXT_PUBLIC_RABBITMQ_HOST,
  port: process.env.NEXT_PUBLIC_RABBITMQ_PORT,
  vhost: process.env.NEXT_PUBLIC_RABBITMQ_VHOST ,
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
}

export const getRabbitMQConfig = () => {
  const auth = useAuth.getState()
  
  return {
    host: RABBITMQ_CONFIG.host,
    port: RABBITMQ_CONFIG.port,
    vhost: RABBITMQ_CONFIG.vhost,
    username: auth.user?.username || RABBITMQ_CONFIG.username,
    password: RABBITMQ_CONFIG.password,
  }
}

// Helper to get base URL
export const getRabbitMQBaseUrl = () => {
  return `http://${RABBITMQ_CONFIG.host}:${RABBITMQ_CONFIG.port}`
}

// Helper to get auth headers using current auth state
export const getRabbitMQAuthHeaders = () => {
  // Check if we're in an API route by trying to access headers()
  try {
    headers()
    // If we're in an API route, use environment variables
    const credentials = Buffer.from(`${RABBITMQ_CONFIG.username}:${RABBITMQ_CONFIG.password}`).toString('base64')
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    }
  } catch {
    // If we're on the client side, use the auth store
    const auth = useAuth.getState()
    if (!auth.user?.username) {
      throw new Error('Not authenticated')
    }
    
    const credentials = Buffer.from(`${auth.user.username}:${RABBITMQ_CONFIG.password}`).toString('base64')
    return {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    }
  }
}
