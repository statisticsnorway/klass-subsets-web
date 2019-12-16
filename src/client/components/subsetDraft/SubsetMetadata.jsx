import React, {useEffect, useContext} from "react";
import "../../css/form.css";
import {TextLanguageFieldset} from "../../utils/forms";
import {AppContext} from "../../controllers/context";

export const SubsetMetadata = ({subset}) => {

    const {ssbsections, classificationfamilies} = useContext(AppContext);

    useEffect(() => {return () => subset.dispatch({action: "remove_empty"});}, []);

    return (
        <>
            <TextLanguageFieldset title="Names" items={subset.draft.names}
                                  add={() => subset.dispatch({action: "name_add"})}
                                  remove={(index) => subset.dispatch({action: "name_remove", data: index})}
                                  handle={() => subset.dispatch({action: "update"})}
                                  size={{cols: 40, rows: 1}}/>

            <fieldset>
                <label>Owner
                    <select style={{margin: "10px"}}
                            value={subset.draft.ownerId}
                            onChange={(e) => subset.dispatch({
                                action: "ownerId",
                                data: e.target.value })}>
                        {ssbsections
                            && subset.draft.ownerId.length > 0
                            && !ssbsections._embedded.ssbSections.find(s => s.name === subset.draft.ownerId)
                            && (<option disabled value={subset.draft.ownerId}>{subset.draft.ownerId} (outdated)</option>)
                        }
                        {ssbsections
                            && ssbsections._embedded.ssbSections
                            .map((section, i) => (<option key={i} value={section.name}>{section.name}</option>))
                        }
                    </select>
                </label>
            </fieldset>

            <fieldset>
                <label style={{display:"block"}}>Valid period</label>
                <label>From:<input type="date"
                                   value={subset.draft.valid.from}
                                   onChange={(e) => subset.dispatch(
                                       {action: "from", data: e.target.value})} /></label>
                <label>To:<input type="date"
                                 value={subset.draft.valid.to}
                                 onChange={(e) => subset.dispatch(
                                     {action: "to", data: e.target.value})} /></label>
            </fieldset>

            <fieldset>
                <label>Subject
                <select style={{margin: "10px"}}
                        value={subset.draft.subject}
                        onChange={(e) => subset.dispatch({
                            action: "subject",
                            data: e.target.value })}>
                    {classificationfamilies && subset.draft.subject.length > 0
                        && !classificationfamilies._embedded.classificationFamilies
                            .find(s => s.name === subset.draft.subject)
                        && (<option disabled value={subset.draft.subject}>{subset.draft.subject} (outdated)</option>)
                    }
                    {classificationfamilies
                        && classificationfamilies._embedded.classificationFamilies
                        .map((family, i) => (<option key={i} value={family.name}>{family.name}</option>))
                    }
                </select>
                </label>
            </fieldset>

            <TextLanguageFieldset title="Description" items={subset.draft.descriptions}
                                  add={() => subset.dispatch({action: "description_add"})}
                                  remove={(index) => subset.dispatch({action: "description_remove", data: index})}
                                  handle={() => subset.dispatch({action: "update"})}
                                  size = {{cols: 40, rows: 4}}/>

            <label><input type="checkbox"/>Subscribe for changes</label>

            <br/><br/>

            <button onClick={() => {subset.dispatch({action: "empty"});}}>Empty</button>
            <button onClick={() => {subset.dispatch({action: "reset"});}}>Reset</button>

            <br/><br/>
        </>
    );
};