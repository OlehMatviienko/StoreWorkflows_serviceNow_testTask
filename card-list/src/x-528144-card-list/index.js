import {createCustomElement} from '@servicenow/ui-core';
import '@servicenow/now-template-card';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';

const view = (state, {updateState}) => {
	return (
		<div id= "grid">
			
		<now-template-card-assist tagline={{"icon":"tree-view-long-outline","label":"Process"}} actions={[{"id":"share","label":"Copy URL"},{"id":"close","label":"Mark Complete"}]} heading={{"label":"Submit attachment to malware sandbox and review the results"}} content={[{"label":"State","value":{"type":"string","value":"Closed"}},{"label":"Assigned","value":{"type":"string","value":"Carla S"}},{"label":"Priority","value":{"type":"string","value":"Low"}},{"label":"SLA","value":{"type":"string","value":"No SLA Set"}}]} footerContent={{"label":"Updated","value":"2019-01-15 08:41:09"}} configAria={{}} contentItemMinWidth="300"></now-template-card-assist>
		<now-template-card-assist
     tagline={{icon: "tree-view-long-outline", label: 'Process'}}
     actions={[
       {id: 'share', label: 'Copy URL'},
       {id: 'close', label: 'Mark Complete'}
     ]}
     heading= {{label:"Random"}}
     content={[
       {label: 'State', value: {type: 'string', value: 'Closed'}},
       {label: 'Assigned', value: {type: 'string', value: 'Carla S'}},
       {label: 'Priority', value: {type: 'string', value: 'Low'}},
       {label: 'SLA', value: {type: 'string', value: 'No SLA Set'}}
     ]}
     footer-content={{
       label: 'Updated',
       value: '2019-01-15 08:41:09'
	 }}
	 
/>
<now-template-card-assist
     tagline={{icon: "tree-view-long-outline", label: 'Process'}}
     actions={[
       {id: 'share', label: 'Copy URL'},
       {id: 'close', label: 'Mark Complete'}
     ]}
     heading= {{label:"Random3"}}
     content={[
       {label: 'State', value: {type: 'string', value: 'Closed'}},
       {label: 'Assigned', value: {type: 'string', value: 'Carla S'}},
       {label: 'Priority', value: {type: 'string', value: 'Low'}},
       {label: 'SLA', value: {type: 'string', value: 'No SLA Set'}}
     ]}
     footer-content={{
       label: 'Updated',
       value: '2019-01-15 08:41:09'
	 }}
	 
/>
<now-template-card-assist
     tagline={{icon: "tree-view-long-outline", label: 'Process'}}
     actions={[
       {id: 'share', label: 'Copy URL'},
       {id: 'close', label: 'Mark Complete'}
     ]}
     heading= {{label:"Random4"}}
     content={[
       {label: 'State', value: {type: 'string', value: 'Open'}},
       {label: 'Assigned', value: {type: 'string', value: 'Carla S'}},
       {label: 'Priority', value: {type: 'string', value: 'Low'}},
       {label: 'SLA', value: {type: 'string', value: 'No SLA Set'}}
     ]}
     footer-content={{
       label: 'Updated',
       value: '2019-01-15 08:41:09'
	 }}
	 
/>
</div>
	);
};



createCustomElement('x-528144-card-list', {
	renderer: {type: snabbdom},
	view,
	styles
});
