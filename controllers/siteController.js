import { connectDb } from "../db/connectDb.js";
import { dentalModel } from "../models/dentalModel.js";
import { loginModel } from "../models/loginModel.js";
import isJSON from "is-json";
import json2xls from "json2xls";
import fs from "fs";
import { transporter } from "../emailsender.js";
import dotenv from "dotenv";

class SiteController {
    // home page
    static homeController = async (req, res) => {
        res.sendFile("../frontend/index.html");
    }

    // about page
    static aboutController = async (req, res) => {
        res.sendFile("../frontend/about.html");
    }

    // services page
    static servicesController = async (req, res) => {
        res.sendFile("../frontend/services.html");
    }

    // contact page
    static contactController = async (req, res) => {
        res.sendFile("../frontend/contact.html");
    }

    // login page
    static loginController = async (req,res) => {
        res.render("login",{
            isValid: true
        });
    }

    // admin login
    static adminLogin = async (req,res) => {
        console.log(req.body);
        connectDb(process.env.DATABASE_URL);
        const result = await loginModel.find({
            email: req.body.email,
            password: req.body.password
        });
        if(result.length)
        {
            const result = await dentalModel.find();
            res.render("index", {
                text: result.slice(0, 10),
                count: result.length,
                index: 1,
                id: 1,
            });
        }
        else 
        {
            res.render("login",{
                isValid: false
            }); 
        }
    }

    // addData
    static insertData = async (req, res) => {
        connectDb(process.env.DATABASE_URL);
        try {
            console.log(req.body);
            const appointment = new dentalModel({
                name: req.body.name,
                email: req.body.email,
                diagnostic: req.body.diagnostics,
                doctor: req.body.doctor,
                contact: req.body.contact,
                date: req.body.date,
                time: req.body.time
            });
            await appointment.save();

            // mail object
            const mailOptions = {
                from: {
                name: "Good Smile Dental Clinic",
                address: "manishsingh05436@gmail.com"
                },

                to: req.body.email, //allowed comma separated mutiple emails
                //

                // subject
                subject: "Your Appointement is scheduled",

                // html
                html: `<h3 style='color: red; '>Hey ${req.body.name},<br>Please find attachment below.<br></h3 >
                    <p>Regards</p>
                    <p><b><i>Good Smile</i></b></p>
                    <p><b><i>Mumbai - 401209</i></b></p>`,
    
                // attachment
                // attachments: [{
                //     path: "./invoice.png"
                // }
                // ]
            }

            transporter.sendMail(mailOptions, (err, res) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(res.response)
                }
            });

            res.send("submitted");
            
        }
        catch (error) {
            res.send(error);
        }
    }

    // json to excel
    static jsontoexcel = async (req, res) => {
        try {
            const result = await dentalModel.find().select("name diagnostic doctor date time contact email");
            let modified_result = [];
            result.forEach((value, index) => {
                modified_result.push({
                    name: value.name,
                    diagnostic: value.diagnostic,
                    doctor: value.doctor,
                    date: value.date,
                    time: value.time,
                    contact: value.contact,
                    email: value.email
                });
            });
            if (isJSON(JSON.stringify(modified_result))) {
                console.log("yes")
                let xls = json2xls(JSON.parse(JSON.stringify(modified_result)));
                fs.writeFileSync("data.xlsx", xls, "binary");
                res.download("data.xlsx", () => {
                console.log("files downloaded");
            });
            }
            console.log("done");
        }
        catch (error) {
            console.log(error)
        }
    };
}

export { SiteController };
