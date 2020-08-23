import {createCustomElement, actionTypes} from '@servicenow/ui-core';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
import '@servicenow/now-template-card';
import '@servicenow/now-modal'
import {createHttpEffect} from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const dictionary = new Map();


const view = (state, {updateState}) => {
	const {result = 'Loading result'} = state;
	const { OpenRecord } = state;
	let modal;
	if (OpenRecord && OpenRecord.open){
		let info = result[dictionary.get(OpenRecord.id)];
		modal =
		<now-modal
		manageOpened = {true}
		opened={OpenRecord.open}
		size='sm'
		content={'Number: '+info.number+' Opened At: '+info.opened_at+' Assigment Grop: '+info.assignment_group.display_value+' State: ' +info.state+' Short Description: '+ info.short_description +' Assigned To:' + info.assigned_to.display_value}
		footer-actions='[{"variant":"primary-negative","label":"Delete"}]'
	/>
		}
		else{
			modal=undefined;
		}
	return (
		<div>

		{modal}

		<div id='incidents'>Incidents</div>
		<div id='grid'>
			{result.map((element =>{
				return (
		<now-template-card-assist
		
		tagline={{icon: "tree-view-long-outline", label: "Incident"}}
		actions={[
		  {id: element.sys_id, label: 'Open Record'},
		  {id: element.sys_id, label: 'Delete'}
		]}
		heading= {{label: element.short_description}}
		content={[
		  {label: 'Number', value: {type: 'string', value: element.number}},
		  {label: 'State', value: {type: 'string', value: element.state}},
		  {label: 'Assignment group', value: {type: 'string', value: element.assignment_group.display_value}},
		  {label: 'Assigned to', value: {type: 'string', value: element.assigned_to.display_value}}
		]}
		footer-content={{
		  label: 'Updated',
		  value: element.sys_updated_on
		}}
		
   />
				)
			}))}
			</div>
			</div>
	);
};

const deleteUser = createHttpEffect('api/now/table/incident/:id', {
    method: 'DELETE',
    pathParams: ['id'],
    successActionType: 'FETCH_LATEST_INCIDENT',
});

createCustomElement('x-528144-incident-list-with-open-record-and-delete', {
	
	actionHandlers: {
		'NOW_DROPDOWN_PANEL#ITEM_CLICKED': (coeffects) =>{
			const { action, updateState} = coeffects;
			if(coeffects.action.payload.item.label === 'Open Record'){
				const OpenRecord = {id: coeffects.action.payload.item.id,open:true};
			updateState({OpenRecord});
			}
			if(coeffects.action.payload.item.label === 'Delete'){
				const { dispatch } = coeffects;
				dispatch('USER_DELETE_REQUESTED',{id: coeffects.action.payload.item.id.toString()})
				
			}},
		'USER_DELETE_REQUESTED': deleteUser,
		'NOW_MODAL#OPENED_SET':(coeffects)=>{
			const {updateState} = coeffects;
			const OpenRecord = {id:'',open:false};
			updateState({OpenRecord});
		},
		'NOW_MODAL#FOOTER_ACTION_CLICKED' : (coeffects) => {
			const { dispatch } = coeffects;
			dispatch('USER_DELETE_REQUESTED',{id: coeffects.state.OpenRecord.id.toString()})
			dispatch('NOW_MODAL#OPENED_SET')
		},
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;
		
			dispatch('FETCH_LATEST_INCIDENT', {
				sysparm_limit: '1',
				sysparm_query: 'ORDERBYDESCnumber'
			});
		},
		'FETCH_LATEST_INCIDENT': createHttpEffect('api/now/table/incident?sysparm_display_value=true', {
			method: 'GET',
			queryParams: ['sysparm_display_value=true'],
			successActionType: 'FETCH_LATEST_INCIDENT_SUCCESS'
		}),
		'FETCH_LATEST_INCIDENT_SUCCESS': (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;
			result.forEach((element,index)=>{
				dictionary.set(element.sys_id, index);
			  })
					
			updateState({ result });
		}
	},
	renderer: {type: snabbdom},
	view,
	styles
});
