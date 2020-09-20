const {
  ComponentDialog,
  NumberPrompt,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
  ChoiceFactory,
  ListStyle,
} = require("botbuilder-dialogs");

recruitment = ["Refer", "IJP"];

class RecruitmentDialog extends ComponentDialog {
  constructor(dialogID) {
    super(dialogID);
    this.initialDialogID = "RecruitmentWaterfall";
    this.addDialog(new ChoicePrompt("RecruitmentChoicePrompt"));
    this.addDialog(
      new WaterfallDialog("RecruitmentWaterfall", [
        async (step) => {
          return await step.prompt("PayrollChoicePrompt", {
            choices: ChoiceFactory.toChoices(payrollMenu),
            syle: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Leave Management":
              return await step.beginDialog("Refer");
              break;
            case "Payroll":
              return await step.beginDialog("IJP");
          }
          return step.endDialog();
        },
      ])
    );
  }
}
module.exports.RecruitmentDialog = RecruitmentDialog;
