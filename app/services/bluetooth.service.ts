import { Injectable } from '@angular/core';
import * as Zebra from "nativescript-print-zebra";
import * as appSettings from "application-settings";

@Injectable()

export class Bluetoothservice {

    private printId:string;
    private currentPrint:any 
    public discovery() {
        var discover = new Zebra.Discovery();
        let self = this;
        discover.searchBluetooth().then(function (printers) {
            console.log(printers);
            if(printers){
            appSettings.setString('printer', printers[0].address);
            self.getPrinter();
            }
        }).catch(function (err) {
            console.log("discovery Error: ", err);
        })
    }
    public getPrinter() {
        if (appSettings.hasKey('printer')) {
            this.printId = appSettings.getString('printer', '');
            this.printer();
        }

    }

    public printer() {

        new Zebra.Printer({ address: this.printId, language: "CPCL", debugging: true }).then((curprinter) => {
            console.dir(curprinter);
            this.currentPrint = curprinter;

        }).catch(function (err) {
            console.log("discovery Error: ", err);
        })

    }

    public getrinter(){
        if(this.currentPrint){
            return this.currentPrint
        }else{
            throw "unable to connect printer"
        }
    }

    public getStatus(){
        if(this.currentPrint){
            this.currentPrint.getStatus().then(function (result) {
                if (result.ready && !result.latchOpen && !result.lowBattery && !result.paperOut) {
                    return true;
                }else{
                    return false;
                }
            });
        }else {
            return false;
        }
    }


}

