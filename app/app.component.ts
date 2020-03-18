import { Component} from "@angular/core";
import * as Zebra from "nativescript-print-zebra";
import * as appSettings from "application-settings";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public printId = "";
    public defaults ={
        'language':"",'macAddress':""
        };
    discovery(){
        var discover = new Zebra.Discovery();
        let self = this;
        discover.searchBluetooth().then(function(printers) {
            console.log(printers);
            appSettings.setString('printer', printers[0].address);
            self.getPrinter();
        })

    }
    getPrinter(){
        if (appSettings.hasKey('printer')) {
            this.printId = appSettings.getString('printer', '');
        }
    }

    printer(){
        var defaults = this.getPrinterDefaults();
        new Zebra.Printer({address: this.printId, language: "CPCL", debugging: true})
        .then(function(printer) {
            let gp = printer;
            

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
			    .image('~/BPBluetooth.jpg',0)
                .alignment('center')
                .text("Master Technology", {font: docFont, size: 0, bold: true})
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
            document.text("Receiver:", {bold: true});
            document.text("Time: " + (new Date().toTimeString()));
            document.text("Another Location");
            document.newline();
            document.text("TICKET: 123456", {font: docFont, size: 1, alignment: "center"});
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
                printer.close().then(function() {
                  console.log("JS Disconnected");
                  gp = null;
                });

        }).catch(function(err) {
            console.log("Printing Error: ", err);
            printer.close();
            // Technically instead of handling the error here, we could just return the promise
            console.log("Printing Error: ", err);
            gp = null;
        });
        }).catch(function (status) {
            console.log("Printing Error: ", status);
            
        });

    }

    getPrinterDefaults() {
        if (Zebra.driver === "ZEBRA") {
            this.defaults.language = 'CPCL';
            this.defaults.macAddress = "AC:3F:A4:55:F1:84";
        } else if (Zebra.driver === "EPSON") {
            this.defaults.language = 'ESCPOS';
            this.defaults.macAddress = "00:01:90:C2:D1:7C";
        }
    
        return this.defaults;
    }
}
