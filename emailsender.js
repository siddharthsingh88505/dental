import nodemailer from "nodemailer";

// transporter object
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secureConnection: true, // use SSL

    // credential 
    auth: {
        user: "manishsingh05436@gmail.com",
        pass : "bljyvwuqviyelrwt"
    }

});

export { transporter };
