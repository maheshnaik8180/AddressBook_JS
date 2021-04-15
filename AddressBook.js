class Contact
{
    constructor(...parameters)
    {
        this.firstName = parameters[0];
        this.lastName = parameters[1];
        this.address = parameters[2];
        this.city = parameters[3];
        this.state = parameters[4];
        this.zip = parameters[5];
        this.phoneNumber = parameters[6];
        this.email = parameters[7];
    }
    get firstName() {
        return this._firstName;
    }
    set firstName(firstName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(firstName)) {
            this._firstName = firstName;    
        }
        else throw "Incorrect First Name!";
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(lastName) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$');
        if (nameRegex.test(lastName)) {
            this._lastName = lastName;    
        }
        else throw "Incorrect Last Name!";
    }

    get address() {
        return this._address;
    }
    set address(address) {
        let addressRegex = RegExp('^[A-Za-z]{1}[A-Za-z\\s]{3,}$');
        if (addressRegex.test(address)) {
            this._address = address;
        }
        else throw "Invalid Address!";
    }

    get city() {
        return this._city;
    }
    set city(city) {
        let cityRegex = RegExp('^[A-Za-z]{1}[A-Za-z\\s]{3,}$');
        if (cityRegex.test(city)) {
            this._city = city;
        }
        else throw "Invalid City!";
    }

    get state() {
        return this._state;
    }
    set state(state) {
        let stateRegex = RegExp('^[A-Za-z]{1}[A-Za-z\\s]{3,}$');
        if (stateRegex.test(state)) {
            this._state = state;
        }
        else throw "Invalid State!";
    }

    get zip() {
        return this._zip;
    }
    set zip(zip) {
        let zipRegex = RegExp('^[1-9]{1}[0-9]{5}$');
        if (zipRegex.test(zip)) {
            this._zip = zip;
        } 
        else throw "Invalid Zip!"; 
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(phoneNumber) {
        let phoneNumberRegex = RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
        if (phoneNumberRegex.test(phoneNumber)) {
            this._phoneNumber = phoneNumber;
        }
        else throw "Invalid Phone Number!";
    }

    get email() {
        return this._email;
    }
    set email(email) {
        let emailRegex = RegExp("^[a-z0-9]+(([\\.+-][a-z0-9]{1,})?)+@[a-z0-9]+\\.([a-z]{2,4})+((\\.[a-z]{2,4})?)$");
        if (emailRegex.test(email)) {
            this._email = email;
        }
        else throw "Invalid Email!";
    }


    
    toString()
    {
        return "First Name = " + this.firstName + ", Last Name = " + this.lastName + ", Address = " + this.address +
               ", City = " + this.city + ", State = " + this.state + ", Zip = " + this.zip + ", Phone Number = " + 
               this.phoneNumber + ", Email = " + this.email;
    }
}

let addressBook = new Array();
try
{
addressBook.push(new Contact("Mahesh", "Naik", "Vidyanagar", "Gadhinglaj", "Maharashtra", 416502, 9855512321, "nmahesh@gmail.com"));
addressBook.push(new Contact("Omkar", "Mali", "Panvel", "Mumbai", "Maharashtra", 129800, 9823442211, "ironman@gmail.com"));
}
catch (e)
{
    console.log(e);
}
addressBook.forEach(Contact => console.log(Contact.toString()));

let contact = searchPerson("Omkar", addressBook);
updateContact(contact, "Zip", 332244);
console.log("updated contact: " + contact.toString());

 let addressBook1 = deleteContact("Mahesh", addressBook);
 console.log("Contact list after delete opteration")
addressBook1.forEach(contact => console.log(contact.toString()));
console.log("No. of Contacts: " + countEntries(addressBook1));

try
{
    addNewContact( new Contact("Omkar", "Mali", "Panvel", "Mumbai", "Maharashtra", 129800, "9823442211", "ironman@gmail.com"), addressBook1);
}
catch (e)
{
    console.log(e);
}
console.log("After latest addition:-")
addressBook1.forEach(contact => console.log(contact.toString()));

console.log("person present in the city: " + personInCity("Omkar", "Mumbai", addressBook1));
console.log("person present in the state: " + personInState("Omkar", "Maharashtra", addressBook1));

function personInCity(personName, cityName, book)
{
    return book.some(contactObject => (contactObject.firstName == personName && contactObject.city == cityName));
}

function personInState(personName, stateName, book)
{
    return book.some(contactObject => (contactObject.firstName == personName && contactObject.state == stateName));
}

function addNewContact(contact, addressBook1)
{
    let status = addressBook1.some(contactObject => contactObject.firstName == contact.firstName);
    if(!status)
    {
        addressBook1.push(contact);
    }
    else
    {
        throw "Entry already exist!!";
    }
}
function countEntries(addressBook)
{
    return addressBook.reduce(count => count+1, 0);
}



function searchPerson(personName, addressBook)
{
    let contact = null;
    addressBook.forEach(contactObject => {
        if (contactObject.firstName == personName)
        {
            contact = contactObject;
        }
    });
    return contact;

}

function deleteContact(personName, addressBook)
{
    let contact = searchPerson(personName, addressBook);
    if (contact != null) 
    {
        return addressBook.filter(contactObject => contactObject != contact);
    } 
    else
    {
        console.log("Contact Not Found!");
    }
}



function updateContact(contact, property, updateEntry)
{
    try
    {
        switch(property)
        {
            case "First Name":
                contact.firstName = updateEntry;
                break;
            case "Last Name":
                contact.lastName = updateEntry;
                break;
            case "Address":
                contact.address = updateEntry;
                break;
            case "City":
                contact.city = updateEntry;
                break;
            case "State":
                contact.state = updateEntry;
                break;
            case "Zip":
                contact.zip = updateEntry;
                break;
            case "Phone Number":
                contact.phoneNumber = updateEntry;
                break;
                case "Email":
                    contact.email = updatedEntry;
                    break;
                default:
                    break;
            
        }
    }
    catch (error)
    {
        console.log("Unable to Update!");
    }
}