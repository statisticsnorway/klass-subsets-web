import React from 'react';
import './changelog-container.css';
import { useTranslation } from 'react-i18next';
//import { Edit, HelpCircle, MessageSquare, Repeat, RefreshCw, Sliders } from 'react-feather';
import { AlertButton, GlobeButton, SaveButton, UploadButton } from 'components';

export const Changelog = () => {
   const { t } = useTranslation();

   return (
       <div id='changelog-container'>
           <div id='feedback'>
               <h2>{ t('Feedback') }</h2>

               <p>{ t('The application is under development.') }</p>
               <p>{ t('You can report an issue or suggest an improvement here') } <a
                    className='App-link'
                    href='https://github.com/statisticsnorway/klass-subsets-web/issues'
                    target='_blank'
                    rel='noopener noreferrer'
               >{ t('Issues') }</a>
               </p>
           </div>
           <div id='changelog'>
               <h2>{ t('Changelog') }</h2>

               <h4>v0.6.14</h4>
               <p>Disabled editing origins for published versions (no buttons).</p>
               <p>Bugfix: corrected reordering to remember the click order.</p>
               <p>Bugfix: no sync if version failed to save (Before Version step hang).</p>
               <p>Bugfix: no crash when a code added to a new (empty) version.</p>
               <p>Bugfix: no message about saving version when metadata saving failed.</p>
               <p>No changelog for earlier versions.</p>

               <h4>v0.6.13</h4>
               <p>Version <code>validUntil</code> sync. Corrected.</p>
               <p>Editor URL correction.</p>
               <p>Metadata is shown differently.</p>
               <p>Corrected metadata JSON view.</p>
               <p>Disabled refresh for subsets.</p>
               <p>Keep search parameters in the editor throughout the saving process.</p>

               <h4>v0.6.12</h4>
               <p>Bugfix: Subset validity period calculates correctly.</p>
               <p>Bugfix: Better calculation of code validity in the given period.</p>
               <p>Protected <code>/creator</code>.</p>
               <p><code>/subsets</code> instead of <code>/search</code>.</p>
               <p>Version <code>validUntil</code> sync.</p>
               <p>No notes for codes.</p>
               <p>No rank for codes on accordion.</p>

               <h4>v0.6.11</h4>
               <p>Bugfix: Subset's validity period calculates correctly.</p>
               <p>Bugfix: Version valid until field label is translated as "t.o.m" to Norwegian.</p>
               <p>Bugfix: Prefix for English subset names is set to "Subset for ".</p>
               <p>Authorized Subsets API endpoints are used for saving anf publishing.</p>

               <h4>v0.6.9-v0.6.10</h4>
               <p>Experimental.</p>

               <h4>v0.6.8</h4>
               <p>Working request URL to reach Subsets API auth protected service.</p>
               <p>Fixed code reordering table.</p>
               <ul>Still temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Code notes.</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>No unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
               </ul>
               <p>Known bug: Version dropdown on 'Review and save' form step has a glitch. Refresh the page when it happens.</p>

               <h4>v0.6.7</h4>
               <p>More log for a bug troubleshooting.</p>

               <h4>v0.6.6</h4>
               <p>Use Subsets API's services, which do not require authorisation for test purposes.</p>
               <p>Auxiliary Save button for versions to test the use of Subsets API's services, which do not require authorisation. <SaveButton disabled={true} /></p>
               <ul>Still temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Code notes.</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>No unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
                   <li>Broken code reordering.</li>
               </ul>
               <p>Known bug: Version dropdown on 'Review and save' form step has a glitch. Refresh the page when it happens.</p>

               <h4>v0.6.5</h4>
               <p>Use Subsets API's services, which require authorisation.</p>
               <ul>Still temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Code notes.</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>No unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
                   <li>Broken code reordering.</li>
               </ul>
               <p>Known bug: Version dropdown on 'Review and save' form step has a glitch. Refresh the page when it happens.</p>

               <h4>v0.6.4</h4>
               <p>Better check for code validity.</p>
               <ul>Still temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Code notes.</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>No unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
                   <li>Broken code reordering.</li>
               </ul>
               <p>Known bug: Version dropdown on 'Review and save' form step has a glitch. Refresh the page when it happens.</p>

               <h4>v0.6.3</h4>
               <ul>Switched <strong>back on</strong>:
                   <li>Green buttons "Save" and "Publish" at the end of the form (need to be defined).</li>
               </ul>
               <ul>Still temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Code notes.</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>No unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
                   <li>Broken code reordering.</li>
               </ul>
               <p>Known bug: Version dropdown on 'Review and save' form step has a glitch. Refresh the page when it happens.</p>

               <h4>v0.6.2</h4>
               <p>Client API uses params and queries.</p>
               <p>Fixed multiple selection on Reorder form step.</p>
               <p><code>/create</code> replaced by <code>/editor</code>.</p>
               <p>Simplified file structure.</p>
               <ul>Switched <strong>back on</strong>:
                   <li>Direct navigation from preview to editor.</li>
                   <li>Version publishing <UploadButton />.</li>
                   <li>Codes reorder on "Reorder" form step.</li>
               </ul>
               <ul>Still temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Code notes.</li>
                   <li>Green buttons "Save" and "Publish" at the end of the form (need to be defined).</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>Unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
                   <li>Broken code reordering.</li>
               </ul>

               <h4>v0.6.1</h4>
               <p>After successful saving redirect to Save step again.</p>

               <h4>v0.6.0</h4>
               <p>Consume Subsets API v2: completely new internal subset prototype.</p>
               <p>Save metadata separately from versions.</p>
               <p>Save one version at a time separately from metadata.</p>
               <p>Use tabs: "Metadata" and "Versions" in subset preview page and Save step in the form.</p>
               <p>Separate brief for metadata.</p>
               <p>Aggregation data in a metadata brief: amount of versions, published versions, drafts and local versions.</p>
               <p>Separate brief for current version.</p>
               <p>Aggregation data in a version brief: amount of codes, status.</p>
               <p>New usage text style and more occurrences.</p>
               <p>Versions validity period has no restrictions.</p>
               <p>Code validity mismatch <AlertButton />.</p>
               <p>Flow for published versions and drafts (not complete, need testing).</p>
               <p>Accessibility title for each clickable element. To test hold mouse over the element or button.</p>
               <p>Navigation on the save status page in case of saving failure.</p>
               <p>Responsive form design.</p>
               <p>Code refactoring: many common components, file structure, TODOs implemented.</p>
               <p>Temporary multilingual text translations (name, description, version rationale).<GlobeButton/></p>
               <ul>Temporary <strong>switched off</strong>:
                   <li>Form validating.</li>
                   <li>Publishing.</li>
                   <li>Code notes.</li>
                   <li>Green buttons "Save" and "Publish" at the end of the form (need to be defined).</li>
                   <li>Codes reorder on "Reorder" form step.</li>
                   <li>Modification aggregation (signal if a subset has been locally modified).</li>
                   <li>Unit tests for subset prototype.</li>
                   <li>Broken internationalisation.</li>
                   <li>Direct navigation from preview to editor.</li>
                   <li>Id form for new subsets.</li>
               </ul>

               {/*<h4>v0.5.12</h4>
               <p>Translated help info for Code's Order form step.</p>

               <h4>v0.5.11</h4>
               <p>Responsive header and menu.</p>
               <p>Html and Json format are tabs in subset preview.</p>
               <p>Subset preview is now a shared component between the "Review and save" and Subset page.</p>

               <h4>v0.5.10</h4>
               <p>Form navigation is synced with browser history (browser's back and forward buttons can be used).</p>
               <p>Bolder font for the form navigation labels (KF-424).</p>
               <p>New tab icon.</p>
               <p>Extra form step (protected) for sending data to the server (KF-417).</p>

               <h4>v0.5.9</h4>
               <p>Version valid until field is editable for drafts.</p>
               <p>React v17.0.1.</p>
               <p>Fix for KF-417: save or publish with no redirection</p>
               <p>Fix for KF-418: show <code>versionValidFrom</code> instead of version number.</p>
               <p>Fix for version switch dropdown (KF-418): show version valid from instead of version number.</p>

               <h4>v0.5.8</h4>
               <p>Fix for duplicate codes with same name (encodedName).</p>
               <p>Info panel for each code on "Choose codes".</p>

               <h4>v0.5.7</h4>
               <p>Public access to subset form (subset editing), but not saving or publishing.</p>

               <h4>v0.5.6</h4>
               <p>More unit tests.</p>
               <p>Changed date-to-string format.</p>
               <p>Bugfix KF-400: after saving or publishing a version redirect to this particular version.</p>
               <p>Filter settings <Sliders size='20' color='#62919A' /> on subset search page.</p>
               <p>Edit button to each search result.</p>
               <p>No double rendering caused by duplicates.</p>

               <h4>v0.5.5</h4>
               <p><code>versionValidFrom</code> and <code>versionValidUntil</code> flow corrected.</p>
               <p>Muted field warnings until field's focus is out.</p>

               <h4>v0.5.4</h4>
               <p>Muted "required field" warnings, put an asterisk on required fields.</p>
               <p>Refactored: Subset prototype encapsulates all subset's responsibility.</p>
               <p>Regression testing required on functionality related to adding/removing codes, reordering codes.</p>

               <h4>v0.5.3</h4>
               <p>Removed workaround from v0.5.2</p>
               <p>Bugfix: KF-387, KF-392, KF-393, KF-394, KF-392, KF-396, KF-397, KF-398, KF-399.</p>
               <p>Refactored component structure and context access.</p>
               <p>KF-400.</p>

               <h4>v0.5.2</h4>
               <p>Workaround (temporary): <code>lastUpdatedDate</code> and <code>createdDate</code> are set by client.</p>

               <h4>v0.5.1</h4>
               <p>Bugfix: corrected payload for saving and publishing.</p>
               <p>Bugfix: corrected state restore from session storage.</p>

               <h4>v0.5.0</h4>
               <p>Refactored code and internal state management.</p>
               <p>bugfix: KF-380, KF-386, partly reloading problems.</p>

               <h4>v0.4.5 and v0.4.6</h4>
               <p>Adjusted to the new response structure from the subset service.</p>

               <h4>v0.4.4</h4>
               <p>Possibility to create a new version earlier than validity period, in addition to later versions.</p>
               <p>Changed pattern for URNs, it now includes "ssb".</p>
               <p>Codes with dash as first symbol is allowed.</p>
               <p>Bugfix: Codes checkbox updates on each click.</p>
               <p>Possibility to type own Id (to choose a shorter one, with no prefix, etc.). Max length is 128 symbols.</p>
               <p>Pointer style for the form navigation.</p>
               <p>Disabled editing for published subsets (inputs, adding code lists, adding codes, reordering, drag and drop).</p>

               <h4>v0.4.3</h4>
               <p>Fixed empty <code>validUntil</code> and <code>createdDate</code> in order to save and publish subsets.</p>
               <p>The right service used for search from with no until date.</p>
               <p>Adjusted to receive subset version as an integer, not a string as before.</p>
               <p>Removed refresh button.</p>
               <p>Disabled "valid until" and "version valid from" input fields.</p>
               <p>Version validity period is used for code lists search in the form.</p>

               <h4>v0.4.2</h4>
               <p>Use major version number only.</p>
               <p>Short name fix.</p>

               <h4>v0.4.1</h4>
               <p>Better error message on failed saving or publishing.</p>
               <p>Visible ID setting while typing the very first name.</p>
               <p>Version valid from date is now dependent on valid from date.</p>

               <h4>v0.4.0</h4>
               <p>A version form step to create, view, and update versions.</p>
               <p>Save button.</p>
               <p>Fixed a major security issue by updating dependencies.</p>

               <h4>v0.3.4</h4>
               <p>Bugfix: some codes could not show its name.</p>
               <p>Reorder: show codes in a scrollbar window.</p>
               <p><em>/changelog</em> instead of <em>/about</em>.</p>

               <h4>v0.3.3</h4>
               <p>Form validation:</p>
                   <ul>
                       <li>each form field individually (TEST: try to set same date in <code>valid from</code> and <code>valid to</code> fields. Or try to set <code>valid to</code> earlier than <code>valid from</code>. A warning will be displayed under the field.)</li>
                       <li>whole form before publishing (TEST: let <code>name</code> or <code>Owner</code> fields be empty and go to "Publish" form step -- Publish button should be disabled and Form errors summary is shown.)</li>
                   </ul>
               <p>Limited name length to 250 symbols.</p>
               <p>Corrected field name for <code>valid to</code> field to be exclusive.</p>
               <p>Navigation between code lists in search results by using <kbd>UP</kbd> and <kbd>DOWN</kbd> on "Choose classification" form step.</p>
               <p>Retry button <RefreshCw size='20' color='#62919A'/> for code lists in search result to repeat Klass API call to retrieve codes and metadata.</p>
               <p>Reorder button <Repeat color='#62919A'/> works properly now.</p>
               <p>No scrolling to page bottom, when selecting codes with <kbd>SPACE</kbd>.</p>
               <p><kbd>ESC</kbd> in rank input field to reset rank.</p>
               <p><kbd>ESC</kbd> on table to unselect all selected codes.</p>
               <p>Some styles are corrected:</p>
                    <ul>
                       <li><Spinner /> when loading data from services.</li>
                       <li>Notes icon <MessageSquare color='#62919A' /></li>
                       <li>Date inputs</li>
                       <li>Highlight rows and list items on mouse over</li>
                       <li>etc.</li>
                   </ul>
               <h4>v0.3.2</h4>
               <p>Updated reorder codes form step:</p>
               <ul>
                   <li>better edge case for drag and drop;</li>
                   <li>keyboard controls for moving items
                       (<kbd>SPACE</kbd>, <kbd>ESC</kbd>, <kbd>UP</kbd>, <kbd>DOWN</kbd>,
                       <kbd>CTRL</kbd>+<kbd>UP</kbd>, <kbd>CTRL</kbd>+<kbd>DOWN</kbd>);
                   </li>
                   <li>better input field control (button and <kbd>ENTER</kbd>);</li>
                   <li>highlighting of updated items;</li>
                   <li>fixed item deleting (was broken in v0.3);</li>
                   <li>list item focus (<kbd>TAB</kbd>, <kbd>UP</kbd>, <kbd>DOWN</kbd>);</li>
                   <li>more detailed help note <HelpCircle color='#2D6975'/>;</li>
                   <li>arrow to move an item one step up or down.</li>
               </ul>
               <p>Fixed date picker reset button (KF-336).</p>
               <p>Fixed classification search result confusion (KF-336).</p>
               <p>Fixed code check box confusion (KF-336).</p>
               <p>Fixed session storage reset when "Create a subset" is clicked (KF-336).</p>


               <h4>v0.3.1</h4>
                    <p>Corrected copyright year and footer styling.</p>

               <h4>v0.3.0</h4>
                   <p>Draft editing feature. To test: choose a subset, click on <Edit
                       style={{color: '#ED5935', margin: '0 10px'}}/> icon in the title.</p>
                   <p>Internal app structure adjusted to Classification Subset's GSIM schema.</p>
                   <p>Simplified code list search results rendering. Prepared to let subsets be a part of search results.</p>
                   <p>Data typed in input fields and code changes are backed up in session storage.</p>
                   <p>Classification ID column with content on "Reorder codes" form step.</p>
                   <p>Code list versions are sorted on "Choose codes" form step in code list info's panel.</p>
                   <p>Scroll bar when too many codes in a code list.</p>
                   <p>Removed "reverse" button from code's check list.</p>
                   <p>Rearranged code list control buttons on "Choose codes" form step.</p>
                   <p>Subset status label on "Metadata" form step.</p>
                   <p>Bug fixes.</p>

               <h4>v0.2.5</h4>
                   <p>Standard javascript date picker.</p>
                   <p>Code info and notes on subset page.</p>
                   <p>Scroll to top when "next" or "previous" button is clicked.</p>
                   <p>Load large lists of codes faster.</p>

               <h4>v0.2.4</h4>
                    <p>Better codes and notes fetching</p>

               <h4>v0.2.3</h4>
                   <p>{t('Parentheses in search field are allowed')}</p>
                   <p>{t('HTML tags in code notes are interpreted')}</p>
                   <p>{t('Search suggestions are shown with a scroll bar')}</p>
                   <p>{t('Column headers on the code reordering form step')}</p>
                   <p>{t('Footer implemented')}</p>
                   <p>{t('Overall styling fixes')}</p>

               <h4>v0.2.2</h4>
                   <p>{t('Adopted ClassificationSubsets schema')}</p>
                   <p>{t('Changelog')}</p>
                   <p>{t('Search subsets')}</p>
                   <p>{t('Moved config to the platform')}</p>
                   <p>{t('Depends on subsets-service v0.2.4 or later')}</p>

               <h4>v0.2.1</h4>
                   <p>/be/subsets-service/ {t('and')} React v16.13.0</p>

               <h4>v0.2.0</h4>
                   <p>{t('Authorization and subset-service integration')}</p>*/}
            </div>
        </div>
   );
}
