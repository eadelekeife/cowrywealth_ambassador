// import '../../../css/admin.css';
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";
import { Input } from 'antd';

export default function Topics({ nestIndex, control }) {
    const { fields, remove, append } = useFieldArray({
        control,
        name: `test[${nestIndex}].nestedArray`
    });
    return (
        <div>
            <button type="button" onClick={() => append({})}>Add Option</button>
            <div className="line" style={{ margin: '35px 0' }}></div>
            <div className="form-flex-grid">
                {fields.map(({ id }, index) => {
                    return (
                        <div key={id}>
                            <div className="form-group">
                                <label htmlFor="options">Options {index + 1}</label>
                                <Controller defaultValue="" name={`sectionData${nestIndex}.data.option${index + 1}.options`}
                                    control={control} id={`sectionData${nestIndex}.data.option${index + 1}.options`}
                                    render={({ field }) => (
                                        <Input {...field} style={{ height: '6vh' }} />
                                    )} />
                            </div>
                            {/* <div className="form-group">
                            <label htmlFor="topicLink">Topic link</label>
                            <Controller defaultValue="" name={`sectionData${nestIndex}.data.option${index + 1}.topicLink`}
                                control={control} id={`sectionData${nestIndex}.data.option${index + 1}.topicLink`}
                                render={({ onChange, onBlur, value }) => (
                                    <Input onChange={onChange} onBlur={onBlur} value={value} style={{ height: '6vh' }} />
                                )} />
                        </div> */}
                            <button type="button" onClick={() => remove(index)}>
                                Delete Option
                            </button>
                            <div className="line" style={{ margin: '35px 0' }}></div>

                        </div>
                    )
                })}
            </div>
            {/* <hr /> */}
        </div>
    );
}