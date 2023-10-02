# VendingMachine

This was a simple app created as part of a tech interview. The purpose of this was to build a vending machine. There were a detailed set of requirements but I don't have those to hand any more.

## To run

-   pull repo
-   `yarn`
-   `yarn start`

## Notes

-   Half the screen is the control panel. Use the buttons to interact with the machine.
-   The other half is the output, here you can see your credit, any messages from the machine, as well as the contents of the change tray/vending tray.
-   Open the console to inspect the state. Here you can see all actions as they occur and what the state of the machine is before and after each action.

## Random thoughts

Made use of Reactive architecture to handle concurrency. Should be almost impossible to break it.
