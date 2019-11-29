import {Form} from "antd";
import React from "react";
import EditableContext from "./EditableContext";

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const  EditableFormRow = Form.create()(EditableRow);

export default EditableFormRow;