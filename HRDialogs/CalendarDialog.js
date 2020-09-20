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

class CalendarDialog extends ComponentDialog {
    constructor(dialogId) {
        super(dialogId);
        // Add control flow dialogs
        this.initialDialogId = "CalendarWaterfall";
        this.addDialog(
            new WaterfallDialog("CalendarWaterfall", [
                async (step) => {
                    await step.context.sendActivity("CALENDAR");
                    return await step.endDialog();
                },
            ])
        );

        
    }
}
module.exports.CalendarDialog = CalendarDialog;
