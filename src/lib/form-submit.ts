/** Both enquiries use the original homepage's browser-side Web3Forms delivery. */
export async function submitForm(payload: Record<string, unknown>, fetcher: typeof fetch = fetch) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetcher('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.success !== true) {
      throw new Error(response.status === 429
        ? 'Too many attempts. Please wait a minute and try again, or email info@nodaltc.com.'
        : 'Your enquiry could not be sent. Your details are still here — please try again or email info@nodaltc.com.');
    }
  } catch (error) {
    if (controller.signal.aborted) throw new Error('The connection timed out. Your details are still here — please try again or email info@nodaltc.com.');
    if (error instanceof TypeError) throw new Error('Unable to connect. Check your internet connection and try again. Your details have been kept.');
    throw error;
  } finally {
    clearTimeout(timer);
  }
}

export function buildBriefPayload(data: FormData, eventType: string | null, accessKey: string) {
  const name = String(data.get('name') || '').trim();
  const email = String(data.get('email') || '').trim();
  return {
    access_key: accessKey, subject: `New brief from ${name || 'the website'}`,
    from_name: 'Nodal TC Website', name, company: data.get('company'), email,
    event_type: eventType || 'Not specified', brief: data.get('brief'), replyto: email,
  };
}
