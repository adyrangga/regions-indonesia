import React, { useState, useEffect } from 'react';
import './App.css';
import * as Constants from './utils/constants';
import * as PATH from './services/path';
import DropdownForm from './components/Form/DropdownForm';
import { makeAPIRequest } from './services/commonAPI';
import Title from './components/Title';
import Toast from './components/Toast';
import Button from './components/Button';
import Spinner from './components/Spinner';

function App() {
  /**
   * define state
   */
  const [state, setState] = useState({
    listProv: [],
    listKota: [],
    listKec: [],
    listDesa: [],
    selectedProv: '',
    selectedKota: '',
    selectedKec: '',
    selectedDesa: '',
    disableListKota: true,
    disableListKec: true,
    disableListDesa: true,
    displayToast: false,
    titleToast: '',
    alamat: '',
    disableSubmit: true,
    displaySpinner: false,
  });

  const handleErrorRequest = type => {
    let nextState = null;
    switch (type) {
      case Constants.PROVINSI_TYPE:
        nextState = { disableListProv: true };
        break;
      case Constants.KOTA_TYPE:
        nextState = { disableListKota: true };
        break;
      case Constants.KEC_TYPE:
        nextState = { disableListKec: true };
        break;
      default:
        break;
    }
    setState(prevState => ({
      ...prevState,
      ...nextState,
      displaySpinner: false,
      displayToast: true,
      titleToast: `Terjadi Kesalahan, Coba Beberapa Saat Lagi`,
    }))
  };

  const callbackAPIRequest = (type, data) => {
    let nextState = null;
    switch (type) {
      case Constants.PROVINSI_TYPE:
        nextState = { listProv: data.provinsi };
        break;
      case Constants.KOTA_TYPE:
        nextState = { listKota: data.kota_kabupaten };
        break;
      case Constants.KEC_TYPE:
        nextState = { listKec: data.kecamatan };
        break;
      case Constants.DESA_TYPE:
        nextState = { listDesa: data.kelurahan };
        break;
    
      default:
        break;
    }
    nextState.displaySpinner = false;
    setState(prevState => ({
      ...prevState,
      ...nextState,
    }))
  }

  const handleSelectProvinsi = data => {
    const idProv = data.target.value;
    const getProvData = state.listProv.find(i => i.id === Number(idProv));
    const nextState = { ...state };
    if (!getProvData) {
      nextState.selectedProv = '';
      nextState.selectedKota = '';
      nextState.selectedKec = '';
      nextState.selectedDesa = '';
      nextState.listKota = [];
      nextState.listKec = [];
      nextState.listDesa = [];
      nextState.disableListKota = true;
      nextState.disableListKec = true;
      nextState.disableListDesa = true;
      nextState.alamat = '';
      nextState.disableSubmit = true;
    } else {
      if (state.selectedProv === '') {
        /** first select */
        nextState.selectedProv = getProvData.nama;
        nextState.selectedKota = '';
        nextState.selectedKec = '';
        nextState.selectedDesa = '';
        nextState.disableListKota = false;
        nextState.disableListKec = true;
        nextState.disableListDesa = true;
        nextState.alamat = '';
        nextState.disableSubmit = true;
        nextState.displaySpinner = true;
        const url = `${PATH.BASE_URL}${PATH.KOTA_BY_ID_PROVINSI_PATH}=${getProvData.id}`;
        makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.KOTA_TYPE);
      } else if (getProvData.nama !== state.selectedProv) {
        nextState.selectedProv = getProvData.nama;
        nextState.selectedKota = '';
        nextState.selectedKec = '';
        nextState.selectedDesa = '';
        nextState.listKota = [];
        nextState.listKec = [];
        nextState.listDesa = [];
        nextState.disableListKota = false;
        nextState.disableListKec = true;
        nextState.disableListDesa = true;
        nextState.alamat = '';
        nextState.disableSubmit = true;
        nextState.displaySpinner = true;
        const url = `${PATH.BASE_URL}${PATH.KOTA_BY_ID_PROVINSI_PATH}=${getProvData.id}`;
        makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.KOTA_TYPE);
      }
    }
    setState(prevState => ({
      ...prevState,
      ...nextState,
    }));
  }

  const handleSelectKota = data => {
    const idKota = data.target.value;
    const getKotaData = state.listKota.find(i => i.id === Number(idKota));
    const nextState = { ...state };
    if (!getKotaData) {
      nextState.selectedKota = '';
      nextState.selectedKec = '';
      nextState.listKec = [];
      nextState.disableListKec = true;
      nextState.alamat = '';
      nextState.disableSubmit = true;
    } else {
      if (state.selectedKota === '') {
        /** first select */
        nextState.selectedKota = getKotaData.nama;
        nextState.selectedKec = '';
        nextState.disableListKec = false;
        nextState.alamat = '';
        nextState.disableSubmit = true;
        nextState.displaySpinner = true;
        const url = `${PATH.BASE_URL}${PATH.KEC_BY_ID_KOTA_PATH}=${getKotaData.id}`;
        makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.KEC_TYPE);
      } else if (getKotaData.nama !== state.selectedKota) {
        nextState.selectedKota = getKotaData.nama;
        nextState.selectedKec = '';
        nextState.disableListKec = false;
        nextState.listKec = [];
        nextState.alamat = '';
        nextState.disableSubmit = true;
        nextState.displaySpinner = true;
        const url = `${PATH.BASE_URL}${PATH.KEC_BY_ID_KOTA_PATH}=${getKotaData.id}`;
        makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.KEC_TYPE);
      }
    }
    setState(prevState => ({
      ...prevState,
      ...nextState,
    }));
  };

  const handleSelectKec = data => {
    const idKec = data.target.value;
    const getKecData = state.listKec.find(i => i.id === Number(idKec));
    const nextState = { ...state };
    if (!getKecData) {
      nextState.selectedKec = '';
      nextState.selectedDesa = '';
      nextState.listDesa = [];
      nextState.disableListDesa = true;
      nextState.alamat = '';
      nextState.disableSubmit = true;
    } else {
      if (state.selectedKec === '') {
        /** first select */
        nextState.selectedKec = getKecData.nama;
        nextState.selectedDesa = '';
        nextState.disableListDesa = false;
        nextState.alamat = '';
        nextState.disableSubmit = true;
        nextState.displaySpinner = true;
        const url = `${PATH.BASE_URL}${PATH.DESA_BY_ID_KEC_PATH}=${getKecData.id}`;
        makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.DESA_TYPE);
      } else if (getKecData.nama !== state.selectedKec) {
        nextState.selectedKec = getKecData.nama;
        nextState.selectedDesa = '';
        nextState.disableListDesa = false;
        nextState.listDesa = [];
        nextState.alamat = '';
        nextState.disableSubmit = true;
        nextState.displaySpinner = true;
        const url = `${PATH.BASE_URL}${PATH.DESA_BY_ID_KEC_PATH}=${getKecData.id}`;
        makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.DESA_TYPE);
      }
    }
    setState(prevState => ({
      ...prevState,
      ...nextState,
    }));
  };

  const handleSelectDesa = data => {
    const idDesa = data.target.value;
    const getDesaData = state.listDesa.find(i => i.id === Number(idDesa));
    const nextState = { ...state };
    if (!getDesaData) {
      nextState.selectedDesa = '';
      nextState.listDesa = [];
      nextState.disableSubmit = true;
      nextState.alamat = '';
      nextState.disableSubmit = true;
    } else {
      if (state.selectedDesa === '') {
        /** first select */
        nextState.selectedDesa = getDesaData.nama;
        nextState.disableListDesa = false;
        nextState.disableSubmit = false;
        nextState.alamat = '';
        nextState.disableSubmit = false;
      } else if (getDesaData.nama !== state.selectedKec) {
        nextState.selectedDesa = getDesaData.nama;
        nextState.disableListDesa = false;
        nextState.disableSubmit = false;
        nextState.alamat = '';
        nextState.disableSubmit = false;
      }
    }
    setState(prevState => ({
      ...prevState,
      ...nextState,
    }));
  }

  const handleClickSubmit = () => {
    let { selectedProv, selectedKota, selectedKec, selectedDesa } = state;
    const alamat = `${selectedDesa}, Kecamatan ${selectedKec}, ${selectedKota}, ${selectedProv}`;
    setState(prevState => ({
      ...prevState,
      disableSubmit: false,
      alamat,
    }));
  };

  const handleDisabledClick = val => {
    setState(prevState => ({
      ...prevState,
      displayToast: true,
      titleToast: `${val} Terlebih Dahulu`,
    }));
  };

  useEffect(() => {
    if (state.displayToast) {
        const timerToast = setTimeout(() => {
            setState(prevState => ({
                ...prevState,
                displayToast: false,
                }));
        }, 2000);
        return () => clearTimeout(timerToast);
    }
  }, [state.displayToast])

  /**
   * API Call Provinsi Data
   */
  useEffect(() => {
    const url = `${PATH.BASE_URL}${PATH.PROVINSI_PATH}`;
    makeAPIRequest(url, callbackAPIRequest, handleErrorRequest, Constants.PROVINSI_TYPE);
  }, [])

  return (
    <div className="App">
      {console.log('disableSubmit > ', state.disableSubmit)}
      <Toast isShow={state.displayToast} title={state.titleToast} />
      <Spinner displaySpinner={state.displaySpinner} />
      <DropdownForm 
        data={{ id: 0, title: 'Pilih Provinsi', list: state.listProv }}
        onSelect={handleSelectProvinsi}
      />
      <Title margin="5pt"> - </Title>
      <DropdownForm 
        data={{ id: 1, title: 'Pilih Kota/Kab', list: state.listKota }}
        onSelect={handleSelectKota}
        onDisabledClick={handleDisabledClick}
        disabled={state.disableListKota}
      />
      <Title margin="5pt"> - </Title>
      <DropdownForm 
        data={{ id: 2, title: 'Pilih Kecamatan', list: state.listKec }}
        onSelect={handleSelectKec}
        onDisabledClick={handleDisabledClick}
        disabled={state.disableListKec}
      />
      <Title margin="5pt"> - </Title>
      <DropdownForm 
        data={{ id: 2, title: 'Pilih Desa/Kelurahan', list: state.listDesa }}
        onSelect={handleSelectDesa}
        onDisabledClick={handleDisabledClick}
        disabled={state.disableListDesa}
      />
      <Button
        onClick={handleClickSubmit}
        disabled={state.disableSubmit}
        >Submit
      </Button>
      <Title>{`Alamat : ${state.alamat}`}</Title>
    </div>
  );
}

export default App;
