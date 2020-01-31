import { Select } from "antd";
import React from "react";
import moment from "moment";
import _ from "lodash";
import { mapView } from "../common/Duration";

const { Option } = Select;

export const savingChartData = (data, durationView) => {
  let graphData1 = [];
  const savings = data.savings;
  const extraRetirementSavingses = data.extraRetirementSavingses;
  let primaryTotalSaving = 0;
  let spouseTotalSaving = 0;
  let primaryExtraTotalSaving = 0;
  let spouseExtraTotalSaving = 0;
  for (let i in savings) {
    graphData1.push({
      topic: savings[i].saving_type.saving_type,
      month: moment(savings[i].transactionDate).format("MMMM"),
      primarySavings: Math.round(
        (savings[i].saving_amount *
          mapView[savings[i].duration][savings[i].duration]) /
          mapView[durationView][durationView]
      ),
      spouseSavings: Math.round(
        (savings[i].spouse_amount *
          mapView[savings[i].spouse_duration][savings[i].spouse_duration]) /
          mapView[durationView][durationView]
      ),
      primaryExtraRetirementSavingses: 0,
      spouseExtraRetirementSavingses: 0,
      salary_benefit:
        Math.round(
          (savings[i].saving_amount *
            mapView[savings[i].duration][savings[i].duration]) /
            mapView[durationView][durationView]
        ) +
        Math.round(
          (savings[i].spouse_amount *
            mapView[savings[i].spouse_duration][savings[i].spouse_duration]) /
            mapView[durationView][durationView]
        )
    });

    primaryTotalSaving =
      primaryTotalSaving +
      Math.round(
        (savings[i].saving_amount *
          mapView[savings[i].duration][savings[i].duration]) /
          mapView[durationView][durationView]
      );
    spouseTotalSaving =
      spouseTotalSaving +
      Math.round(
        (savings[i].spouse_amount *
          mapView[savings[i].spouse_duration][savings[i].spouse_duration]) /
          mapView[durationView][durationView]
      );
  }
  for (let i in extraRetirementSavingses) {
    graphData1.push({
      topic:
        extraRetirementSavingses[i].extra_retirement_saving_type
          .extra_retirement_saving_type,
      month: moment(extraRetirementSavingses[i].transactionDate).format("MMMM"),
      primaryExtraRetirementSavingses: Math.round(
        (extraRetirementSavingses[i].extra_retirement_saving_amount *
          mapView[extraRetirementSavingses[i].duration][
            extraRetirementSavingses[i].duration
          ]) /
          mapView[durationView][durationView]
      ),
      spouseExtraRetirementSavingses: Math.round(
        (extraRetirementSavingses[i].spouse_amount *
          mapView[extraRetirementSavingses[i].spouse_duration][
            extraRetirementSavingses[i].spouse_duration
          ]) /
          mapView[durationView][durationView]
      ),
      primarySavings: 0,
      spouseSavings: 0,
      salary_benefit:
        Math.round(
          (extraRetirementSavingses[i].extra_retirement_saving_amount *
            mapView[extraRetirementSavingses[i].duration][
              extraRetirementSavingses[i].duration
            ]) /
            mapView[durationView][durationView]
        ) +
        Math.round(
          (extraRetirementSavingses[i].spouse_amount *
            mapView[extraRetirementSavingses[i].spouse_duration][
              extraRetirementSavingses[i].spouse_duration
            ]) /
            mapView[durationView][durationView]
        )
    });

    primaryExtraTotalSaving =
      primaryExtraTotalSaving +
      Math.round(
        (extraRetirementSavingses[i].extra_retirement_saving_amount *
          mapView[extraRetirementSavingses[i].duration][
            extraRetirementSavingses[i].duration
          ]) /
          mapView[durationView][durationView]
      );
    spouseExtraTotalSaving =
      spouseExtraTotalSaving +
      Math.round(
        (extraRetirementSavingses[i].spouse_amount *
          mapView[extraRetirementSavingses[i].spouse_duration][
            extraRetirementSavingses[i].spouse_duration
          ]) /
          mapView[durationView][durationView]
      );
  }
  const month = [];
  let chartData12 = [];
  const result1 = _(graphData1)
    .groupBy("month")
    .map(function(items, month) {
      return {
        month: month,
        name: _.map(items, "topic"),
        data: _.map(items, "salary_benefit")
      };
    })
    .value();
  for (let i in result1) {
    month.push(result1[i].month);
    for (let j in result1[i].name) {
      let temp12 = [...Array(result1.length)].map(x => 0);
      temp12.splice(i, 1, result1[i].data[j]);
      chartData12.push({
        name: result1[i].name[j],
        data: temp12
      });
    }
  }
  const labels = [];
  const series = [];
  _(chartData12)
    .groupBy("name")
    .map(function(item, name) {
      labels.push(name);
      series.push(item[0].data.reduce((a, b) => a + b, 0));
    })
    .value();
  let primarySavings = 0;
  let spouseSavings = 0;
  let primaryExtraRetirementSavingses = 0;
  let spouseExtraRetirementSavingses = 0;

  graphData1.filter(value => {
    primarySavings = primarySavings + value.primarySavings;
    spouseSavings = spouseSavings + value.spouseSavings;
    primaryExtraRetirementSavingses =
      primaryExtraRetirementSavingses + value.primaryExtraRetirementSavingses;
    spouseExtraRetirementSavingses =
      spouseExtraRetirementSavingses + value.spouseExtraRetirementSavingses;
  });

  let paiChartData = [
    primarySavings,
    spouseSavings,
    primaryExtraRetirementSavingses,
    spouseExtraRetirementSavingses
  ];
  const paiChartLabels = [
    "Primary Savings",
    "Spouse Savings",
    "Primary Extra Saving",
    "Spouse Extra Saving"
  ];
  return {
    chartData12,
    month,
    paiChartData,
    labels,
    series,
    paiChartLabels,
    primaryTotalSaving,
    spouseTotalSaving,
    primaryExtraTotalSaving,
    spouseExtraTotalSaving
  };
};

export const getEChartData = (
  data,
  title,
  subTitle,
  categoryType,
  categoryType1,
  categoryAmount
) => {
  const seriesCategory = [];
  const seriesName = title;
  const seriesData = [];
  for (let i in data) {
    if (data.hasOwnProperty(i) && data[i][categoryAmount] > 0) {
      seriesCategory.push(data[i][categoryType][categoryType1]);
      seriesData.push({
        value: data[i][categoryAmount],
        name: data[i][categoryType][categoryType1]
      });
    }
  }
  return [{ title, subTitle, seriesCategory, seriesData, seriesName }];
};

export const getActualBudgetData=(data)=>{
  const resultData=groupProjects(data);
  const barChartDat=[];
  for (let i in resultData){
    barChartDat.push(resultData[i].trackerAmount)
  }
  return barChartDat;

};

export const getTrackerEChartData = (
  data,
  title,
  subTitle,
  categoryType,
  categoryType1,
  categoryAmount
) => {
  const seriesCategory = [];
  const seriesName = title;
  const seriesData = [];
  for (let i in data) {
    if (data.hasOwnProperty(i) && data[i][categoryAmount] > 0) {
      seriesCategory.push(data[i][categoryType][categoryType1].split("|")[1]);
      seriesData.push({
        value: data[i][categoryAmount],
        name: data[i][categoryType][categoryType1].split("|")[1]
      });
    }
  }
  return [{ title, subTitle, seriesCategory, seriesData, seriesName }];
};

export const getTrackerEChartDataByCategory = (
  data,
  title,
  subTitle,
  categoryType,
  categoryAmount
) => {
  const seriesCategory = [];
  const seriesName = title;
  const seriesData = [];
  for (let i in data) {
    if (data.hasOwnProperty(i) && data[i][categoryAmount] > 0) {
      seriesCategory.push(data[i][categoryType]);
      seriesData.push({
        value: data[i][categoryAmount],
        name: data[i][categoryType]
      });
    }
  }
  return [{ title, subTitle, seriesCategory, seriesData, seriesName }];
};

const totalHours = function(total, project) {
  return total + project.trackerAmount;
};

const sumProjects = function(projects) {
  return {
    subCategoryName: projects[0].subCategoryName,
    trackerAmount: _.reduce(projects, totalHours, 0)
  };
};

const sumCategoryProjects = function(projects) {
  return {
    categoryName: projects[0].categoryName,
    trackerAmount: _.reduce(projects, totalHours, 0)
  };
};

const groupProjects = function(projects) {
  return _.chain(projects)
    .groupBy("categoryName")
    .map(sumCategoryProjects)
    .value();
};

const groupSubCategoryProjects = function(projects) {
  return _.chain(projects)
      .groupBy("subCategoryName")
      .map(sumProjects)
      .value();
};


export const getActualBudgetBarChartDataByMonth = (
    data,
    title,
    subTitle,
    categoryType,
    categoryAmount
) => {
  const groups = _.groupBy(data, "trackerMonth");
  const result1 = _.map(groups, function(group) {
    return {
      trackerMonth: group[0].trackerMonth,
      subCategoryName: groupSubCategoryProjects(group)
    };
  });
 const xAxis = [];
  const legendData = [];
  const seriesData = [];

  for (let i in result1) {
    xAxis.push(result1[i].trackerMonth);
    for (let j in result1[i].subCategoryName) {
      let temp12 = [...Array(result1.length)].map(x => 0);
      temp12.splice(i, 1, result1[i].subCategoryName[j].trackerAmount);
      seriesData.push({
        name: result1[i].subCategoryName[j].subCategoryName,
        type: "bar",
        data: temp12
      });
    }
  }

  const t1 = _(data)
      .groupBy("subCategoryName")
      .map(function(items, subCategoryName) {
        return {
          subCategoryName: subCategoryName
        };
      })
      .value();
  for (let i in t1) {
    legendData.push(t1[i].subCategoryName);
  }
  return [{ title, subTitle, xAxis, legendData, seriesData }];
};


export const getTrackerBarChartDataByMonth = (
  data,
  title,
  subTitle,
  categoryType,
  categoryAmount
) => {
  const groups = _.groupBy(data, "trackerMonth");

  const result1 = _.map(groups, function(group) {
    return {
      trackerMonth: group[0].trackerMonth,
      categoryName: groupProjects(group)
    };
  });

  console.log(result1);
  const xAxis = [];
  const legendData = [];
  const seriesData = [];

  for (let i in result1) {
    xAxis.push(result1[i].trackerMonth);
    for (let j in result1[i].categoryName) {
      let temp12 = [...Array(result1.length)].map(x => 0);
      temp12.splice(i, 1, result1[i].categoryName[j].trackerAmount);
      seriesData.push({
        name: result1[i].categoryName[j].categoryName,
        type: "bar",
        data: temp12
      });
    }
  }

  const t1 = _(data)
    .groupBy("categoryName")
    .map(function(items, categoryName) {
      return {
        categoryName: categoryName
      };
    })
    .value();
  for (let i in t1) {
    legendData.push(t1[i].categoryName);
  }
  return [{ title, subTitle, xAxis, legendData, seriesData }];
};