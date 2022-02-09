import React, { useState, useEffect } from 'react';
import { MdInsertLink, MdCreate } from "react-icons/md";
import { db } from '../firebase';
import { collection, doc, getDoc } from 'firebase/firestore';


const LinkForm = ({ addOrEdit, currentId, links }) => {
    const initialStateValues = {
        url: '',
        name: '',
        description: '',
    };
    const [values, setValues] = useState(initialStateValues);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({ ...values, [name]: value });
    }

    const handleSubmit = e => {
        e.preventDefault();
        addOrEdit(values);
        setValues({ ...initialStateValues });
    }

    const getLinkById = async id => {
        const data = await getDoc(doc(db, "links", id));
        setValues({ ...data.data() });
    }

    useEffect(() => {
        if (currentId === "") {
            setValues({ ...initialStateValues });
        } else {
            getLinkById(currentId);
        }
    }, [currentId]);


    return (
        <form className='card card-body' onSubmit={handleSubmit}>
            <legend>Add some link</legend>
            <div className="form-group input-group mb-2">
                <div className="input-group-text bg-light">
                    <MdInsertLink />
                </div>
                <input type="text" className='form-control' placeholder='https://someurl.com' name="url" onChange={handleInputChange} value={values.url} />
            </div>

            <div className="form-group input-group mb-2">
                <div className="input-group-text bg-light">
                    <MdCreate />
                </div>
                <input type="text" className='form-control' placeholder='Website name' name="name" onChange={handleInputChange} value={values.name} />
            </div>

            <div className="form-group mb-2">
                <textarea name="description" rows="3" className='form-control' placeholder='Write a description' onChange={handleInputChange} value={values.description}></textarea>
            </div>

            <button className='btn btn-primary btn-block'>
                {
                    currentId ==="" ? "Save" : "Update"
                }
            </button>

        </form>
    );
};

export default LinkForm;
