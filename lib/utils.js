import date from "date-and-time";
const XLSX = require("xlsx-js-style");

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

export function downloadAsExcel(
  data,
  coverageData,
  fileName = "TrackingSheet.xlsx"
) {
  let wscols = [
    { wch: 10 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
    { wch: 20 },
    { wch: 20 },
    { wch: 25 },
    { wch: 25 },
    { wch: 25 },
  ];
  let wsrows = [];
  for (let i = 0; i < data.length; i++) {
    wsrows.push({ hpt: 30 });
  }
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  const ws2 = XLSX.utils.aoa_to_sheet(coverageData);

  ws["!cols"] = wscols;
  ws["!rows"] = wsrows;
  ws2["!cols"] = [{ wch: 50 }, { wch: 50 }];
  ws2["!rows"] = [{ hpt: 30 }, { hpt: 150 }];
  XLSX.utils.book_append_sheet(wb, ws, "Issue");
  XLSX.utils.book_append_sheet(wb, ws2, "Coverage");
  XLSX.writeFile(wb, fileName);
}
