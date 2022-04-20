import date from "date-and-time";
const XLSX = require("xlsx");

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

export async function fetchPutJSON(url, data) {
  try {
    const response = await fetch(url, {
      method: "PUT",
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

export function getAvatar(str) {
  if (!str) return "";
  const matches = str.match(/\b(\w)/g);
  const acronym = matches.join("");
  return acronym.substring(0, 2).toUpperCase();
}

export function downloadAsExcel(data, fileName = "TrackingSheet.xlsx") {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  var wscols = [
    { wch: 10 },
    { wch: 10 },
    { wch: 15 },
    { wch: 15 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 12 },
    { wch: 20 },
    { wch: 25 },
    { wch: 10 },
    { wch: 12 },
    { wch: 12 },
    { wch: 15 },
    { wch: 18 },
    { wch: 20 },
    { wch: 20 },
  ];

  ws["!cols"] = wscols;
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, fileName);
}
