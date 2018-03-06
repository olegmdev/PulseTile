/*
  ~  Copyright 2017 Ripple Foundation C.I.C. Ltd
  ~  
  ~  Licensed under the Apache License, Version 2.0 (the "License");
  ~  you may not use this file except in compliance with the License.
  ~  You may obtain a copy of the License at
  ~  
  ~    http://www.apache.org/licenses/LICENSE-2.0

  ~  Unless required by applicable law or agreed to in writing, software
  ~  distributed under the License is distributed on an "AS IS" BASIS,
  ~  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  ~  See the License for the specific language governing permissions and
  ~  limitations under the License.
*/
import {bindActionCreators} from 'redux';
import * as types from './action-types';

export function clear() {
  return { type: types.MEDICATIONS__CLEAR }
}
export function all(patientId) {
  return {
    types: [types.MEDICATIONS, types.MEDICATIONS_SUCCESS, types.MEDICATIONS_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/medications'
    },

    meta: {
      patientId: patientId,
      timestamp: Date.now()
    }
  };
}
export function get(patientId, compositionId, source) {
  return {
    types: [types.MEDICATIONS_GET, types.MEDICATIONS_GET_SUCCESS, types.MEDICATIONS_GET_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'get',
      url: '/api/patients/' + patientId + '/medications/' + compositionId
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function create(patientId, composition) {
  return {
    types: [types.MEDICATIONS_CREATE, types.MEDICATIONS_CREATE_SUCCESS, types.MEDICATIONS_CREATE_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'post',
      url: '/api/patients/' + patientId + '/medications',
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}
export function update(patientId, sourceId, composition) {
  return {
    types: [types.MEDICATIONS_UPDATE, types.MEDICATIONS_UPDATE_SUCCESS, types.MEDICATIONS_UPDATE_ERROR],

    shouldCallAPI: (state) => !state.medication.response,

    config: {
      method: 'put',
      url: '/api/patients/' + patientId + '/medications/' + sourceId,
      data: composition
    },

    meta: {
      timestamp: Date.now()
    }
  };
}

export default function medicationsActions($ngRedux) {
  let actionCreator = {
    all, clear, get, create, update
  };

  return bindActionCreators(actionCreator, $ngRedux.dispatch);
}

medicationsActions.$inject = ['$ngRedux'];