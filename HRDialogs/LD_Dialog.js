const {
    ComponentDialog,
    NumberPrompt,
    ChoicePrompt,
    TextPrompt,
    WaterfallDialog,
    ChoiceFactory,
    ListStyle,
} = require("botbuilder-dialogs");


class LD_Dialog extends ComponentDialog {
    constructor(dialogID) {
        super(dialogID);
        this.initialDialogID = "LDWaterfall";
        this.addDialog(new ChoicePrompt("LDMainMenu"));
        this.addDialog(
            new WaterfallDialog("LDWaterfall", [
                async (step) => {
                    return await step.prompt("LDMainMenu", {
                        choices: ChoiceFactory.toChoices([
                            "My Portfolio",
                            "Training Courses",
                            "Add Certificates",
                            "Add Skills",
                        ]),
                        style: ListStyle.heroCard,
                    });
                },
                async (step) => {
                    switch (step.result.value) {
                        case "My Portfolio":
                            break;
                        case "Training Courses":
                            break;
                        case "Add Certificates":
                            break;
                        case "Add Skills":
                            break;
                    }
                    return await step.endDialog();
                },
            ])
        );
    }
}
module.exports.LD_Dialog = LD_Dialog;
