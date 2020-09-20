const {
    ComponentDialog,
    NumberPrompt,
    ChoicePrompt,
    TextPrompt,
    WaterfallDialog,
    ChoiceFactory,
    ListStyle,
} = require("botbuilder-dialogs");


class SurveyDialog extends ComponentDialog {
    constructor(dialogID) {
        super(dialogID);
        this.initialDialogID = "SurveyWaterfall";
        this.addDialog(
            new WaterfallDialog("SurveyWaterfall", [
                async (step) => {
                    await step.context.sendActivity("SURVEY");
                    return await step.cancelAllDialogs(true);
                },
            ])
        );
    }
}
module.exports.SurveyDialog = SurveyDialog;


