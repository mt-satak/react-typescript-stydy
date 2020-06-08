import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import profileActions from "./actions";
import { Career } from "../../domain/entity/career";

// stateの初期値をここで設定
const init: Profile = {
  name:"",
  description:"",
  birthday:"",
  gender:"",
  address: {
    postalcode: "",
    prefecture: "",
    city: "",
    restAddress: ""
  },
  college: {
    name: "",
    faculty: "",
    department: ""
  },
  careers: []
};

// 職歴の初期化を個別に設定→職歴追加時の初期値として利用
const initCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: ""
};

const profileReducer = reducerWithInitialState(init)
  .case(profileActions.setProfile, (state, payload) => ({
    ...state, 
    ...payload
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload }
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result }
  }))
  .case(profileActions.setCollege, (state, payload) => ({
    ...state, 
    college: { ...state.college, ...payload }
  }))
  .case(profileActions.setCareer, (state, payload) => ({
    ...state,
    careers: state.careers.map((career, i) => 
      i === payload.index ? { ...career, ...payload.career } : career
    )
  }))
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    careers: state.careers.filter((_, i) => i !== payload)
  }))
  .case(profileActions.addCareer, (state, payload) => ({
    ...state,
    careers: [...state.careers, initCareer]
  }));

export default profileReducer;