const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (email, summary) => {

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "AI Sales Insight Summary",
    html: `
      <h2>AI Sales Insight Summary</h2>
      <p>${summary}</p>
    `
  });

};