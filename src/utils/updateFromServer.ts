// import { Counterparty, CounterpartyContactPersons } from "../database/models/models";
// import NovaposhtaClient from "../novaposhta/NovaposhtaClient";
// import { CounterpartyProperties } from "../types/novaposhta";

// export async function updateCounterparties () {
//     await (async function update(page: number = 0, counterpartyProperty: CounterpartyProperties = "Recipient") {
//         let lists = await NovaposhtaClient.request("Counterparty", "getCounterparties", { CounterpartyProperty: counterpartyProperty, Page: page.toString() });
//         lists.forEach(async (list) => {
//             await Counterparty.findOrCreate({ where: { ref: list.Ref }, defaults: { 
//                 counterpartyProperty: counterpartyProperty,
//                 description: list.Description,
//                 ref: list.Ref,
//                 city: list.City,
//                 counterparty: list.Counterparty,
//                 firstName: list.FirstName,
//                 lastName: list.LastName,
//                 middleName: list.MiddleName,
//                 ownershipFormRef: list.OwnershipFormRef,
//                 ownershipFormDescription: list.OwnershipFormDescription,
//                 edrpou: list.EDRPOU,
//                 counterpartyType: list.CounterpartyType
//             }});
//         });

//         if (lists.length == 100) {
//             await update(page + 1, counterpartyProperty);
//         } else {
//             switch (counterpartyProperty) {
//                 case "Recipient": await update(page, "Sender"); break;
//                 case "Sender": await update(page, "ThirdPerson"); break;
//             }
//         }
//     })()
// };

// export async function updateCounterpartiesContactPersons() {
//     (await Counterparty.findAll()).forEach(async function updater (query, page: number = 0) {
//         let lists = await NovaposhtaClient.request("Counterparty", "getCounterpartyContactPersons", { Ref: query.ref, Page: page.toString() });
//         lists.forEach(async (list) => {
//             await CounterpartyContactPersons.findOrCreate({ where: { ref: list.Ref }, defaults: { 
//                 refCounterparty: query.ref,
//                 counterpartyProperty: query.counterpartyProperty,
//                 description: list.Description,
//                 ref: list.Ref,
//                 phones: list.Phones,
//                 email: list.Email,
//                 lastName: list.LastName,
//                 firstName: list.FirstName,
//                 middleName: list.MiddleName
//             }});
//         });
//         if (lists.length == 100) {
//             await updater(query, page + 1);
//         }
//     });
// }; 