const moment = require("moment");
const cron = require("node-cron");
const axios = require("axios");
const { mailService } = require("./mail");
const { pinCode } = require("./key");

const numberOfDays = (number = 1) =>
  Array(number)
    .fill(null)
    .map((_, index) => moment().add(index, "days").format("DD-MM-YYYY"));

const notifyMe = (available, data) => {
  mailService(available, JSON.stringify(data, null, "\t"), (error, result) => {
    console.log({ error, result });
  });
};

const getApiResponse = async date => {
  try {
    const result = await axios.get(
      `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pinCode}&date=${date}`,
      { headers: { accept: "application/json", "Accept-Language": "hi_IN" } }
    );
    return result ? result.data : null;
  } catch (e) {
    return null;
  }
};

let count = 0;
const checkAvailability = async () => {
  count = count + 1;
  const dates = numberOfDays(30);
  const data = await Promise.all(dates.map(date => getApiResponse(date)));
  const availableSlots = data.filter(
    item => item && item.sessions && item.sessions.length
  );
  if (availableSlots.length) {
    // whenever available keep on notifying every minute
    notifyMe(true, availableSlots);
  } else if (count % 120 === 0) {
    // every 2 hour notify that service is running but vaccine is not available
    notifyMe(false, { count, message: "Not available yet" });
  } else {
    console.log(count, "Not available yet");
  }
};

const main = async () => {
  try {
    cron.schedule("* * * * *", async () => {
      await checkAvailability();
    });
  } catch (e) {
    console.log(e);
  }
};

main().then(() => {
  console.log("Vaccine availability checking started");
});
