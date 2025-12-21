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
        actions: {
          new: {
            before: async (request) => {
              const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
              days.forEach(day => {
                if (request.payload[`schedule.${day}.time`] === '' || !request.payload[`schedule.${day}.time`]) {
                  request.payload[`schedule.${day}.time`] = 'Closed';
                }
                if (request.payload[`schedule.${day}.location`] === '' || !request.payload[`schedule.${day}.location`]) {
                  request.payload[`schedule.${day}.location`] = 'New Sac Building';
                }
              });
              return request;
            },
          },
          edit: {
            before: async (request) => {
              const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
              days.forEach(day => {
                if (request.payload[`schedule.${day}.time`] === '' || !request.payload[`schedule.${day}.time`]) {
                  request.payload[`schedule.${day}.time`] = 'Closed';
                }
                if (request.payload[`schedule.${day}.location`] === '' || !request.payload[`schedule.${day}.location`]) {
                  request.payload[`schedule.${day}.location`] = 'New Sac Building';
                }
              });
              return request;
            },
          },
        },
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
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
          },
          'schedule.tuesday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.tuesday.location': {
            type: 'string',
            description: 'Location for Tuesday',
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
          },
          'schedule.wednesday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.wednesday.location': {
            type: 'string',
            description: 'Location for Wednesday',
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
          },
          'schedule.thursday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.thursday.location': {
            type: 'string',
            description: 'Location for Thursday',
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
          },
          'schedule.friday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.friday.location': {
            type: 'string',
            description: 'Location for Friday',
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
          },
          'schedule.saturday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.saturday.location': {
            type: 'string',
            description: 'Location for Saturday',
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
          },
          'schedule.sunday.time': {
            type: 'string',
            description: 'e.g., "9:00 AM - 5:00 PM" or "Closed"',
          },
          'schedule.sunday.location': {
            type: 'string',
            description: 'Location for Sunday',
            availableValues: [
              { value: '', label: '-- Select Location --' },
              { value: 'New Sac Building', label: 'New Sac Building' },
              { value: 'Lohit Hostel', label: 'Lohit Hostel' },
              { value: 'Bramhaputra Hostel', label: 'Bramhaputra Hostel' },
              { value: 'Siang Hostel', label: 'Siang Hostel' },
              { value: 'Kapili Hostel', label: 'Kapili Hostel' },
              { value: 'Dihing Hostel', label: 'Dihing Hostel' },
              { value: 'Manas Hostel', label: 'Manas Hostel' },
              { value: 'Umaim Hostel', label: 'Umaim Hostel' },
              { value: 'Barak Hostel', label: 'Barak Hostel' },
              { value: 'Kameng Hostel', label: 'Kameng Hostel' },
              { value: 'Gaurang Hostel', label: 'Gaurang Hostel' },
              { value: 'Dhansiri Hostel', label: 'Dhansiri Hostel' },
              { value: 'Disang Hostel', label: 'Disang Hostel' },
              { value: 'Subansiri Hostel', label: 'Subansiri Hostel' },
            ],
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
