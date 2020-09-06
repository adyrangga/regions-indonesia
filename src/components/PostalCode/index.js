/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import * as PATH from '../../services/path';
import * as Constants from '../../utils/constants';
import * as Regex from '../../utils/regex';
import { makeAPIRequest } from '../../services/commonAPI';
import { findingData } from './findingData';

function PostalCode(props) {
    const [state, setState] = useState({
        currentProvData: null,
        currentKotaData: null,
        currentKecData: null,
    });

    const successHandler = (type, data) => {
        let nextType = type.val;
        if (Regex.KAB_PATTERN.test(type.val)) {
            nextType = type.val.replace(Regex.KAB_PATTERN, '');
        } else if (Regex.KOTA_PATTERN.test(type.val)) {
            nextType = type.val.replace(Regex.KOTA_PATTERN, '');
        }
        const isArrayData = type.id === Constants.KEC_TYPE;
        const currentData = findingData(nextType, data, isArrayData);
        let key = 'currentProvData';
        switch (type.id) {
            case Constants.KOTA_TYPE:
                key = 'currentKotaData';
                break;
            case Constants.KEC_TYPE:
                key = 'currentKecData';
                break;
            default:
                break;
        }
        setState(prevState => ({
            ...prevState,
            [key]: currentData,
        }));
        props.onRequestDone(true);

    }

    const errHandler = v => {
        props.onRequestDone(true);
    }

    useEffect(() => {
        if (props.selectedProv) {
            const url = `${PATH.BASE_POS_URL}${PATH.LIST_PROVINSI_POST_PATH}`;
            const type = { id: Constants.PROVINSI_TYPE, val: props.selectedProv }
            makeAPIRequest(url, successHandler, errHandler, type );
        } else if (state.currentProvData && !props.selectedProv) {
            setState(prevState => ({
                ...prevState,
                currentProvData: null,
                currentKotaData: null,
                currentKecData: null,
            }));
        }
    }, [props.selectedProv])

    useEffect(() => {
        if (props.selectedKota && state.currentProvData) {
            if (state.currentProvData && state.currentProvData.id) {
                const provId = state.currentProvData.id;
                const url = `${PATH.BASE_POS_URL}${PATH.LIST_KOTAKAB_POST_PATH}${PATH.SLASH}${provId}${PATH.SUFFIX_ID_POST_PATH}`;
                const type = { id: Constants.KOTA_TYPE, val: props.selectedKota }
                makeAPIRequest(url, successHandler, errHandler, type);
            }
        } else if (state.currentKotaData && !props.selectedKota) {
            setState(prevState => ({
                ...prevState,
                currentKotaData: null,
                currentKecData: null,
            }));
        }
    }, [props.selectedKota])

    useEffect(() => {
        if (props.selectedKec) {
            if (state.currentKotaData && state.currentKotaData.id) {
                const kotaId = state.currentKotaData.id;
                const url = `${PATH.BASE_POS_URL}${PATH.ID_KOTAKAB_POST_PATH}${PATH.SLASH}${kotaId}${PATH.SUFFIX_ID_POST_PATH}`;
                const type = { id: Constants.KEC_TYPE, val: props.selectedKec }
                makeAPIRequest(url, successHandler, errHandler, type);
            }
        } else if (state.currentKecData && !props.selectedKec) {
            setState(prevState => ({
                ...prevState,
                currentKecData: null,
            }));
        }
    }, [props.selectedKec])

    useEffect(() => {
        if (state.currentProvData && state.currentKotaData && state.currentKecData) {
            props.getPostalCode(state.currentKecData.kodepos);
        }
    }, [state.currentProvData, state.currentKotaData, state.currentKecData])

    return null;
}

// PostalCode.propTypes = {
//     data: PropTypes.object,
// };

export default PostalCode;
