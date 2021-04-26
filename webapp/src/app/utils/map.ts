/**
 * Get property or nested property from object
 * If field is a string -> returns object[field]
 * If field is an array [field1, field2] -> returns object[field1][field2]
 * @param object 
 * @param field 
 * @returns 
 */
export function getNestedProperty(object: any, field: string[] | string) {
    let value = object;
    if (field instanceof Array) {
        value = field.reduce((prev, key) => prev[key], value);
    } else {
        value = value[field]
    }
    return value;
}