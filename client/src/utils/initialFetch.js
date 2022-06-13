export default async function monthData(month, year) {
  const response = await fetch(
    `http://localhost:3001/api/transactions/?month=${month}&year=${year}`
  );
  const data = await response.json();
  return data;
}
