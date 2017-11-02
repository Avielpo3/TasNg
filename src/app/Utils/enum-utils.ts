export class EnumUtils {

    /**
     * Return all the members names of giving Enum.
     * @static
     * @param {*} myEnum
     * @returns {string[]}
     * @memberof EnumUtils
     */
    public static getAllEnumMembers(myEnum: any): string[] {
        const membersArray: string[] = [];

        // tslint:disable-next-line:forin
        for (const enumMember in myEnum) {
            const isValueProperty = parseInt(enumMember, 10) >= 0;
            if (isValueProperty) {
                membersArray.push(myEnum[enumMember]);
            }
        }

        return membersArray;
    }
}
