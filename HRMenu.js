const {
  ComponentDialog,
  NumberPrompt,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
  ChoiceFactory,
  ListStyle,
} = require("botbuilder-dialogs");
const { LMDialog } = require("./HRDialogs/LMDialog");
const { CreateUserDialog } = require("./HRDialogs/CreateUserDialog.js");
const { PayrollDialog } = require("./HRDialogs/PayrollDialog");

HRMenuChoiceArray = [
  "Leave Management",
  "Payroll",
  "Recruitment",
  "L&D",
  "Survey",
  "Holiday Calendar",
  "Performance Management",
  "Create a User",
];
class HRDialog extends ComponentDialog {
  constructor(dialogId) {
    super(dialogId);
    this.initialDialogId = "HRMenuHandler";
    this.addDialog(new LMDialog("LM"));
    this.addDialog(new PayrollDialog("Pa"));
    this.addDialog(new CreateUserDialog("CU"));
    this.addDialog(new ChoicePrompt("HRMenuChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("HRMenuHandler", [
        async (step) => {
          return await step.prompt("HRMenuChoicePrompt", {
            choices: ChoiceFactory.toChoices(HRMenuChoiceArray),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Leave Management":
              return await step.beginDialog("LM");
              break;
            case "Payroll":
              return await step.beginDialog("Pa");
            case "Recruitment":
              return await step.beginDialog("RecruitmentWaterfall");
            case "L&D":
              return await step.beginDialog("LDWaterfall");
            case "Survey":
              return await step.beginDialog("SurveyWaterfall");
            case "Holiday Calendar":
              return await step.beginDialog("CalendarWaterfall");

            case "Performance Management":
              return await step.beginDialog("PerformanceWaterfall");
            case "Create a User":
              return await step.beginDialog("CU");
              var axios = require("axios");

              var config = {
                method: "get",
                url:
                  "https://hss.cognitusconsulting.com:5200/sap/opu/odata/sap/ZCHAT_BOTS_SRV/CreateUserIdSet(JobRole=%27Developer%27,MailId=%27rlamba@cognitus.one%27)",
                headers: {
                  Authorization: "Basic cmxhbWJhOkhTUzEyMzQ1Ng==",
                },
              };

              axios(config)
                .then(function (response) {
                  // let a = JSON.parse(response.data);
                  // console.log(response.data);
                  console.log(JSON.stringify(response.data.d.UserExists));
                })
                .catch(function (error) {
                  console.log(error);
                });
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
  }
}
module.exports.HRMenu = HRDialog;
