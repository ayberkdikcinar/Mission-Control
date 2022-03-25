
const BASE_URL = "http://localhost:8000"
async function httpGetPlanets() {
  const response = await fetch(`${BASE_URL}/planets`);
  return await response.json();

}

async function httpGetLaunches() {
  const response = await fetch(`${BASE_URL}/launches`);
  return await response.json();

}

async function httpSubmitLaunch(launch) {
  try {
    const response = await fetch(`${BASE_URL}/launches`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(launch)
    });
    return response;

  } catch (error) {
    return { ok: false }
  }

}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${BASE_URL}/launches/${id}`, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
    });
  } catch (error) {
    return { ok: false }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};