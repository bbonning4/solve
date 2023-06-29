const { APP_ID, APP_KEY } = process.env;

module.exports = async function (image) {
  const apiURL = "https://api.mathpix.com/v3/text";
  const headers = {
    "Content-Type": "application/json",
    app_id: APP_ID,
    app_key: APP_KEY,
  };

  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ src: image, formats: ["text"] }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.text;
    } else {
      throw new Error("Error processing image");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error processing image");
  }
};
