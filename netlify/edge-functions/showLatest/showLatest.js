export default async (request) => {
  async function fetchWordPressVersion() {
    const response = await fetch("https://api.wordpress.org/core/stable-check/1.0/");
    if (!response.ok) throw new Error("Failed to fetch WordPress versions.");

    const versions = await response.json();
    const match = JSON.stringify(versions).match(/"([^"]+)":"latest"/);

    return match ? match[1] : "not found";
}

try {
  const ver = await fetchWordPressVersion();

  const data = { ver };
  const jsonData = JSON.stringify(data);

  return new Response(jsonData, {
      headers: {
          "Content-Type": "application/json",
      },
  });
} catch (error) {
  console.error("An error occurred:", error);
  const errorMessage = "Error: " + error.message;

  const data = { error: errorMessage };
  const jsonErrorData = JSON.stringify(data);

  return new Response(jsonErrorData, {
      status: 500,
      headers: {
          "Content-Type": "application/json",
      },
  });
}
}
