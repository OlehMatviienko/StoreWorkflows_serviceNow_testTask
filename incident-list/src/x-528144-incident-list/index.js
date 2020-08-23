import {createCustomElement, actionTypes} from '@servicenow/ui-core';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
import '@servicenow/now-template-card';
import {createHttpEffect} from '@servicenow/ui-effect-http';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';




const view = (state, {updateState}) => {
	const {result = 'Loading result'} = state;
	return (
		<div>
		<div id='incidents'>Incidents</div>
		<div id='grid'>
			{result.map((element =>{
				return (
		<now-template-card-assist
		tagline={{icon: "tree-view-long-outline", label: "Incident"}}
		actions={[
		  {id: 'share', label: 'Copy URL'},
		  {id: 'close', label: 'Mark Complete'}
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

createCustomElement('x-528144-incident-list', {
	actionHandlers: {
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
			
					
			updateState({ result });
		}
	},
	renderer: {type: snabbdom},
	view,
	styles
});
