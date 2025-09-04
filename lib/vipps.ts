// Vipps API configuration and helper functions

export interface VippsConfig {
  clientId: string
  clientSecret: string
  msn: string
  subscriptionKey: string
  baseUrl: string
}

export const VIPPS_CONFIG: VippsConfig = {
  clientId: process.env.VIPPS_CLIENT_ID!,
  clientSecret: process.env.VIPPS_CLIENT_SECRET!,
  msn: process.env.VIPPS_MSN!,
  subscriptionKey: process.env.VIPPS_SUBSCRIPTION_KEY!,
  baseUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://api.vipps.no'
      : 'https://apitest.vipps.no',
}

export interface VippsAccessToken {
  access_token: string
  token_type: string
  expires_in: number
  scope: string
}

export interface VippsPaymentRequest {
  amount: number
  currency: string
  orderId: string
  redirectUrl: string
  userFlow: 'QUICK_PAY' | 'CHECKOUT'
  paymentDescription: string
  reference?: string
}

export interface VippsPaymentResponse {
  url: string
  orderId: string
  sessionId: string
}

export class VippsAPI {
  private accessToken: string | null = null
  private tokenExpiry: number | null = null

  async getAccessToken(): Promise<string> {
    // Sjekk om vi har et gyldig token
    if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.accessToken
    }

    const response = await fetch(`${VIPPS_CONFIG.baseUrl}/accessToken/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        client_id: VIPPS_CONFIG.clientId,
        client_secret: VIPPS_CONFIG.clientSecret,
        'Ocp-Apim-Subscription-Key': VIPPS_CONFIG.subscriptionKey,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Failed to get Vipps access token: ${response.statusText}`
      )
    }

    const tokenData: VippsAccessToken = await response.json()

    this.accessToken = tokenData.access_token
    this.tokenExpiry = Date.now() + tokenData.expires_in * 1000 - 60000 // 1 min buffer

    return this.accessToken
  }

  async createPayment(
    paymentRequest: VippsPaymentRequest
  ): Promise<VippsPaymentResponse> {
    const token = await this.getAccessToken()

    const response = await fetch(
      `${VIPPS_CONFIG.baseUrl}/checkout/v3/session`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'Ocp-Apim-Subscription-Key': VIPPS_CONFIG.subscriptionKey,
          'Merchant-Serial-Number': VIPPS_CONFIG.msn,
          'Idempotency-Key': paymentRequest.orderId,
        },
        body: JSON.stringify({
          amount: {
            value: paymentRequest.amount * 100, // Vipps bruker øre
            currency: paymentRequest.currency,
          },
          paymentMethod: {
            type: 'WALLET',
          },
          reference: paymentRequest.reference || paymentRequest.orderId,
          userFlow: paymentRequest.userFlow,
          returnUrl: paymentRequest.redirectUrl,
          paymentDescription: paymentRequest.paymentDescription,
        }),
      }
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Failed to create Vipps payment: ${response.statusText} - ${errorText}`
      )
    }

    const data = await response.json()

    return {
      url: data.checkoutFrontendUrl,
      orderId: paymentRequest.orderId,
      sessionId: data.sessionId,
    }
  }

  async getPaymentStatus(orderId: string): Promise<Record<string, unknown>> {
    const token = await this.getAccessToken()

    const response = await fetch(
      `${VIPPS_CONFIG.baseUrl}/checkout/v3/session/${orderId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Ocp-Apim-Subscription-Key': VIPPS_CONFIG.subscriptionKey,
          'Merchant-Serial-Number': VIPPS_CONFIG.msn,
        },
      }
    )

    if (!response.ok) {
      throw new Error(
        `Failed to get Vipps payment status: ${response.statusText}`
      )
    }

    return await response.json()
  }
}

export const vippsAPI = new VippsAPI()
