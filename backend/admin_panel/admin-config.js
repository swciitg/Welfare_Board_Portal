import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import AboutUs from "../models/aboutUs.js";
import Contacts from "../models/contact.js";
import Event from "../models/event.js";
import Facilities from "../models/facilities.js";
import TeamMember from "../models/teamMember.js";
import clubMain from "../models/clubMain.js";
import homepage from "../models/general.js";

const ADMINPANELROOT = "/welfare-board/api/admin";

const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
};

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return DEFAULT_ADMIN;
  }
  return null;
};

const adminOptions = {
  resources: [
    AboutUs, 
    {
      resource: Contacts,
      options: {
        properties: {
          name: {
            type: 'string',
            isTitle: true,
          },
          category: {
            availableValues: [
              { value: 'Chairpersons', label: 'Chairpersons' },
              { value: 'Core Team', label: 'Core Team' },
              { value: 'Department Heads', label: 'Department Heads' },
              { value: 'Club Secretaries', label: 'Club Secretaries' },
              { value: 'Hostel Secretaries', label: 'Hostel Secretaries' },
              { value: 'Emergency', label: 'Emergency Contact' },
              { value: 'Anti-Ragging', label: 'Anti-Ragging Helpline' },
            ],
          },
          priority: {
            type: 'number',
            description: 'Higher numbers appear first within each category',
          },
          'socialLinks.phoneNo': {
            type: 'string',
          },
          'socialLinks.mailId': {
            type: 'string',
          },
          'socialLinks.linkedin': {
            type: 'string',
          },
        },
        listProperties: ['name', 'designation', 'category', 'priority'],
        filterProperties: ['category', 'name', 'designation'],
        editProperties: ['name', 'designation', 'department', 'description', 'category', 'priority', 'image', 'socialLinks.phoneNo', 'socialLinks.mailId', 'socialLinks.linkedin'],
        showProperties: ['name', 'designation', 'department', 'description', 'category', 'priority', 'image', 'socialLinks.phoneNo', 'socialLinks.mailId', 'socialLinks.linkedin', 'createdAt'],
      },
    },
    Event, 
    Facilities, 
    TeamMember, 
    clubMain,
    homepage
  ],
  branding: {
      companyName: "SWB IITG",
      logo: false,
      withMadeWithLove: false,
  },
  rootPath: ADMINPANELROOT,
  loginPath: ADMINPANELROOT + "/login",
  logoutPath: ADMINPANELROOT + "/logout",
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate,
  cookieName: process.env.COOKIE_NAME,
  cookiePassword: process.env.COOKIE_PASSWORD,
});
try {
  admin.watch();
} catch (err) {
  console.log(err);
}

export { admin, adminRouter };
