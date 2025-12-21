import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import * as AdminJSMongoose from "@adminjs/mongoose";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import AboutUs from "../models/aboutUs.js";
import Contacts from "../models/contact.js";
import Counselor from "../models/counselor.js";
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
    Contacts,
    {
      resource: Counselor,
      options: {
        properties: {
          name: {
            type: 'string',
            isTitle: true,
          },
          priority: {
            type: 'number',
            description: 'Higher numbers appear first. Use to control display order.',
          },
          isActive: {
            type: 'boolean',
            description: 'Only active counselors are shown on the website',
          },
          'schedule.monday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.monday.location': {
            type: 'string',
            description: 'Location for Monday',
          },
          'schedule.tuesday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.tuesday.location': {
            type: 'string',
            description: 'Location for Tuesday',
          },
          'schedule.wednesday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.wednesday.location': {
            type: 'string',
            description: 'Location for Wednesday',
          },
          'schedule.thursday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.thursday.location': {
            type: 'string',
            description: 'Location for Thursday',
          },
          'schedule.friday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.friday.location': {
            type: 'string',
            description: 'Location for Friday',
          },
          'schedule.saturday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.saturday.location': {
            type: 'string',
            description: 'Location for Saturday',
          },
          'schedule.sunday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.sunday.location': {
            type: 'string',
            description: 'Location for Sunday',
          },
        },
        listProperties: ['name', 'specialization', 'mobile', 'isActive', 'priority'],
        filterProperties: ['name', 'specialization', 'isActive'],
        editProperties: [
          'name', 
          'photo', 
          'mobile', 
          'email', 
          'landline', 
          'specialization', 
          'priority',
          'isActive',
          'schedule.monday.time',
          'schedule.monday.location',
          'schedule.tuesday.time',
          'schedule.tuesday.location',
          'schedule.wednesday.time',
          'schedule.wednesday.location',
          'schedule.thursday.time',
          'schedule.thursday.location',
          'schedule.friday.time',
          'schedule.friday.location',
          'schedule.saturday.time',
          'schedule.saturday.location',
          'schedule.sunday.time',
          'schedule.sunday.location',
        ],
        showProperties: [
          'name', 
          'photo', 
          'mobile', 
          'email', 
          'landline', 
          'specialization', 
          'priority',
          'isActive',
          'schedule.monday.time',
          'schedule.monday.location',
          'schedule.tuesday.time',
          'schedule.tuesday.location',
          'schedule.wednesday.time',
          'schedule.wednesday.location',
          'schedule.thursday.time',
          'schedule.thursday.location',
          'schedule.friday.time',
          'schedule.friday.location',
          'schedule.saturday.time',
          'schedule.saturday.location',
          'schedule.sunday.time',
          'schedule.sunday.location',
          'createdAt'
        ],
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
