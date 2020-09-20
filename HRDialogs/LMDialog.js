const {
  ComponentDialog,
  DialogTurnStatus,
  NumberPrompt,
  ChoicePrompt,
  TextPrompt,
  WaterfallDialog,
  ChoiceFactory,
  ListStyle,
} = require("botbuilder-dialogs");
leaveManagementMenu = [
  "Request Leave",
  "Leave Balance",
  "Leave Application Status",
  "Delete Leave Application",
  "cancel",
];
class LMDialog extends ComponentDialog {
  constructor(dialogId) {
    super(dialogId);

    // Add control flow dialogs
    this.addDialog(new ChoicePrompt("LeaveMenu"));
    this.addDialog(
      new WaterfallDialog("LeaveManagementWaterfall", [
        async (step) => {
          return await step.prompt("LeaveMenu", {
            choices: ChoiceFactory.toChoices(leaveManagementMenu),
            style: ListStyle.heroCard,
          });
        },
        async (step) => {
          switch (step.result.value) {
            case "Request Leave":
              break;
            case "Leave Balance":
              break;
            case "Leave Application Status":
              break;
            case "Delete Leave Application":
              break;
          }
          return await step.cancelAllDialogs(true);
        },
      ])
    );
    this.initialDialogId = "LeaveManagementWaterfall";
  }
}
module.exports.LMDialog = LMDialog;
