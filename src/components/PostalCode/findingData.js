const specialConditions = (val, item, isKecamatan) => {
    let nextType = val;
    switch (val) {
        case 'lingga bayu':
            nextType = `langga bayu (${val})`;
            break;
        case 'kepulauan bangka belitung':
            nextType = 'bangka belitung';
            break;
        case 'aceh':
            nextType = 'nanggroe aceh darussalam';
            break;
        default:
            break;
    }

    let result = null;
    if (isKecamatan) {
        const kec = item.kecamatan.toLowerCase().trim() === nextType;
        const kel = item.kelurahan.toLowerCase().trim() === nextType;
        result = kec || kel ? item : null;
    } else {
        const name = item.name.toLowerCase().trim() === nextType;
        result = name || null;
    }
    return result;
}

export const findingData = (type, data, isArrayData) => {
    let typeLower = type.toLowerCase().trim();
    let result = null;
    if (!isArrayData) {
        const keys = Object.getOwnPropertyNames(data);
        const values = Object.values(data);
        const list = keys.map((v, i) => { return { id: v, name: values[i] } });
        result = list.find(i => {
            let check = i.name.toLowerCase().trim() === typeLower;
            if (!check) {
                check = specialConditions(typeLower, i, false);
            }
            return check;
        });
    } else if (isArrayData) {
        result = data.find(i => {
            const kec = i.kecamatan.toLowerCase().trim() === typeLower;
            const kel = i.kelurahan.toLowerCase().trim() === typeLower;
            let res = kec || kel ? i : null;
            if (!res) {
                res = specialConditions(typeLower, i, true);
            }
            return res;
        });
    }
    
    return result;
};
