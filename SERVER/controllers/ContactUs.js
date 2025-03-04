const { BadRequestError } = require("../errors");
const mailSender = require("../utils/mailSender");

//get data from contact us form and send an email user  and an email to yourself
const myEmailId = "manandudeja6@gmail.com";
exports.contactUs = async (req, res) => {
  try {
    //get data
    const { firstName, lastName, email, contactNumber, message } = req.body;
    console.log(req.body);
    //validate
    if (!firstName || !email || !contactNumber || !message)
      throw new BadRequestError("All fields are required");

    //send an email to user

    await mailSender(
      email,
      "Thanks for contacting study notion",
      `<p>Our team will contact you soon.</p>`
    );
    let name = firstName;
    if (lastName) name = firstName + " " + lastName;
    //send an email to yourself
    await mailSender(
      myEmailId,
      "Contact Us mail",
      `<h2>Contact Us mail</h2>
    <p>Name : ${name}</p>
    <p>email : ${email}</p>
    <p>contact Number : ${contactNumber}</p>
    <p>message : ${message}</p>
    `
    );
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
  }
};
