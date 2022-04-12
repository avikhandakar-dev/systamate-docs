import date from "date-and-time";

export async function fetchPostJSON(url, data) {
  try {
    const response = await fetch(url, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data || {}),
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchDeleteJSON(url, data) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data || {}),
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function fetchGetJSON(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
    });
    return await response.json();
  } catch (err) {
    throw new Error(err.message);
  }
}

export function jsonResponse(status, data, init) {
  return new Response(JSON.stringify(data), {
    ...init,
    status,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}

export function setUserCookie(key, value, response) {
  response.cookie(key, value, { httpOnly: true });

  return response;
}

export function dateToString(dateTime) {
  const dt = new Date(dateTime);
  return date.format(dt, "ddd, MMM DD YYYY");
}
