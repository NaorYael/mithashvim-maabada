import { DataControl } from "@remult/angular/interfaces";
import { Entity, Field, Fields, IdEntity, Validators, ValueListFieldType } from "remult";
import { Employee } from "../employees/employee";


@ValueListFieldType({ caption: 'סטטוס' })
export class ComputerStatus {
    static assigned = new ComputerStatus('שוייך לעובד');
    static trash = new ComputerStatus("גריטה");
    static successfulUpgrade = new ComputerStatus("שדרוג בהצלחה")

    constructor(public caption: string) {

    }
}
@ValueListFieldType({ caption: 'מעבד' })
export class CPUType {
    static i3 = new CPUType();
    static i5 = new CPUType();
    static i7 = new CPUType();
    constructor() {

    }
    public caption?: string;
}

@Entity<Computer>("computers", {
    allowApiCrud: true,
    defaultOrderBy: {
        createDate: "desc"
    }
})
export class Computer extends IdEntity {

    @Fields.string({ inputType: 'phone', caption: 'ברקוד', validate: [Validators.required, Validators.uniqueOnBackend] })
    barcode = '';
    @Field(() => ComputerStatus)
    @DataControl({ width: '100' })
    status = ComputerStatus.assigned;
    @Field<Computer>(() => Employee, {
        validate: c => {
            if (!c.employee)
                throw Validators.required.defaultMessage
        }
    })
    @DataControl({ width: '100' })
    employee!: Employee;
    @Field<Computer>(() => CPUType, {
        validate: c => {
            if (!c.cpu)
                throw Validators.required.defaultMessage
        }
    })
    @DataControl({ width: '50' })
    cpu!: CPUType;
    @Fields.date({ caption: 'תאריך קליטה', allowApiUpdate: false })
    createDate = new Date();

}


