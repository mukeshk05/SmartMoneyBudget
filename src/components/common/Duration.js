import moment from "moment";
import React from "react";
export const monthFormat = "YYYY/MMMM";
export const selectedDate = new moment();
export const startDate = moment([
  selectedDate._d.getFullYear(),
  selectedDate._d.getMonth(),
  1
]).format("YYYY-MM-DD");
const daysInMonth = moment(startDate).daysInMonth();
const daysInYear = moment(startDate).dayOfYear();
export const yearStartDate = moment(startDate)
  .add(daysInMonth - 1, "days")
  .format("YYYY-MM-DD");
export const endDate = moment(startDate)
  .add(daysInMonth - 1, "days")
  .format("YYYY-MM-DD");
export const yearEndDate = moment(startDate)
  .subtract(daysInYear - 1, "days")
  .format("YYYY-MM-DD");
export const durationType = [
  "Annually",
  "Quarterly",
  "Monthly",
  "Weekly",
  "Fortnightly"
];
export const mapView = [{ 0: 1 }, { 1: 4 }, { 2: 12 }, { 3: 54 }, { 4: 26 }];
