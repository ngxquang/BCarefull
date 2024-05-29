import {fetchDsClsByIdAction} from '../redux/action/fetchCLSAction';
import {fetchCTDTByIdAction} from '../redux/action/fetchCTDTById';
import {fetchTTKAction} from '../redux/action/fetchTTKAction';
import {fetchBenhByIdAction} from '../redux/action/fetchBenhByIdAction';
import {fetchLSKByIdBnAction} from '../redux/action/fetchPhieuKhamAction';

export const selectAction = (actionName: string): any | null => {
  switch (actionName) {
    case "CLSBYIDPK":
      return fetchDsClsByIdAction;
    case "CTDTBYIDPK":
      return fetchCTDTByIdAction;
    case "TTKBYIDPK":
      return fetchTTKAction;
    case "DSBENHBYIDPK":
      return fetchBenhByIdAction;
    case "LSKBYIDBN":
      return fetchLSKByIdBnAction;
    default:
      return null;
  }
};