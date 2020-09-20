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

class PerformanceDialog extends ComponentDialog {
    constructor(dialogId) {
        super(dialogId);
        // Add control flow dialogs
        this.initialDialogId = "PerformanceWaterfall";
        this.addDialog(
            new WaterfallDialog("PerformanceWaterfall", [
                async (step) => {
                    await step.context.sendActivity("READ Policy");
                    return step.endDialog();
                },
            ])
        );


    }
}
module.exports.PerformanceDialog = PerformanceDialog;