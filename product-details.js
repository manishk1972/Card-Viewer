// Create a class for the element
class ProductDetails extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
        this.shadow = this.attachShadow({ mode: "open" });
        this.createDynamicElement();
        let lastUrl = location.href;
        new MutationObserver(() => {
            const url = location.href;
            if (url !== lastUrl) {
                lastUrl = url;
                onUrlChange();
            }
        }).observe(document, { subtree: true, childList: true });

        const onUrlChange = () => {
            this.createDynamicElement();
        };
    }

    createDynamicElement() {
        const url = location.href;
        let productvariantId;
        if (url.includes("variant="))
            productvariantId = url.split("variant=").pop();
        else {
            const data = document.querySelector("#product");
            productvariantId = "47398104301866";
        }

        let productDetailsData = [
            {
                id: 1,
                section: {
                    title: "Section title",
                    value: "Dimensions",
                },
                labelsAndValues: [
                    {
                        id: 1,
                        label: "Height",
                        value: "120cm",
                    },
                    {
                        id: 2,
                        label: "Weight",
                        value: "250g",
                    },
                ],
            },
            {
                id: 2,
                section: {
                    title: "Section title",
                    value: "General",
                },
                labelsAndValues: [
                    {
                        id: 1,
                        label: "Material",
                        value: "Plastic",
                    },
                ],
            },
            {
                id: 3,
                section: {
                    title: "Section title",
                    value: "Others",
                },
                labelsAndValues: [
                    {
                        id: 1,
                        label: "Waterproof",
                        value: "Yes",
                    },
                    {
                        id: 2,
                        label: "Length",
                        value: "120cm",
                    },
                ],
            },
            {
                id: 4,
                section: {
                    title: "Section title",
                    value: "Other 2",
                },
                labelsAndValues: [
                    {
                        id: 1,
                        label: "Length",
                        value: "100cm",
                    },
                    {
                        id: 2,
                        label: "Width",
                        value: "200cm",
                    },
                ],
            },
        ];

        let settings = {
            backgroundColor: "#00FFFFFF",
            tableTitle: "Specifications",
            primaryTextColor: "#0c7cff",
            secondaryTextColor: "#999999",
            tableBorderColor: "#fb1818",
            totalSectionsBeforeLabel: "2",
            displayShowMoreLabel: true,
            tableShowMoreLabelName: "Expand More",
        };

        if (settings.displayShowMoreLabel === false) {
            settings.totalSectionsBeforeLabel = productDetailsData.length;
        }

        let detailDiv = document.createElement("div");
        detailDiv.setAttribute("id", "wrapperdiv");
        if (productDetailsData.length) {
            let sectionTable = null;
            let tbody = null;
            productDetailsData.map((details, index) => {
                if (index === 0) {
                    sectionTable = document.createElement("table");
                    tbody = document.createElement("tbody");
                    let row = document.createElement("tr");
                    let rowData = document.createElement("td");
                    row.setAttribute("class", "main-detail");
                    rowData.innerHTML = "Details";
                    row.appendChild(rowData);
                    tbody.appendChild(row);
                    sectionTable.appendChild(tbody);
                }
                let mainRow = document.createElement("tr");
                let row = document.createElement("tr");
                let rowData = document.createElement("td");
                if (index > settings.totalSectionsBeforeLabel - 1) {
                    mainRow.setAttribute("class", "secondary-details hidden");
                    mainRow.setAttribute("id", `id${index}`);
                } else {
                    mainRow.setAttribute("class", "secondary-details");
                }
                rowData.innerHTML = details.section.value;
                row.appendChild(rowData);
                mainRow.append(row);
                let labelsAndDetailsTable = document.createElement("table");
                let labelsAndValuesTbody = document.createElement("tbody");
                details.labelsAndValues.map((labelsAndValues) => {
                    let row = document.createElement("tr");
                    let rowData = document.createElement("td");
                    let rowData1 = document.createElement("td");
                    row.setAttribute("class", "labels-table-class");

                    rowData.innerHTML = labelsAndValues.label;
                    rowData1.innerHTML = labelsAndValues.value;

                    row.appendChild(rowData);
                    row.appendChild(rowData1);
                    labelsAndValuesTbody.appendChild(row);
                    labelsAndDetailsTable.appendChild(labelsAndValuesTbody);
                });
                let row2 = document.createElement("tr");
                row2.appendChild(labelsAndDetailsTable);
                mainRow.append(row2);
                tbody.appendChild(mainRow);
            });

            if (
                settings.displayShowMoreLabel === true &&
                productDetailsData.length >=
                    parseInt(settings.totalSectionsBeforeLabel)
            ) {
                let collapsibleRow = document.createElement("tr");
                collapsibleRow.setAttribute("class", "show-more");
                let collapsibleRowData = document.createElement("td");
                let showMore = document.createElement("p");
                showMore.setAttribute("id", "collapsible");
                showMore.setAttribute("aria-expanded", false);
                showMore.addEventListener("click", () =>
                    this.toggle(this, productDetailsData, settings)
                );
                showMore.innerText =
                    settings.tableShowMoreLabelName || "Show More";
                collapsibleRowData.appendChild(showMore);
                collapsibleRow.appendChild(collapsibleRowData);
                tbody.appendChild(collapsibleRow);
            }

            sectionTable.appendChild(tbody);
            sectionTable.setAttribute("class", "main-table");
            detailDiv.appendChild(sectionTable);

            const style = document.createElement("style");

            style.textContent = `
                #wrapperdiv{
                  width:100%;
                }
               .main-table{
                border: 1px solid ${
                    settings?.tableBorderColor || "rgba(0, 0, 0, 0.1)"
                };
                border-collapse: collapse;
                width:100%;
                background: ${
                    (settings?.backgroundColor === "#00FFFFFF"
                        ? "transparent"
                        : settings?.backgroundColor) || "transparent"
                };
               }
               .main-table td{
                font-weight: 400;
                font-size: 18px;
                line-height: 20px;
                color: ${settings?.primaryTextColor || "#000000"};
               }
              .main-detail{
                border-bottom: 1px solid ${
                    settings?.tableBorderColor || "#E5E5E5"
                };
               }
               .main-detail td{
                font-weight: 700;
                font-size: 20px;
                padding:24px;
               }
                .secondary-details {
                border-bottom: 1px solid  ${
                    settings?.tableBorderColor || "#E5E5E5"
                };
               }
               .labels-table-class{
                width:100%
               }
               .secondary-details tr{
                display:block;
               }
               .secondary-details td{
                padding:24px 24px 24px 24px;
               }
               .labels-table-class td:nth-child(1){
                width: 128px;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 20px;
                color: ${settings?.secondaryTextColor || "rgba(0, 0, 0, 0.4)"};
                padding:0 24px 16px 24px;
                vertical-align:top;
               }
               .labels-table-class td:nth-child(2){
                width: auto;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 20px;
                padding:0 24px 16px 24px;
                vertical-align:top;
               }
               .show-more td{
                padding:8px 24px;
                color: #2C6ECB;
                font-weight: 400;
                font-size: 16px;
                cursor:pointer
               }
               .hidden{
                   display:none;
               }
              `;

            // Attach the created elements to the shadow dom
            this.shadow.appendChild(style);
        } else {
            if (Shopify.designMode) {
                let sectionTable = null;
                let tbody = null;
                sectionTable = document.createElement("table");
                tbody = document.createElement("tbody");
                let row = document.createElement("tr");
                let rowData = document.createElement("td");
                row.setAttribute("class", "main-detail");
                rowData.setAttribute("class", "preview-rowdata");
                rowData.innerHTML = settings?.tableTitle || "Details";
                row.appendChild(rowData);
                tbody.appendChild(row);
                sectionTable.appendChild(tbody);
                let row1 = document.createElement("tr");
                let rowData1 = document.createElement("td");
                row1.setAttribute("class", "preview-details");
                rowData1.setAttribute("class", "preview-rowdata1");
                rowData1.innerHTML =
                    "No details found for this product. Once details are added it will be visible here. The app block will be visible on the storefront only if details are available for that product.";
                row1.appendChild(rowData1);
                tbody.append(row1);
                sectionTable.appendChild(tbody);
                sectionTable.setAttribute("class", "main-table");
                detailDiv.appendChild(sectionTable);

                const style = document.createElement("style");
                style.textContent = `
              #wrapperdiv{
                width:100%;
              }
              .main-table{
              border: 1px solid ${
                  settings?.tableBorderColor || "rgba(0, 0, 0, 0.1)"
              };
              border-collapse: collapse;
              width:100%;
              background: ${
                  (settings?.backgroundColor === "#00FFFFFF"
                      ? "transparent"
                      : settings?.backgroundColor) || "transparent"
              };
              }
        
            .main-detail{
              border-bottom: 1px solid ${
                  settings?.tableBorderColor || "rgba(0, 0, 0, 0.1)"
              };
              }
        
              .preview-details{
              padding:24px;
              color: #2C6ECB;
              font-weight: 400;
              font-size: 16px;
              }
        
              .preview-rowdata{
                padding:24px;
                font-weight: 700;
              font-size: 20px;
              line-height:20px;
              }
        
              .preview-rowdata1{
                width:320px;
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                text-align: center;
                color: rgba(0, 0, 0, 0.5);
                padding:100px 60px;
            }
           `;

                // Attach the created elements to the shadow dom
                this.shadow.appendChild(style);
            }
        }
        const oldNode = this.shadow.querySelector("#wrapperdiv");
        if (oldNode) this.shadow.replaceChild(detailDiv, oldNode);
        else this.shadow.appendChild(detailDiv);
    }
    toggle(elem, productDetailsData, settings) {
        console.log("Settings: ", settings);
        let ids = "";
        for (
            let i = parseInt(settings.totalSectionsBeforeLabel);
            i < productDetailsData.length;
            i++
        ) {
            if (i + 1 === productDetailsData.length) ids += `#id${i}`;
            else ids += `#id${i},`;
        }

        const shadow = elem.shadowRoot;
        const hiddenItems = shadow.querySelectorAll(ids);
        const collapsibleActivator = shadow.querySelector("#collapsible");
        const collapseRow = shadow.querySelector(".show-more");

        collapseRow.classList.add("hidden");
        if (collapsibleActivator.getAttribute("aria-expanded") == "false") {
            // Loop through the rows and show them
            for (var i = 0; i < hiddenItems.length; i++) {
                hiddenItems[i].classList.remove("hidden");
            }
            // Now set the button to expanded
            collapsibleActivator.setAttribute("aria-expanded", "true");
            // Otherwise button is not expanded...
        } else {
            // Loop through the rows and hide them
            for (var i = 0; i < hiddenItems.length; i++) {
                hiddenItems[i].classList.add("hidden");
            }
            // Now set the button to collapsed
            collapsibleActivator.setAttribute("aria-expanded", "false");
        }
    }
}

// Define the new element
customElements.define("product-details", ProductDetails);
