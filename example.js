const { simulateRecaptchaVerification } = require("./src/bypass");

/* required */
const anchorUrl =
  "https://www.google.com/recaptcha/api2/anchor?ar=1&k=x&co=x&hl=pt-BR&v=x&size=invisible&badge=bottomleft&cb=t8i93nwugo54";

/* not required */
const chrValues = "";
const vh = "";
const bg = "";

simulateRecaptchaVerification(anchorUrl, chrValues, vh, bg);
