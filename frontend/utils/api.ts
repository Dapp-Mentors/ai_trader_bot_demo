import Cookies from 'js-cookie'

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL!}`
const MAX_LIMIT = process.env.NEXT_PUBLIC_MAX_COINS || 3

const get_auth_token = () => {
  const _user = Cookies.get('bot_user')!
  const parsedUser = JSON.parse(_user) || {}
  const token = parsedUser?.token?.access_token || ''
  return token
}

export const fetch_coins = async (limit: number = Number(MAX_LIMIT)) => {
  try {
    const response = await fetch(`${BASE_URL}/coin/top_coins?limit=${limit}`)

    if (!response.ok) {
      throw new Error('Failed to fetch coins')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching coins:', error)
    throw error
  }
}

export const fetch_coin_investment = async (coin: string) => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/auth/investment/${coin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch coin investment')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching coin investment:', error)
    throw error
  }
}

export const fetch_coin_report = async (coin: string) => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/coin/report/${coin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch coin report')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching coin report:', error)
    throw error
  }
}

export const deposit_funds = async (coin: string, amount: number) => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/auth/balance/deposit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ coin, amount }),
    })

    if (!response.ok) {
      throw new Error('Failed to deposit funds')
    }

    return await response.json()
  } catch (error: unknown) {
    console.error('Error depositing funds:', error)
    throw error
  }
}

export const withdraw_funds = async (coin: string, amount: number) => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/auth/balance/withdraw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ coin, amount }),
    })

    if (!response.ok) {
      throw new Error('Failed to withdraw funds')
    }

    return await response.json()
  } catch (error: unknown) {
    console.error('Error withdrawing funds:', error)
    throw error
  }
}

export const update_wallet_address = async (
  coin: string,
  wallet_address: string
) => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/auth/wallet/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ coin, wallet_address }),
    })

    if (!response.ok) {
      throw new Error('Failed to update wallet address')
    }

    return await response.json()
  } catch (error: unknown) {
    console.error('Error updating wallet address:', error)
    throw error
  }
}

export const fetch_wallet_addresses = async (coin: string) => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/auth/wallets/${coin}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch wallet addresses')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching wallet addresses:', error)
    throw error
  }
}

export const fetch_profit_trend = async (coin: string, days: number = 30) => {
  const token = get_auth_token()

  try {
    const response = await fetch(
      `${BASE_URL}/auth/profit_trend/${coin}?days=${days}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch profit trend data')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching profit trend data:', error)
    throw error
  }
}


export const fetch_execution_log = async () => {
  const token = get_auth_token()

  try {
    const response = await fetch(`${BASE_URL}/coin/execution_log`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch execution log')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching execution log:', error)
    throw error
  }
}