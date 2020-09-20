const {
  ComponentDialog,
  NumberPrompt,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
  ChoiceFactory,
  ListStyle,
} = require("botbuilder-dialogs");
payrollMenu = [
  "Salary Slip",
  "Bonus",
  "Reimbursement",
  "PF",
  "Gratuity",
  "Investment Details",
];

class PayrollDialog extends ComponentDialog {
  constructor(dialogID) {
    super(dialogID);
      this.initialDialogID = "PayrollWaterfall";
      this.addDialog(new ChoicePrompt("PayrollChoicePrompt"));
      this.addDialog(new WaterfallDialog("PayrollWaterfall", [
          async (step) => {
              return await step.prompt("PayrollChoicePrompt", {
                  choices: ChoiceFactory.toChoices(payrollMenu),
                  syle: ListStyle.heroCard,
              });
          },
        async (step) => {
          switch (step.result.value) {
            case "Leave Management":
              return await step.beginDialog("Salary Slip");
              break;
            case "Payroll":
              return await step.beginDialog("Bonus");
            case "Recruitment":
              return await step.beginDialog("RecruitmentWaterfall");
            case "L&D":
              return await step.beginDialog("PF");
            case "Survey":
              return await step.beginDialog("Gratuity");
            case "Holiday Calendar":
              return await step.beginDialog("Investment Details");

          }
          return step.endDialog();
        }

          ]));
  }
}
module.exports.PayrollDialog = PayrollDialog;
