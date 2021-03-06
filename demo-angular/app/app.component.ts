import { Component, ChangeDetectorRef } from "@angular/core";
import { ListView } from "tns-core-modules/ui/list-view";
import { isAndroid } from "tns-core-modules/platform";
import * as imagepicker from "nativescript-imagepicker";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {

    items = [];

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    onSelectMultipleTap() {
        let context = imagepicker.create({
            mode: "multiple"
        });
        this.startSelection(context);
    }

    onSelectSingleTap() {
        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    startSelection(context) {
        let _that = this;

        context
        .authorize()
        .then(() => {
            _that.items = [];
            return context.present();
        })
        .then((selection) => {
            console.log("Selection done:");
            selection.forEach(function (selected) {
                console.log("----------------");
                console.log("uri: " + selected.uri);
                console.log("fileUri: " + selected.fileUri);
            });
            _that.items = selection;
            _that._changeDetectionRef.detectChanges();
        }).catch(function (e) {
            console.log(e);
        });
    }
}
