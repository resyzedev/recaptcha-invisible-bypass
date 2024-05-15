const axios = require("axios");
const querystring = require("querystring");

async function simulateRecaptchaVerification(anchorUrl, chrValues, vh, bg) {
  try {
    const keysite = anchorUrl.split("k=")[1].split("&")[0];
    const varCo = anchorUrl.split("co=")[1].split("&")[0];
    const varV = anchorUrl.split("v=")[1].split("&")[0];
    const hl = anchorUrl.split("hl=")[1].split("&")[0];

    const r1 = await axios.get(anchorUrl, {
      httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
    });
    const token1 = r1.data.split('recaptcha-token" value="')[1].split('">')[0];

    const varChr = querystring.escape(chrValues);

    console.log("\nBypassing reCaptcha invisible...");

    // prepare payload
    const payload = {
      v: varV,
      reason: "q",
      c: token1,
      k: keysite,
      co: varCo,
      hl: hl,
      size: "invisible",
      chr: varChr,
      vh: vh,
      bg: bg,
    };

    const r2 = await axios.post(
      `https://www.google.com/recaptcha/api2/reload?k=${keysite}`,
      querystring.stringify(payload),
      {
        httpsAgent: new (require("https").Agent)({ rejectUnauthorized: false }),
      }
    );

    let token2;
    try {
      token2 = r2.data.split('"rresp","')[1].split('"')[0];
    } catch (e) {
      token2 = "null";
    }

    if (token2 === "null") {
      console.log("\nRecaptcha not verified: \n\n" + r2.data);
    } else {
      console.log("\nRecaptcha Response: \n\n" + token2);
    }
  } catch (err) {
    console.log("\nError not bypassed: " + err.message);
  }
}

module.exports = {
  simulateRecaptchaVerification,
};
