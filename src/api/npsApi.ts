
const BASE_URL = 'https://developer.nps.gov/api/v1';
const API_KEY = import.meta.env.VITE_NPS_API_KEY;
const headers = { 'X-Api-Key': API_KEY };

export async function fetchParks(stateCode?: string) {
  const params = new URLSearchParams({ limit: '500' }) // ← bump this up
  if (stateCode) params.set('stateCode', stateCode)
  const res = await fetch(`${BASE_URL}/parks?${params}`, { headers })
  if (!res.ok) throw new Error(`fetchParks failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function fetchParkByCode(parkCode: string) {
  const res = await fetch(`${BASE_URL}/parks?parkCode=${parkCode}`, { headers })
  if (!res.ok) throw new Error(`fetchParkByCode failed: ${res.status} ${res.statusText}`)
  return res.json()
}

export async function fetchThingsToDo(parkCode: string) {
    const res = await fetch(`${BASE_URL}/thingstodo?parkCode=${parkCode}&limit=50`, { headers });
    if (!res.ok) throw new Error(`fetchThingsToDo failed: ${res.status} ${res.statusText}`);

    return res.json();
}

export async function fetchVisitorCenters(parkCode: string) {
    const res = await fetch (`${BASE_URL}/visitorcenters?parkCode=${parkCode}&limit=50`, { headers });
    if (!res.ok) throw new Error(`fetchVisitorCenters failed: ${res.status} ${res.statusText}`);

    return res.json();
}

export async function fetchAlerts(parkCode: string) {
    const res = await fetch (`${BASE_URL}/alerts?parkCode=${parkCode}&limit=50`, { headers });
    if (!res.ok) throw new Error(`fetchAlerts failed: ${res.status} ${res.statusText}`);

    return res.json();
}