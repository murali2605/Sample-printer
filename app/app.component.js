"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Zebra = require("nativescript-print-zebra");
var appSettings = require("application-settings");
var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.printId = "";
        this.defaults = {
            'language': "", 'macAddress': ""
        };
    }
    AppComponent.prototype.discovery = function () {
        var discover = new Zebra.Discovery();
        var self = this;
        discover.searchBluetooth().then(function (printers) {
            console.log(printers);
            appSettings.setString('printer', printers[0].address);
            self.getPrinter();
        });
    };
    AppComponent.prototype.getPrinter = function () {
        if (appSettings.hasKey('printer')) {
            this.printId = appSettings.getString('printer', '');
        }
    };
    AppComponent.prototype.printer = function () {
        var defaults = this.getPrinterDefaults();
        new Zebra.Printer({ address: this.printId, language: "CPCL", debugging: true })
            .then(function (printer) {
            var gp = printer;
            console.log("Creating document.");
            // Create a new document to print
            var document = printer.createDocument();
            // These are pretty close fonts between Zebra and Epson
            var docFont = 4;
            if (Zebra.driver === "EPSON") {
                docFont = 2;
            }
            // You can chain the document calls
            document
                .image('~/BPBluetooth.jpg', 0)
                .alignment('center')
                .text("Master Technology", { font: docFont, size: 0, bold: true })
                .text("Street Address")
                .alignment('left')
                .newline()
                // You can enable this if you want; but most people don't want to print a million lines...  :-)
                /*                .text("Pick Up Lease", { bold: true, font: docFont, size: 2, noWrap: false })
                                .newLine()
                
                                .text("Transporter: " + "Alpha")
                                .newline()
                                .text("Shipper:", {bold: true})
                                .text("Time: " + (new Date().toDateString()))
                                .text("Some Other Location")
                                .newline()   */
                .text("this is a really long line of text; does it wrap to the next line? Does it wrap onto two different lines or just one single line?")
                .newline()
                // Print a Printer, Android, Apple, Mobile Phone to the printer
                .fontText("\uf02f \uf17b \uf179 \uf10b", "FontAwesome");
            // Or you can do each line separate
            document.text("Receiver:", { bold: true });
            document.text("Time: " + (new Date().toTimeString()));
            document.text("Another Location");
            document.newline();
            document.text("TICKET: 123456", { font: docFont, size: 1, alignment: "center" });
            document.barcode("12345678901", document.BARCODE.UPCA, 30);
            document.newline();
            //console.log(printer._render(document));
            /* printer.close();
            enableButtons();
            working = false;
            return; */
            // Print the actual document we created
            // You can also send a raw language to the printer as a string instead of a document object
            printer.print(document).then(function () {
                console.log("Printed");
                printer.close().then(function () {
                    console.log("JS Disconnected");
                    gp = null;
                });
            }).catch(function (err) {
                console.log("Printing Error: ", err);
                printer.close();
                // Technically instead of handling the error here, we could just return the promise
                console.log("Printing Error: ", err);
                gp = null;
            });
        }).catch(function (status) {
            console.log("Printing Error: ", status);
        });
    };
    AppComponent.prototype.getPrinterDefaults = function () {
        if (Zebra.driver === "ZEBRA") {
            this.defaults.language = 'CPCL';
            this.defaults.macAddress = "AC:3F:A4:55:F1:84";
        }
        else if (Zebra.driver === "EPSON") {
            this.defaults.language = 'ESCPOS';
            this.defaults.macAddress = "00:01:90:C2:D1:7C";
        }
        return this.defaults;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app.component.html",
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFDekMsZ0RBQWtEO0FBQ2xELGtEQUFvRDtBQU1wRDtJQUpBO1FBS1csWUFBTyxHQUFHLEVBQUUsQ0FBQztRQUNiLGFBQVEsR0FBRTtZQUNiLFVBQVUsRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUU7U0FDNUIsQ0FBQztJQWdIVixDQUFDO0lBL0dHLGdDQUFTLEdBQVQ7UUFDSSxJQUFJLFFBQVEsR0FBRyxJQUFJLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNyQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7UUFDaEIsUUFBUSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLFFBQVE7WUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QixXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUNELGlDQUFVLEdBQVY7UUFDSSxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN2RDtJQUNMLENBQUM7SUFFRCw4QkFBTyxHQUFQO1FBQ0ksSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDekMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFB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QUVELHlDQUFrQixHQUFsQjtRQUNJLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLG1CQUFtQixDQUFDO1NBQ2xEO2FBQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtZQUNqQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsbUJBQW1CLENBQUM7U0FDbEQ7UUFFRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQW5IUSxZQUFZO1FBSnhCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsUUFBUTtZQUNsQixXQUFXLEVBQUUsb0JBQW9CO1NBQ3BDLENBQUM7T0FDVyxZQUFZLENBb0h4QjtJQUFELG1CQUFDO0NBQUEsQUFwSEQsSUFvSEM7QUFwSFksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCAqIGFzIFplYnJhIGZyb20gXCJuYXRpdmVzY3JpcHQtcHJpbnQtemVicmFcIjtcclxuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcImFwcGxpY2F0aW9uLXNldHRpbmdzXCI7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIm15LWFwcFwiLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xyXG4gICAgcHVibGljIHByaW50SWQgPSBcIlwiO1xyXG4gICAgcHVibGljIGRlZmF1bHRzID17XHJcbiAgICAgICAgJ2xhbmd1YWdlJzpcIlwiLCdtYWNBZGRyZXNzJzpcIlwiXHJcbiAgICAgICAgfTtcclxuICAgIGRpc2NvdmVyeSgpe1xyXG4gICAgICAgIHZhciBkaXNjb3ZlciA9IG5ldyBaZWJyYS5EaXNjb3ZlcnkoKTtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZGlzY292ZXIuc2VhcmNoQmx1ZXRvb3RoKCkudGhlbihmdW5jdGlvbihwcmludGVycykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwcmludGVycyk7XHJcbiAgICAgICAgICAgIGFwcFNldHRpbmdzLnNldFN0cmluZygncHJpbnRlcicsIHByaW50ZXJzWzBdLmFkZHJlc3MpO1xyXG4gICAgICAgICAgICBzZWxmLmdldFByaW50ZXIoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIGdldFByaW50ZXIoKXtcclxuICAgICAgICBpZiAoYXBwU2V0dGluZ3MuaGFzS2V5KCdwcmludGVyJykpIHtcclxuICAgICAgICAgICAgdGhpcy5wcmludElkID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKCdwcmludGVyJywgJycpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcmludGVyKCl7XHJcbiAgICAgICAgdmFyIGRlZmF1bHRzID0gdGhpcy5nZXRQcmludGVyRGVmYXVsdHMoKTtcclxuICAgICAgICBuZXcgWmVicmEuUHJpbnRlcih7YWRkcmVzczogdGhpcy5wcmludElkLCBsYW5ndWFnZTogXCJDUENMXCIsIGRlYnVnZ2luZzogdHJ1ZX0pXHJcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24ocHJpbnRlcikge1xyXG4gICAgICAgICAgICBsZXQgZ3AgPSBwcmludGVyO1xyXG4gICAgICAgICAgICBcclxuXHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQ3JlYXRpbmcgZG9jdW1lbnQuXCIpO1xyXG4gICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgZG9jdW1lbnQgdG8gcHJpbnRcclxuICAgICAgICAgICAgdmFyIGRvY3VtZW50ID0gcHJpbnRlci5jcmVhdGVEb2N1bWVudCgpO1xyXG5cclxuICAgICAgICAgICAgLy8gVGhlc2UgYXJlIHByZXR0eSBjbG9zZSBmb250cyBiZXR3ZWVuIFplYnJhIGFuZCBFcHNvblxyXG4gICAgICAgICAgICB2YXIgZG9jRm9udCA9IDQ7XHJcbiAgICAgICAgICAgIGlmIChaZWJyYS5kcml2ZXIgPT09IFwiRVBTT05cIikge1xyXG4gICAgICAgICAgICBcdGRvY0ZvbnQgPSAyO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvLyBZb3UgY2FuIGNoYWluIHRoZSBkb2N1bWVudCBjYWxsc1xyXG4gICAgICAgICAgICBkb2N1bWVudFxyXG5cdFx0XHQgICAgLmltYWdlKCd+L0JQQmx1ZXRvb3RoLmpwZycsMClcclxuICAgICAgICAgICAgICAgIC5hbGlnbm1lbnQoJ2NlbnRlcicpXHJcbiAgICAgICAgICAgICAgICAudGV4dChcIk1hc3RlciBUZWNobm9sb2d5XCIsIHtmb250OiBkb2NGb250LCBzaXplOiAwLCBib2xkOiB0cnVlfSlcclxuICAgICAgICAgICAgICAgIC50ZXh0KFwiU3RyZWV0IEFkZHJlc3NcIilcclxuXHRcdFx0XHQuYWxpZ25tZW50KCdsZWZ0JylcclxuXHQgICBcdFx0ICAgIC5uZXdsaW5lKClcclxuXHJcblx0XHRcdFx0Ly8gWW91IGNhbiBlbmFibGUgdGhpcyBpZiB5b3Ugd2FudDsgYnV0IG1vc3QgcGVvcGxlIGRvbid0IHdhbnQgdG8gcHJpbnQgYSBtaWxsaW9uIGxpbmVzLi4uICA6LSlcclxuXHJcbi8qICAgICAgICAgICAgICAgIC50ZXh0KFwiUGljayBVcCBMZWFzZVwiLCB7IGJvbGQ6IHRydWUsIGZvbnQ6IGRvY0ZvbnQsIHNpemU6IDIsIG5vV3JhcDogZmFsc2UgfSlcclxuICAgICAgICAgICAgICAgIC5uZXdMaW5lKClcclxuXHJcbiAgICAgICAgICAgICAgICAudGV4dChcIlRyYW5zcG9ydGVyOiBcIiArIFwiQWxwaGFcIilcclxuICAgICAgICAgICAgICAgIC5uZXdsaW5lKClcclxuICAgICAgICAgICAgICAgIC50ZXh0KFwiU2hpcHBlcjpcIiwge2JvbGQ6IHRydWV9KVxyXG4gICAgICAgICAgICAgICAgLnRleHQoXCJUaW1lOiBcIiArIChuZXcgRGF0ZSgpLnRvRGF0ZVN0cmluZygpKSlcclxuICAgICAgICAgICAgICAgIC50ZXh0KFwiU29tZSBPdGhlciBMb2NhdGlvblwiKVxyXG4gICAgICAgICAgICAgICAgLm5ld2xpbmUoKSAgICovXHJcblxyXG4gICAgICAgICAgICAgICAgLnRleHQoXCJ0aGlzIGlzIGEgcmVhbGx5IGxvbmcgbGluZSBvZiB0ZXh0OyBkb2VzIGl0IHdyYXAgdG8gdGhlIG5leHQgbGluZT8gRG9lcyBpdCB3cmFwIG9udG8gdHdvIGRpZmZlcmVudCBsaW5lcyBvciBqdXN0IG9uZSBzaW5nbGUgbGluZT9cIilcclxuICAgICAgICAgICAgICAgIC5uZXdsaW5lKClcclxuXHJcblx0XHRcdFx0Ly8gUHJpbnQgYSBQcmludGVyLCBBbmRyb2lkLCBBcHBsZSwgTW9iaWxlIFBob25lIHRvIHRoZSBwcmludGVyXHJcbiAgICAgICAgICAgIFx0LmZvbnRUZXh0KFwiXFx1ZjAyZiBcXHVmMTdiIFxcdWYxNzkgXFx1ZjEwYlwiLCBcIkZvbnRBd2Vzb21lXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gT3IgeW91IGNhbiBkbyBlYWNoIGxpbmUgc2VwYXJhdGVcclxuICAgICAgICAgICAgZG9jdW1lbnQudGV4dChcIlJlY2VpdmVyOlwiLCB7Ym9sZDogdHJ1ZX0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC50ZXh0KFwiVGltZTogXCIgKyAobmV3IERhdGUoKS50b1RpbWVTdHJpbmcoKSkpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC50ZXh0KFwiQW5vdGhlciBMb2NhdGlvblwiKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQubmV3bGluZSgpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC50ZXh0KFwiVElDS0VUOiAxMjM0NTZcIiwge2ZvbnQ6IGRvY0ZvbnQsIHNpemU6IDEsIGFsaWdubWVudDogXCJjZW50ZXJcIn0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5iYXJjb2RlKFwiMTIzNDU2Nzg5MDFcIiwgZG9jdW1lbnQuQkFSQ09ERS5VUENBLCAzMCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50Lm5ld2xpbmUoKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhwcmludGVyLl9yZW5kZXIoZG9jdW1lbnQpKTtcclxuICAgICAgICAgICAgLyogcHJpbnRlci5jbG9zZSgpO1xyXG4gICAgICAgICAgICBlbmFibGVCdXR0b25zKCk7XHJcbiAgICAgICAgICAgIHdvcmtpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgcmV0dXJuOyAqL1xyXG5cclxuICAgICAgICAgICAgLy8gUHJpbnQgdGhlIGFjdHVhbCBkb2N1bWVudCB3ZSBjcmVhdGVkXHJcbiAgICAgICAgICAgIC8vIFlvdSBjYW4gYWxzbyBzZW5kIGEgcmF3IGxhbmd1YWdlIHRvIHRoZSBwcmludGVyIGFzIGEgc3RyaW5nIGluc3RlYWQgb2YgYSBkb2N1bWVudCBvYmplY3RcclxuICAgICAgICAgICAgcHJpbnRlci5wcmludChkb2N1bWVudCkudGhlbihmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQcmludGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgcHJpbnRlci5jbG9zZSgpLnRoZW4oZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSlMgRGlzY29ubmVjdGVkXCIpO1xyXG4gICAgICAgICAgICAgICAgICBncCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJpbnRpbmcgRXJyb3I6IFwiLCBlcnIpO1xyXG4gICAgICAgICAgICBwcmludGVyLmNsb3NlKCk7XHJcbiAgICAgICAgICAgIC8vIFRlY2huaWNhbGx5IGluc3RlYWQgb2YgaGFuZGxpbmcgdGhlIGVycm9yIGhlcmUsIHdlIGNvdWxkIGp1c3QgcmV0dXJuIHRoZSBwcm9taXNlXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUHJpbnRpbmcgRXJyb3I6IFwiLCBlcnIpO1xyXG4gICAgICAgICAgICBncCA9IG51bGw7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKHN0YXR1cykge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlByaW50aW5nIEVycm9yOiBcIiwgc3RhdHVzKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldFByaW50ZXJEZWZhdWx0cygpIHtcclxuICAgICAgICBpZiAoWmVicmEuZHJpdmVyID09PSBcIlpFQlJBXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0cy5sYW5ndWFnZSA9ICdDUENMJztcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0cy5tYWNBZGRyZXNzID0gXCJBQzozRjpBNDo1NTpGMTo4NFwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoWmVicmEuZHJpdmVyID09PSBcIkVQU09OXCIpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0cy5sYW5ndWFnZSA9ICdFU0NQT1MnO1xyXG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRzLm1hY0FkZHJlc3MgPSBcIjAwOjAxOjkwOkMyOkQxOjdDXCI7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdHM7XHJcbiAgICB9XHJcbn1cclxuIl19