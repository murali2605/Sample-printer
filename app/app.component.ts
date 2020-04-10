import { Component } from "@angular/core";
import * as Zebra from "nativescript-print-zebra";
import * as appSettings from "application-settings";
import { Bluetoothservice } from "./services/bluetooth.service";


@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public printId = "";
    public defaults = {
        'language': "", 'macAddress': ""
    };
    public myPrinter: any;
    private document: any;
    private currentPrint: any;
    constructor(private _bluetooth: Bluetoothservice) { }

    discovery() {
        var discover = new Zebra.Discovery();
        let self = this;
        discover.searchBluetooth().then(function (printers) {
            console.log(printers);
            if (printers) {
                appSettings.setString('printer', printers[0].address);
                self.getPrinter();
            }
        }).catch(function (err) {
            console.log("discovery Error: ", err);
        })
    }
    getPrinter() {
        if (appSettings.hasKey('printer')) {
            this.printId = appSettings.getString('printer', '');
            this.printer();
        }

    }

    printer() {

        new Zebra.Printer({ address: this.printId, language: "CPCL", debugging: true }).then((curprinter) => {
            this.currentPrint = curprinter;

        })

    }

    printBoardingPass() {
        console.time("Printing");
        console.log("Creating document.");
        // Create a new document to print
        let documnetList: Array<any> = [];
        // const names:string[] = new Array('~/bagtag.jpg'); 
        // const names:string[] = new Array('~/bagtag1.jpg','~/bagtag1_2.jpg','~/bagtag1_3.jpg'); 
        
        const names:string[] = new Array('~/bagtag-min.jpg'); 



        for(let n=0;n<names.length;n++){
            let tempDoc = this.currentPrint.createDocument();
            tempDoc.image(names[n],0);
            documnetList.push(tempDoc);
        }
        for (let i = 0; i < names.length; i++) {
            console.time(`${names[i]}: timing`);
            this.currentPrint.print(documnetList[i]).then(function () {
                console.timeEnd(`${names[i]}: timing`);
            }).catch(function (err) {
                // Technically instead of handling the error here, we could just return the promise
                console.log("Printing Error: ", err);
            });
        }
        
    }

   
}
